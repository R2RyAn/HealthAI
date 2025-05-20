
import { Edit, Camera } from "lucide-react";
import { userProfile, progressData } from "@/utils/data";

const ProfileHeader = () => {
  const latestWeight = progressData.weight[progressData.weight.length - 1].value;
  
  return (
    <div className="relative mb-6">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-primary/80 to-blue-600/80 rounded-xl" />
      
      {/* Profile Details */}
      <div className="flex flex-col items-center -mt-12">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-4 border-background bg-secondary flex items-center justify-center text-3xl font-semibold">
            {userProfile.name.charAt(0)}
          </div>
          <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 border-2 border-background">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        
        <div className="mt-3 text-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium">{userProfile.name}</h2>
            <button className="text-muted-foreground">
              <Edit className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">Goal: {userProfile.goal}</p>
        </div>
        
        <div className="flex gap-8 mt-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Weight</p>
            <p className="font-medium">{latestWeight} lbs</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Height</p>
            <p className="font-medium">{userProfile.height}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Daily Goal</p>
            <p className="font-medium">{userProfile.calorieGoal} kcal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
