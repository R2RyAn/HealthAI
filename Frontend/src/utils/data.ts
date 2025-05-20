
// User Profile
export const userProfile = {
  name: "Alex Morgan",
  weight: 175,
  height: "5'11\"",
  goal: "Build Muscle",
  calorieGoal: 2800,
  macros: {
    protein: 180,
    carbs: 320,
    fat: 90
  }
};

// Workout Data
export const workoutHistory = [
  {
    id: "w1",
    date: "2023-09-18",
    name: "Push Day",
    duration: 65,
    exercises: [
      {
        name: "Bench Press",
        sets: [
          { weight: 185, reps: 8 },
          { weight: 195, reps: 6 },
          { weight: 205, reps: 5 },
          { weight: 195, reps: 6 }
        ]
      },
      {
        name: "Overhead Press",
        sets: [
          { weight: 115, reps: 8 },
          { weight: 125, reps: 6 },
          { weight: 125, reps: 6 }
        ]
      },
      {
        name: "Incline Dumbbell Press",
        sets: [
          { weight: 65, reps: 10 },
          { weight: 70, reps: 8 },
          { weight: 70, reps: 8 }
        ]
      },
      {
        name: "Tricep Pushdown",
        sets: [
          { weight: 50, reps: 12 },
          { weight: 55, reps: 10 },
          { weight: 55, reps: 10 }
        ]
      },
      {
        name: "Lateral Raises",
        sets: [
          { weight: 20, reps: 15 },
          { weight: 20, reps: 15 },
          { weight: 20, reps: 12 }
        ]
      }
    ]
  },
  {
    id: "w2",
    date: "2023-09-20",
    name: "Pull Day",
    duration: 72,
    exercises: [
      {
        name: "Deadlift",
        sets: [
          { weight: 225, reps: 8 },
          { weight: 245, reps: 6 },
          { weight: 265, reps: 4 }
        ]
      },
      {
        name: "Pull-ups",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 7 }
        ]
      },
      {
        name: "Barbell Row",
        sets: [
          { weight: 135, reps: 10 },
          { weight: 145, reps: 8 },
          { weight: 145, reps: 8 }
        ]
      },
      {
        name: "Face Pulls",
        sets: [
          { weight: 45, reps: 15 },
          { weight: 50, reps: 15 },
          { weight: 50, reps: 12 }
        ]
      },
      {
        name: "Bicep Curls",
        sets: [
          { weight: 35, reps: 12 },
          { weight: 35, reps: 10 },
          { weight: 30, reps: 12 }
        ]
      }
    ]
  }
];

export const workoutRoutines = [
  {
    id: "r1",
    name: "Push/Pull/Legs",
    description: "3-day split focusing on different muscle groups",
    workouts: [
      {
        name: "Push Day",
        exercises: ["Bench Press", "Overhead Press", "Incline Dumbbell Press", "Tricep Extensions", "Lateral Raises"]
      },
      {
        name: "Pull Day",
        exercises: ["Deadlifts", "Pull-ups", "Barbell Rows", "Face Pulls", "Bicep Curls"]
      },
      {
        name: "Leg Day",
        exercises: ["Back Squats", "Romanian Deadlifts", "Leg Press", "Leg Extensions", "Calf Raises"]
      }
    ]
  },
  {
    id: "r2",
    name: "Upper/Lower Split",
    description: "4-day split divided into upper and lower body workouts",
    workouts: [
      {
        name: "Upper Body A",
        exercises: ["Bench Press", "Bent Over Rows", "Overhead Press", "Pull-ups", "Tricep Pushdown"]
      },
      {
        name: "Lower Body A",
        exercises: ["Back Squats", "Romanian Deadlifts", "Leg Press", "Leg Curls", "Calf Raises"]
      },
      {
        name: "Upper Body B",
        exercises: ["Incline Press", "Lat Pulldown", "Lateral Raises", "Cable Rows", "Bicep Curls"]
      },
      {
        name: "Lower Body B",
        exercises: ["Front Squats", "Deadlifts", "Walking Lunges", "Leg Extensions", "Hip Thrusts"]
      }
    ]
  }
];

