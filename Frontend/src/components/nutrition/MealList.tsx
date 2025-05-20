
import { ChevronRight, Clock, Utensils, Plus } from "lucide-react";
import { nutritionLog } from "@/utils/data";

interface MealListProps {
  selectedDate: number;
}

const MealList = ({ selectedDate }: MealListProps) => {
  const currentLog = nutritionLog[selectedDate];
  
  return (
    <section className="mb-4">
      <h2 className="section-title">Today's Meals</h2>
      
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        {currentLog.meals.map((meal, index) => (
          <div key={index} className="list-item animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center gap-3">
              <div className="bg-secondary rounded-full p-2">
                <Utensils className="size-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{meal.name}</h4>
                
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{meal.time}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {meal.foods.reduce((sum, food) => sum + food.calories, 0)} kcal
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </div>
        ))}
        
        <button className="flex items-center justify-center gap-2 w-full py-3 text-primary font-medium">
          <Plus className="size-4" />
          <span>Add Meal</span>
        </button>
      </div>
    </section>
  );
};

export default MealList;
