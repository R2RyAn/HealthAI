
import { format } from "date-fns";
import { progressData } from "@/utils/data";
import StrengthSummaryChart from "./StrengthSummaryChart";
import ExerciseProgressCard from "./ExerciseProgressCard";

const StrengthProgress = () => {
  // Get the exercise keys
  const exercises = Object.keys(progressData.strengthProgress);
  
  // Create formatted data for each exercise
  const chartData = exercises.map(exercise => {
    const data = progressData.strengthProgress[exercise];
    const latestValue = data[data.length - 1].value;
    const previousValue = data[0].value;
    const percentChange = ((latestValue - previousValue) / previousValue) * 100;
    
    return {
      name: exercise,
      value: latestValue,
      change: percentChange.toFixed(1)
    };
  });
  
  // Format the detailed exercise data for the charts
  const getExerciseData = (exerciseName: string) => {
    return progressData.strengthProgress[exerciseName].map(item => ({
      date: format(new Date(item.date), "MMM d"),
      weight: item.value
    }));
  };
  
  return (
    <div className="space-y-6">
      <StrengthSummaryChart chartData={chartData} />
      
      {/* Individual Exercise Progress */}
      {exercises.map(exercise => (
        <ExerciseProgressCard
          key={exercise}
          exercise={exercise}
          data={getExerciseData(exercise)}
          changePercentage={chartData.find(item => item.name === exercise)?.change || "0"}
        />
      ))}
    </div>
  );
};

export default StrengthProgress;
