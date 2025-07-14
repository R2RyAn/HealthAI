package com.healthai.healthaiback.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OFFAPI {

    @JsonProperty("product")
    private Product product;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Product {
        @JsonProperty("product_name")
        private String name;

        @JsonProperty("nutriments")
        private Nutriments nutriments;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Nutriments {
        @JsonProperty("energy-kcal")
        private Double calories;

        @JsonProperty("proteins")
        private Double proteins;

        @JsonProperty("fat")
        private Double fats;

        @JsonProperty("carbohydrates")
        private Double carbs;
    }
}
