
import { useState } from "react";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useAnimatedValue } from "@/utils/animations";
import { nutritionLog, userProfile } from "@/utils/data";

const NutritionStats = () => {
  const [selectedDate, setSelectedDate] = useState(0); // Default to first (latest) log
  const currentLog = nutritionLog[selectedDate];
  
  // Animated values
  const animatedCalories = useAnimatedValue(currentLog.totals.calories, 1500, 300);
  const animatedProtein = useAnimatedValue(currentLog.totals.protein, 1500, 400);
  const animatedCarbs = useAnimatedValue(currentLog.totals.carbs, 1500, 500);
  const animatedFat = useAnimatedValue(currentLog.totals.fat, 1500, 600);
  const animatedWater = useAnimatedValue(Math.round(currentLog.water / 100), 1500, 700);
  
  // Calculate progress percentages
  const caloriePercentage = Math.min(100, Math.round((currentLog.totals.calories / userProfile.calorieGoal) * 100));
  const proteinPercentage = Math.min(100, Math.round((currentLog.totals.protein / userProfile.macros.protein) * 100));
  const carbsPercentage = Math.min(100, Math.round((currentLog.totals.carbs / userProfile.macros.carbs) * 100));
  const fatPercentage = Math.min(100, Math.round((currentLog.totals.fat / userProfile.macros.fat) * 100));
  const waterPercentage = Math.min(100, Math.round((currentLog.water / 3000) * 100));
  
  // Format date
  const date = new Date(currentLog.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <section className="mb-8 animate-fade-in">
      <h2 className="section-title">{formattedDate}</h2>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col items-center">
          <ProgressRing 
            value={currentLog.totals.calories} 
            max={userProfile.calorieGoal}
            size={120}
            color="hsl(var(--primary))"
          >
            <div className="text-center">
              <div className="text-xl font-semibold">{caloriePercentage}%</div>
              <div className="text-xs text-muted-foreground">Calories</div>
            </div>
          </ProgressRing>
          <div className="mt-2 text-sm text-center">
            <span className="font-medium">{animatedCalories}</span>
            <span className="text-muted-foreground"> / {userProfile.calorieGoal} kcal</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <ProgressRing 
            value={currentLog.water} 
            max={3000}
            size={120}
            color="hsl(201 94% 51%)"
          >
            <div className="text-center">
              <div className="text-xl font-semibold">{waterPercentage}%</div>
              <div className="text-xs text-muted-foreground">Water</div>
            </div>
          </ProgressRing>
          <div className="mt-2 text-sm text-center">
            <span className="font-medium">{animatedWater / 10}</span>
            <span className="text-muted-foreground"> / 3 liters</span>
          </div>
        </div>
      </div>
      
      {/* Macros */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b">
          <h3 className="font-medium mb-4">Macronutrients</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Protein</span>
                <span className="font-medium">{animatedProtein}g / {userProfile.macros.protein}g</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-1000 ease-out"
                  style={{ width: `${proteinPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Carbs</span>
                <span className="font-medium">{animatedCarbs}g / {userProfile.macros.carbs}g</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-blue-500 rounded-full h-2 transition-all duration-1000 ease-out"
                  style={{ width: `${carbsPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Fat</span>
                <span className="font-medium">{animatedFat}g / {userProfile.macros.fat}g</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-amber-500 rounded-full h-2 transition-all duration-1000 ease-out"
                  style={{ width: `${fatPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionStats;