// Nutrition Data
export const nutritionLog = [
  {
    id: "m1",
    date: "2023-09-18",
    meals: [
      {
        name: "Breakfast",
        time: "07:30",
        foods: [
          { name: "Oatmeal", portion: "1 cup", calories: 300, protein: 10, carbs: 54, fat: 5 },
          { name: "Banana", portion: "1 medium", calories: 105, protein: 1, carbs: 27, fat: 0 },
          { name: "Protein Shake", portion: "1 scoop", calories: 120, protein: 24, carbs: 3, fat: 1 }
        ]
      },
      {
        name: "Lunch",
        time: "12:30",
        foods: [
          { name: "Chicken Breast", portion: "6 oz", calories: 280, protein: 53, carbs: 0, fat: 6 },
          { name: "Brown Rice", portion: "1 cup", calories: 215, protein: 5, carbs: 45, fat: 2 },
          { name: "Broccoli", portion: "1 cup", calories: 55, protein: 4, carbs: 11, fat: 0 },
          { name: "Olive Oil", portion: "1 tbsp", calories: 120, protein: 0, carbs: 0, fat: 14 }
        ]
      },
      {
        name: "Dinner",
        time: "19:00",
        foods: [
          { name: "Salmon", portion: "6 oz", calories: 350, protein: 34, carbs: 0, fat: 22 },
          { name: "Sweet Potato", portion: "1 medium", calories: 115, protein: 2, carbs: 27, fat: 0 },
          { name: "Asparagus", portion: "1 cup", calories: 40, protein: 4, carbs: 7, fat: 0 }
        ]
      },
      {
        name: "Snack",
        time: "16:00",
        foods: [
          { name: "Greek Yogurt", portion: "1 cup", calories: 150, protein: 25, carbs: 8, fat: 0 },
          { name: "Blueberries", portion: "1/2 cup", calories: 40, protein: 0, carbs: 10, fat: 0 },
          { name: "Almonds", portion: "1/4 cup", calories: 170, protein: 6, carbs: 5, fat: 15 }
        ]
      }
    ],
    totals: {
      calories: 2060,
      protein: 168,
      carbs: 197,
      fat: 65
    },
    water: 3200 // ml
  },
  {
    id: "m2",
    date: "2023-09-19",
    meals: [
      {
        name: "Breakfast",
        time: "08:00",
        foods: [
          { name: "Eggs", portion: "3 whole", calories: 210, protein: 18, carbs: 0, fat: 15 },
          { name: "Whole Grain Toast", portion: "2 slices", calories: 140, protein: 6, carbs: 24, fat: 2 },
          { name: "Avocado", portion: "1/2", calories: 120, protein: 1, carbs: 6, fat: 10 }
        ]
      },
      {
        name: "Lunch",
        time: "13:00",
        foods: [
          { name: "Turkey", portion: "6 oz", calories: 210, protein: 42, carbs: 0, fat: 5 },
          { name: "Quinoa", portion: "1 cup", calories: 220, protein: 8, carbs: 39, fat: 4 },
          { name: "Mixed Vegetables", portion: "1 cup", calories: 65, protein: 2, carbs: 12, fat: 0 }
        ]
      },
      {
        name: "Dinner",
        time: "19:30",
        foods: [
          { name: "Lean Beef", portion: "6 oz", calories: 330, protein: 54, carbs: 0, fat: 12 },
          { name: "Baked Potato", portion: "1 medium", calories: 160, protein: 4, carbs: 36, fat: 0 },
          { name: "Spinach Salad", portion: "2 cups", calories: 65, protein: 2, carbs: 10, fat: 0 },
          { name: "Olive Oil Dressing", portion: "1 tbsp", calories: 120, protein: 0, carbs: 0, fat: 14 }
        ]
      },
      {
        name: "Snack",
        time: "15:30",
        foods: [
          { name: "Protein Bar", portion: "1 bar", calories: 220, protein: 20, carbs: 24, fat: 7 },
          { name: "Apple", portion: "1 medium", calories: 95, protein: 0, carbs: 25, fat: 0 }
        ]
      }
    ],
    totals: {
      calories: 1955,
      protein: 157,
      carbs: 176,
      fat: 69
    },
    water: 2800 // ml
  }
];

