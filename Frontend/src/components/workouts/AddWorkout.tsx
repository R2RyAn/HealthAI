
import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { workoutRoutines } from "@/utils/data";

const AddWorkout = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleSelectWorkout = (workoutName: string) => {
    // In a real app, this would create a new workout
    console.log(`Selected workout: ${workoutName}`);
    setDialogOpen(false);
  };
  
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 py-4 w-full text-primary font-medium bg-white rounded-xl border shadow-sm hover:bg-primary/5 press-effect">
          <Plus className="size-5" />
          <span>Start New Workout</span>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Workout</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <h3 className="text-sm font-medium text-muted-foreground">Your Routines</h3>
          
          {workoutRoutines.map((routine) => (
            <div key={routine.id} className="space-y-2">
              <div className="font-medium text-sm">{routine.name}</div>
              <div className="space-y-1">
                {routine.workouts.map((workout, index) => (
                  <div 
                    key={index}
                    className="bg-white border rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-secondary/50 press-effect"
                    onClick={() => handleSelectWorkout(workout.name)}
                  >
                    <span>{workout.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full"
          onClick={() => handleSelectWorkout("Custom Workout")}
        >
          Create Custom Workout
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkout;
