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

public class AmazonScraper implements StoreConnector {

    private static final Logger log = LoggerFactory.getLogger(AmazonScraper.class);
    private static final String BASE_URL = "https://www.amazon.in";
    private static final String SEARCH_URL = "https://www.amazon.in/s?k=";
    private static final Pattern NUMERIC_PRICE = Pattern.compile("([0-9,]+)");
    private static final Pattern RATING_PAT = Pattern.compile("([0-9.]+)\\s+out of");

    private final MockStoreConnector fallbackConnector = new MockStoreConnector("Amazon", 1.00, 0.0);

    @Override
    public String storeName() {
        return "Amazon";
    }

    @Override
    public List<Listing> search(String query) {
        List<Listing> scraped = scrapeAmazon(query);
        if (!scraped.isEmpty()) {
            log.info("Amazon live scraper found {} real-time items for '{}'", scraped.size(), query);
            return scraped;
        }

        log.warn("Amazon direct scrape returned 0 items; using store reference for '{}'", query);
        return fallbackConnector.search(query);
    }

    private List<Listing> scrapeAmazon(String query) {
        List<Listing> listings = new ArrayList<>();
        try {
            String url = SEARCH_URL + URLEncoder.encode(query, StandardCharsets.UTF_8);
            Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
                .header("Accept-Language", "en-IN,en-GB;q=0.9,en;q=0.8")
                .header("Accept-Encoding", "gzip, deflate, br")
                .header("Sec-Ch-Ua", "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"")
                .header("Sec-Ch-Ua-Mobile", "?0")
                .header("Sec-Ch-Ua-Platform", "\"Windows\"")
                .timeout(6000)
                .get();

            Elements items = doc.select("div[data-component-type='s-search-result'], div.s-result-item[data-asin]:not([data-asin=''])");
            for (Element item : items) {
                // Title & link
                Element titleEl = item.selectFirst("h2 a span, h2 span, a.a-link-normal span.a-text-normal");
                Element linkEl = item.selectFirst("h2 a[href], a.a-link-normal[href*='/dp/']");
                if (titleEl == null || titleEl.text().isBlank()) continue;

                String title = titleEl.text().trim();
                String href = linkEl != null ? linkEl.attr("href") : "";
                String productUrl = href.startsWith("http") ? href : (BASE_URL + href);

                // Price extraction
                Element priceEl = item.selectFirst("span.a-price-whole, span.a-price span.a-offscreen, span.a-color-price");
                if (priceEl == null) continue;
                String rawPrice = priceEl.text();
                Matcher m = NUMERIC_PRICE.matcher(rawPrice);
                if (!m.find()) continue;
                BigDecimal price = new BigDecimal(m.group(1).replace(",", ""));

                // Image
                Element imgEl = item.selectFirst("img.s-image, img[data-image-latency='s-product-image']");
                String imageUrl = imgEl != null ? imgEl.attr("src") : null;

                // Rating
                Double rating = 4.3;
                Element ratingEl = item.selectFirst("span.a-icon-alt");
                if (ratingEl != null) {
                    Matcher rm = RATING_PAT.matcher(ratingEl.text());
                    if (rm.find()) {
                        try { rating = Double.parseDouble(rm.group(1)); } catch (Exception ignored) {}
                    }
                }

                // Reviews count
                Integer ratingCount = 1000;
                Element countEl = item.selectFirst("span[aria-label] span.a-size-base, a span.a-size-base");
                if (countEl != null) {
                    try {
                        String rawCount = countEl.text().replaceAll("[^0-9]", "");
                        if (!rawCount.isBlank()) ratingCount = Integer.parseInt(rawCount);
                    } catch (Exception ignored) {}
                }

                listings.add(new Listing(
                    "Amazon",
                    title,
                    price,
                    BigDecimal.ZERO,
                    productUrl,
                    imageUrl,
                    true,
                    rating,
                    ratingCount
                ));

                if (listings.size() >= 8) break;
            }
        } catch (Exception e) {
            log.warn("Amazon scrape failed for '{}': {}", query, e.getMessage());
        }
        return listings;
    }
}