export const foodDatabase = [
  { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: "100g" },
  { name: "Salmon", calories: 206, protein: 22, carbs: 0, fat: 13, portion: "100g" },
  { name: "Brown Rice", calories: 112, protein: 2.6, carbs: 23, fat: 0.9, portion: "100g" },
  { name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, portion: "100g" },
  { name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, portion: "100g" },
  { name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fat: 11, portion: "100g" },
  { name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fat: 0.4, portion: "100g" },
  { name: "Oatmeal", calories: 68, protein: 2.5, carbs: 12, fat: 1.4, portion: "100g" },
  { name: "Almonds", calories: 579, protein: 21, carbs: 22, fat: 50, portion: "100g" },
  { name: "Avocado", calories: 160, protein: 2, carbs: 8.5, fat: 14.7, portion: "100g" },
  { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, portion: "100g" },
  { name: "Steak", calories: 271, protein: 25, carbs: 0, fat: 19, portion: "100g" },
  { name: "Quinoa", calories: 120, protein: 4.4, carbs: 21, fat: 1.9, portion: "100g" },
  { name: "Peanut Butter", calories: 588, protein: 25, carbs: 20, fat: 50, portion: "100g" },
  { name: "Olive Oil", calories: 884, protein: 0, carbs: 0, fat: 100, portion: "100g" }
];

// Activity and Progress Data
export const progressData = {
  weight: [
    { date: "2023-08-19", value: 182 },
    { date: "2023-08-26", value: 180 },
    { date: "2023-09-02", value: 178 },
    { date: "2023-09-09", value: 177 },
    { date: "2023-09-16", value: 175 }
  ],
  workoutFrequency: [
    { week: "Aug 14-20", count: 3 },
    { week: "Aug 21-27", count: 4 },
    { week: "Aug 28-Sep 3", count: 4 },
    { week: "Sep 4-10", count: 5 },
    { week: "Sep 11-17", count: 4 }
  ],
  calorieIntake: [
    { date: "2023-09-13", value: 2250 },
    { date: "2023-09-14", value: 2400 },
    { date: "2023-09-15", value: 2100 },
    { date: "2023-09-16", value: 2300 },
    { date: "2023-09-17", value: 2500 },
    { date: "2023-09-18", value: 2060 },
    { date: "2023-09-19", value: 1955 }
  ],
  strengthProgress: {
    "Bench Press": [
      { date: "2023-08-21", value: 185 },
      { date: "2023-08-28", value: 190 },
      { date: "2023-09-04", value: 195 },
      { date: "2023-09-11", value: 195 },
      { date: "2023-09-18", value: 205 }
    ],
    "Squat": [
      { date: "2023-08-23", value: 225 },
      { date: "2023-08-30", value: 235 },
      { date: "2023-09-06", value: 245 },
      { date: "2023-09-13", value: 255 }
    ],
    "Deadlift": [
      { date: "2023-08-25", value: 245 },
      { date: "2023-09-01", value: 255 },
      { date: "2023-09-08", value: 265 },
      { date: "2023-09-15", value: 275 }
    ]
  }
};

// Dummy data for recent activities
export const recentActivities = [
  { 
    id: "a1", 
    type: "workout", 
    date: "Today", 
    title: "Completed Push Day", 
    description: "5 exercises, 19 sets" 
  },
  { 
    id: "a2", 
    type: "nutrition", 
    date: "Today", 
    title: "Daily Nutrition Goal", 
    description: "2,060 calories, 168g protein" 
  },
  { 
    id: "a3", 
    type: "achievement", 
    date: "Yesterday", 
    title: "New PR on Bench Press", 
    description: "205 lbs × 5 reps" 
  },
  { 
    id: "a4", 
    type: "workout", 
    date: "2 days ago", 
    title: "Completed Pull Day", 
    description: "5 exercises, 15 sets" 
  }
];

// Weekly stats
export const weeklyStats = {
  workouts: 4,
  volume: 24650, // total weight lifted in lbs
  avgCalories: 2223,
  avgProtein: 162,
  workoutTime: 270 // minutes
};
