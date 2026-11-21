


















































































































































































































































package com.pricecompare.scheduler;

import com.pricecompare.dto.Offer;
import com.pricecompare.matching.MatchingService;
import com.pricecompare.service.SearchService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;

@Component
public class PriceRefreshJob {
    private static final Logger log = LoggerFactory.getLogger(PriceRefreshJob.class);

    private final JdbcTemplate jdbc;
    private final SearchService search;
    private final MatchingService matching;
    private final JavaMailSender mail;

    public PriceRefreshJob(JdbcTemplate jdbc, SearchService search,
                           MatchingService matching, JavaMailSender mail) {
        this.jdbc = jdbc; this.search = search;
        this.matching = matching; this.mail = mail;
    }

    @Scheduled(cron = "0 0 */6 * * *")
    public void refreshTrackedProducts() {
        List<Map<String, Object>> tracked = jdbc.queryForList("""
            select distinct p.id, p.product_key, p.name
            from products p join price_alerts a on a.product_id = p.id
            where a.active = true""");

        for (Map<String, Object> row : tracked) {
            long productId = ((Number) row.get("id")).longValue();
            String key  = (String) row.get("product_key");
            String name = (String) row.get("name");

            matching.group(search.searchAll(name)).stream()
                .filter(r -> r.key().equals(key)).findFirst()
                .ifPresent(r -> {
                    r.offers().stream().filter(Offer::inStock).forEach(o -> jdbc.update(
                        "insert into price_snapshots(product_id, store, price) values (?,?,?)",
                        productId, o.store(), o.total()));
                    if (r.best() != null) notifyIfTargetHit(productId, name, r.best());
                });
        }
    }

    private void notifyIfTargetHit(long productId, String name, Offer best) {
        jdbc.query("""
            select a.id, u.email, a.target_price from price_alerts a
            join users u on u.id = a.user_id
            where a.product_id = ? and a.active = true and a.target_price >= ?""",
            rs -> {
                try {
                    SimpleMailMessage m = new SimpleMailMessage();
                    m.setTo(rs.getString("email"));
                    m.setSubject("Price drop alert: " + name);
                    m.setText(name + " is now Rs " + best.total() + " on " + best.store()
                        + ".\nBuy here: " + best.url());
                    mail.send(m);
                    jdbc.update("update price_alerts set active = false where id = ?", rs.getLong("id"));
                } catch (Exception e) {
                    log.warn("Failed to send alert email: {}", e.getMessage());
                }
            }, productId, best.total());
    }
}
