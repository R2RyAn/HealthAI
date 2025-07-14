package com.healthai.healthaiback.service;



import com.healthai.healthaiback.model.OFFAPI;
import com.healthai.healthaiback.model.OFFAPIResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OFFAPIService {

    public OFFAPI.Product getProductByBarcode(String barcode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json";

        OFFAPI fullResponse = restTemplate.getForObject(url, OFFAPI.class);

        if (fullResponse != null && fullResponse.getProduct() != null) {
            return fullResponse.getProduct(); // returns only the useful part
        } else {
            return null;
        }
    }
}

