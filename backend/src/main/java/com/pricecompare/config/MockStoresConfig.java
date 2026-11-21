package com.pricecompare.config;

import com.pricecompare.connector.MockStoreConnector;
import com.pricecompare.connector.StoreConnector;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnProperty(name = "app.mock-stores", havingValue = "true")
public class MockStoresConfig {
    @Bean StoreConnector mockAmazon()   { return new MockStoreConnector("Amazon",   1.00, 0.0); }
    @Bean StoreConnector mockFlipkart() { return new MockStoreConnector("Flipkart", 0.96, 0.0); }
    @Bean StoreConnector mockJioMart()  { return new MockStoreConnector("JioMart",  0.94, 0.0); }
    @Bean StoreConnector mockCroma()    { return new MockStoreConnector("Croma",    0.98, 0.0); }
}