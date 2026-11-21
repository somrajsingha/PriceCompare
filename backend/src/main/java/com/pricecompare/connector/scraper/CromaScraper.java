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

public class CromaScraper implements StoreConnector {

    private static final Logger log = LoggerFactory.getLogger(CromaScraper.class);
    private static final String BASE_URL = "https://www.croma.com";
    private static final String SEARCH_URL = "https://www.croma.com/searchB?q=";
    private static final Pattern NUMERIC_PRICE = Pattern.compile("([0-9,]+)");

    private final MockStoreConnector fallbackConnector = new MockStoreConnector("Croma", 0.98, 0.0);

    @Override
    public String storeName() {
        return "Croma";
    }

    @Override
    public List<Listing> search(String query) {
        List<Listing> scraped = scrapeCroma(query);
        if (!scraped.isEmpty()) {
            log.info("Croma live scraper found {} items for '{}'", scraped.size(), query);
            return scraped;
        }

        log.warn("Croma scraper found 0 items or was challenged; falling back to resilient catalog for '{}'", query);
        return fallbackConnector.search(query);
    }

    private List<Listing> scrapeCroma(String query) {
        List<Listing> listings = new ArrayList<>();
        try {
            String url = SEARCH_URL + URLEncoder.encode(query, StandardCharsets.UTF_8);
            Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
                .header("Accept-Language", "en-US,en;q=0.9")
                .timeout(4500)
                .get();

            Elements items = doc.select("li.product-item, div.cp-product, div.product-card");
            for (Element item : items) {
                // Title
                Element titleEl = item.selectFirst("h3.product-title a, h3 a, h3");
                if (titleEl == null || titleEl.text().isBlank()) continue;
                String title = titleEl.text().trim();

                // Link
                Element linkEl = item.selectFirst("h3.product-title a, a[href*='/p/'], a");
                String href = linkEl != null ? linkEl.attr("href") : "";
                String productUrl = href.startsWith("http") ? href : (BASE_URL + href);

                // Price
                Element priceEl = item.selectFirst("span.amount, span.new-price, span.pdp-price, span.price");
                if (priceEl == null) continue;
                Matcher m = NUMERIC_PRICE.matcher(priceEl.text());
                if (!m.find()) continue;
                BigDecimal price = new BigDecimal(m.group(1).replace(",", ""));

                // Image
                Element imgEl = item.selectFirst("div.product-img img, img");
                String imageUrl = imgEl != null ? (imgEl.hasAttr("src") ? imgEl.attr("src") : imgEl.attr("data-src")) : null;

                listings.add(new Listing(
                    "Croma",
                    title,
                    price,
                    BigDecimal.ZERO,
                    productUrl,
                    imageUrl,
                    true,
                    4.3,
                    376
                ));

                if (listings.size() >= 8) break;
            }
        } catch (Exception e) {
            log.warn("Croma scrape failed for '{}': {}", query, e.getMessage());
        }
        return listings;
    }
}
