package com.pricecompare.connector;

import com.pricecompare.dto.Listing;
import java.util.List;

public interface StoreConnector {
    String storeName();
    List<Listing> search(String query);
}