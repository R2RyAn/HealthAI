import { authService } from "./auth";

export interface NutritionEntry {
  id: string;
  person: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  entryDate: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  notes: string;
}

export interface NewNutritionEntry {
  entryDate: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  notes: string;
}

export interface DailyTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: NutritionEntry[];
}

export const nutritionApi = {
  // Fetch user's daily nutrition log
  async getDailyNutrition(): Promise<NutritionEntry[]> {
    try {
      const token = await authService.getToken();

      const response = await fetch(
        "http://10.0.0.169:8080/api/nutrition/me/today",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch nutrition data getDailyNutrition");
      }

      return await response.json();
    } catch (error) {
      throw new Error("Failed to fetch nutrition data");
    }
  },

  // Add a new nutrition entry
  async addNutritionEntry(entry: NewNutritionEntry): Promise<NutritionEntry> {
    try {
      const token = await authService.getToken();

      const response = await fetch("http://10.0.0.169:8080/api/nutrition/log", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error("Failed to add nutrition entry addNutritionEntry");
      }

      return await response.json();
    } catch (error) {
      throw new Error("Failed to add nutrition entry");
    }
  },

  // Get daily totals grouped by date
  async getDailyTotals(): Promise<Record<string, DailyTotals>> {
    try {
      const entries = await this.getDailyNutrition();
      const grouped: Record<string, DailyTotals> = {};

      entries.forEach((entry) => {
        const date = entry.entryDate.split("T")[0]; // Get just the date part

        if (!grouped[date]) {
          grouped[date] = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            meals: [],
          };
        }

        grouped[date].calories += entry.calories;
        grouped[date].protein += entry.protein;
        grouped[date].carbs += entry.carbs;
        grouped[date].fat += entry.fat;
        grouped[date].meals.push(entry);
      });

      return grouped;
    } catch (error) {
      throw new Error("Failed to get daily totals");
    }
  },
};
