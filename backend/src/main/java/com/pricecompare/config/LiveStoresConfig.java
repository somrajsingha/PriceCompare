package com.pricecompare.config;

import com.pricecompare.connector.StoreConnector;
import com.pricecompare.connector.scraper.AmazonScraper;
import com.pricecompare.connector.scraper.CromaScraper;
import com.pricecompare.connector.scraper.FlipkartScraper;
import com.pricecompare.connector.scraper.JioMartScraper;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnProperty(name = "app.mock-stores", havingValue = "false", matchIfMissing = true)
public class LiveStoresConfig {

    @Bean
    public StoreConnector amazonScraper() {
        return new AmazonScraper();
    }

    @Bean
    public StoreConnector flipkartScraper() {
        return new FlipkartScraper();
    }

    @Bean
    public StoreConnector jioMartScraper() {
        return new JioMartScraper();
    }

    @Bean
    public StoreConnector cromaScraper() {
        return new CromaScraper();
    }
}
