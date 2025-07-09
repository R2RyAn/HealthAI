package com.healthai.healthaiback.service;



import com.healthai.healthaiback.model.OFFAPI;
import com.healthai.healthaiback.model.OFFAPIResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OFFAPIService {

    public OFFAPI getProductByBarcode(String barcode) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json";

        OFFAPIResponse response = restTemplate.getForObject(url, OFFAPIResponse.class);

        OFFAPI product = new OFFAPI();
        if (response != null && response.getProduct() != null) {
            product.setName(response.getProduct().getProductName());
            Double energyKcal = response.getProduct().getNutriments().getEnergyKcal();
            if (energyKcal != null) {
                product.setCalories(energyKcal);
            } else {
                product.setCalories(0.0); // or null if you use Double
            }
            product.setProteins(response.getProduct().getNutriments().getProteins());
            product.setFats(response.getProduct().getNutriments().getFat());
            product.setCarbs(response.getProduct().getNutriments().getCarbohydrates());

        }
        return product;
    }
}
