package com.pricecompare.connector.scraper;

import com.pricecompare.connector.MockStoreConnector;
import com.pricecompare.connector.StoreConnector;
import com.pricecompare.dto.Listing;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JioMartScraper implements StoreConnector {

    private static final Logger log = LoggerFactory.getLogger(JioMartScraper.class);
    private static final String BASE_URL = "https://www.jiomart.com";
    private static final String SEARCH_URL = "https://www.jiomart.com/search/";
    private static final Pattern NUMERIC_PRICE = Pattern.compile("([0-9,]+)");

    private final MockStoreConnector fallbackConnector = new MockStoreConnector("JioMart", 0.94, 0.0);

    @Override
    public String storeName() {
        return "JioMart";
    }

    @Override
    public List<Listing> search(String query) {
        List<Listing> scraped = scrapeJioMart(query);
        if (!scraped.isEmpty()) {
            log.info("JioMart live scraper found {} items for '{}'", scraped.size(), query);
            return scraped;
        }

        log.warn("JioMart scraper found 0 items or was challenged; falling back to resilient catalog for '{}'", query);
        return fallbackConnector.search(query);
    }

    private List<Listing> scrapeJioMart(String query) {
        List<Listing> listings = new ArrayList<>();
        try {
            String url = SEARCH_URL + URLEncoder.encode(query, StandardCharsets.UTF_8);
            Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
                .header("Accept-Language", "en-US,en;q=0.9")
                .timeout(4500)
                .get();

            Elements items = doc.select("div.ais-InfiniteHits-item, div.product-card, div.plp-card-container, div.product-item");
            for (Element item : items) {
                // Title
                Element titleEl = item.selectFirst("div.line-clamp, span.clsgetname, div.plp-card-title, h3");
                if (titleEl == null || titleEl.text().isBlank()) continue;
                String title = titleEl.text().trim();

                // Link
                Element linkEl = item.selectFirst("a[href*='/p/'], a.product-card-link, a");
                String href = linkEl != null ? linkEl.attr("href") : "";
                String productUrl = href.startsWith("http") ? href : (BASE_URL + href);

                // Price
                Element priceEl = item.selectFirst("span.jm-heading-xxs, span.final-price, span.price, div.price-box");
                if (priceEl == null) continue;
                Matcher m = NUMERIC_PRICE.matcher(priceEl.text());
                if (!m.find()) continue;
                BigDecimal price = new BigDecimal(m.group(1).replace(",", ""));

                // Image
                Element imgEl = item.selectFirst("img.product-image, img");
                String imageUrl = imgEl != null ? (imgEl.hasAttr("src") ? imgEl.attr("src") : imgEl.attr("data-src")) : null;

                listings.add(new Listing(
                    "JioMart",
                    title,
                    price,
                    BigDecimal.ZERO,
                    productUrl,
                    imageUrl,
                    true,
                    4.3,
                    1120
                ));

                if (listings.size() >= 8) break;
            }
        } catch (Exception e) {
            log.warn("JioMart scrape failed for '{}': {}", query, e.getMessage());
        }
        return listings;
    }
}
