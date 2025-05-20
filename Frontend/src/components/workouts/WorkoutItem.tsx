
import { useState } from "react";
import { ChevronRight, Clock, ChevronDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface WorkoutItemProps {
  workout: {
    id: string;
    date: string;
    name: string;
    duration: number;
    exercises: Array<{
      name: string;
      sets: Array<{
        weight: number;
        reps: number;
      }>;
    }>;
  };
}

const WorkoutItem = ({ workout }: WorkoutItemProps) => {
  const [expanded, setExpanded] = useState(false);
  
  // Calculate the total number of sets
  const totalSets = workout.exercises.reduce((sum, exercise) => sum + exercise.sets.length, 0);
  
  // Format the date
  const formattedDate = formatDistanceToNow(new Date(workout.date), { addSuffix: true });
  
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-4 animate-fade-in">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-2">
            <Clock className="size-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium">{workout.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {workout.exercises.length} exercises, {totalSets} sets
              </span>
            </div>
          </div>
        </div>
        {expanded ? (
          <ChevronDown className="size-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="size-5 text-muted-foreground" />
        )}
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 border-t pt-3">
          {workout.exercises.map((exercise, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-medium text-sm">{exercise.name}</h5>
                <span className="text-xs text-muted-foreground">
                  {exercise.sets.length} sets
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="bg-secondary rounded-lg p-2 text-center">
                    <div className="text-sm font-medium">{set.weight} lbs</div>
                    <div className="text-xs text-muted-foreground">{set.reps} reps</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutItem;
