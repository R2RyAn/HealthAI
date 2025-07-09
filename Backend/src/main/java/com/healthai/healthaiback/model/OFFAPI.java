package com.healthai.healthaiback.model;

public class OFFAPI {

    private String name;
    private Double calories;
    private Double proteins;
    private Double fats;
    private Double carbs;

    public Double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public Double getFats() {
        return fats;
    }

    public void setFats(double fats) {
        this.fats = fats;
    }

    public Double getProteins() {
        return proteins;
    }

    public void setProteins(double proteins) {
        this.proteins = proteins;
    }

    public Double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
