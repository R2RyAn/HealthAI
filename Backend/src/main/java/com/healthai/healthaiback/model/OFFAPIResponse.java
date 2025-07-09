package com.healthai.healthaiback.model;

public class OFFAPIResponse {
    private ProductDetails product;

    public ProductDetails getProduct() {
        return product;
    }

    public void setProduct(ProductDetails product) {
        this.product = product;
    }

    public static class ProductDetails {
        private String product_name;
        private Nutriments nutriments;

        public String getProductName() {
            return product_name;
        }

        public void setProductName(String product_name) {
            this.product_name = product_name;
        }

        public Nutriments getNutriments() {
            return nutriments;
        }

        public void setNutriments(Nutriments nutriments) {
            this.nutriments = nutriments;
        }
    }

    public static class Nutriments {
        private Double energy_kcal;
        private Double proteins;
        private Double fat;
        private Double carbohydrates;

        public Double getEnergyKcal() {
            return energy_kcal;
        }

        public void setEnergyKcal(Double energy_kcal) {
            this.energy_kcal = energy_kcal;
        }

        public Double getProteins() {
            return proteins;
        }

        public void setProteins(Double proteins) {
            this.proteins = proteins;
        }

        public Double getFat() {
            return fat;
        }

        public void setFat(Double fat) {
            this.fat = fat;
        }

        public Double getCarbohydrates() {
            return carbohydrates;
        }

        public void setCarbohydrates(Double carbohydrates) {
            this.carbohydrates = carbohydrates;
        }
    }
}
