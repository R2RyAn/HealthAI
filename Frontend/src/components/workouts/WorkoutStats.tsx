
import { TrendingUp, Calendar, Clock, Weight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { weeklyStats } from "@/utils/data";

const WorkoutStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Card className="p-4 border bg-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-2xl">{weeklyStats.workouts}</div>
            <div className="text-xs text-muted-foreground">Weekly workouts</div>
          </div>
          <div className="bg-primary/10 rounded-full p-2">
            <Calendar className="size-4 text-primary" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border bg-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-2xl">{(weeklyStats.volume / 1000).toFixed(1)}k</div>
            <div className="text-xs text-muted-foreground">Weekly volume (lbs)</div>
          </div>
          <div className="bg-primary/10 rounded-full p-2">
            <Weight className="size-4 text-primary" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border bg-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-2xl">{Math.floor(weeklyStats.workoutTime / 60)}<span className="text-sm">h</span> {weeklyStats.workoutTime % 60}<span className="text-sm">m</span></div>
            <div className="text-xs text-muted-foreground">Weekly active time</div>
          </div>
          <div className="bg-primary/10 rounded-full p-2">
            <Clock className="size-4 text-primary" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border bg-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-2xl">+5%</div>
            <div className="text-xs text-muted-foreground">Strength increase</div>
          </div>
          <div className="bg-primary/10 rounded-full p-2">
            <TrendingUp className="size-4 text-primary" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkoutStats;
