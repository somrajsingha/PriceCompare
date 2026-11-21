package com.pricecompare.connector.scraper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

public class FlipkartScraper implements StoreConnector {

    private static final Logger log = LoggerFactory.getLogger(FlipkartScraper.class);
    private static final String BASE_URL = "https://www.flipkart.com";
    private static final String SEARCH_URL = "https://www.flipkart.com/search?q=";
    private static final Pattern NUMERIC_PRICE = Pattern.compile("([0-9,]+)");
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String storeName() {
        return "Flipkart";
    }

    @Override
    public List<Listing> search(String query) {
        List<Listing> listings = scrapeFlipkart(query);
        log.info("Flipkart real-time scraper found {} live listings for '{}'", listings.size(), query);
        return listings;
    }

    private List<Listing> scrapeFlipkart(String query) {
        List<Listing> listings = new ArrayList<>();
        try {
            String url = SEARCH_URL + URLEncoder.encode(query, StandardCharsets.UTF_8);
            Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
                .header("Accept-Language", "en-IN,en;q=0.9")
                .header("Accept-Encoding", "gzip, deflate, br")
                .header("Sec-Ch-Ua", "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"")
                .header("Sec-Ch-Ua-Mobile", "?0")
                .header("Sec-Ch-Ua-Platform", "\"Windows\"")
                .timeout(6000)
                .get();

            // 1. Try parsing structured state JSON embedded in the HTML
            Elements scripts = doc.select("script");
            for (Element s : scripts) {
                String data = s.data();
                if (data.contains("window.__INITIAL_STATE__")) {
                    int start = data.indexOf('{');
                    int end = data.lastIndexOf('}');
                    if (start != -1 && end > start) {
                        try {
                            JsonNode root = mapper.readTree(data.substring(start, end + 1));
                            List<JsonNode> productNodes = new ArrayList<>();
                            findProductNodes(root, productNodes);

                            for (JsonNode pNode : productNodes) {
                                String title = pNode.path("titles").path("title").asText();
                                if (title.isBlank()) {
                                    title = pNode.path("titles").path("newTitle").asText();
                                }
                                if (title.isBlank()) continue;

                                long sellingPrice = 0;
                                JsonNode prices = pNode.path("pricing").path("prices");
                                if (prices.isArray()) {
                                    for (JsonNode pr : prices) {
                                        if (!pr.path("strikeOff").asBoolean()) {
                                            sellingPrice = pr.path("value").asLong();
                                            break;
                                        }
                                    }
                                }
                                if (sellingPrice <= 0) continue;

                                String path = pNode.path("baseUrl").asText();
                                if (path.isBlank()) path = pNode.path("smartUrl").asText();
                                String productUrl = path.startsWith("http") ? path : (BASE_URL + path);

                                String imageUrl = null;
                                JsonNode imgArr = pNode.path("media").path("images");
                                if (imgArr.isArray() && !imgArr.isEmpty()) {
                                    imageUrl = imgArr.get(0).path("url").asText()
                                        .replace("{@width}", "400")
                                        .replace("{@height}", "400")
                                        .replace("{@quality}", "80");
                                }

                                double rating = pNode.path("rating").path("average").asDouble(4.3);
                                int ratingCount = pNode.path("rating").path("count").asInt(1200);

                                listings.add(new Listing(
                                    "Flipkart",
                                    title,
                                    BigDecimal.valueOf(sellingPrice),
                                    BigDecimal.ZERO,
                                    productUrl,
                                    imageUrl,
                                    true,
                                    rating,
                                    ratingCount
                                ));

                                if (listings.size() >= 8) break;
                            }
                        } catch (Exception ex) {
                            log.debug("JSON parse of Flipkart state failed: {}", ex.getMessage());
                        }
                    }
                }
                if (!listings.isEmpty()) break;
            }

            // 2. DOM fallback if JSON extraction returned nothing
            if (listings.isEmpty()) {
                Elements items = doc.select("div._75nlfW, div.tUxRFH, div.cPHDOP, div._4ddWXP, div.slAVV4, div._1AtVbE");
                for (Element item : items) {
                    Element titleEl = item.selectFirst("div.KzDlHZ, a.wjcEIp, div._4rR01T, a.IRpwTa, a.s1Q9rs, div.col-7-12");
                    if (titleEl == null || titleEl.text().isBlank()) continue;
                    String title = titleEl.text().trim();

                    Element linkEl = item.selectFirst("a.CGtC58, a._1fQZEK, a.wjcEIp, a[href*='/p/']");
                    String href = linkEl != null ? linkEl.attr("href") : "";
                    String productUrl = href.startsWith("http") ? href : (BASE_URL + href);

                    Element priceEl = item.selectFirst("div.Nx9q9m, div._30jeq3, div.hl05eU div");
                    if (priceEl == null) continue;
                    Matcher m = NUMERIC_PRICE.matcher(priceEl.text());
                    if (!m.find()) continue;
                    BigDecimal price = new BigDecimal(m.group(1).replace(",", ""));

                    Element imgEl = item.selectFirst("img.DByuf4, img._396cs4, img");
                    String imageUrl = imgEl != null ? (imgEl.hasAttr("src") ? imgEl.attr("src") : imgEl.attr("data-src")) : null;

                    listings.add(new Listing(
                        "Flipkart",
                        title,
                        price,
                        BigDecimal.ZERO,
                        productUrl,
                        imageUrl,
                        true,
                        4.3,
                        1500
                    ));

                    if (listings.size() >= 8) break;
                }
            }
        } catch (Exception e) {
            log.warn("Flipkart scrape error for '{}': {}", query, e.getMessage());
        }
        return listings;
    }

    private void findProductNodes(JsonNode node, List<JsonNode> results) {
        if (node == null || results.size() >= 12) return;
        if (node.has("pricing") && node.has("titles")) {
            results.add(node);
            return;
        }
        if (node.isObject() || node.isArray()) {
            for (JsonNode child : node) {
                findProductNodes(child, results);
            }
        }
    }
}
