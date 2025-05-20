
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface ExerciseProgressCardProps {
  exercise: string;
  data: {
    date: string;
    weight: number;
  }[];
  changePercentage: string;
}

const ExerciseProgressCard = ({ exercise, data, changePercentage }: ExerciseProgressCardProps) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{exercise} Progress</h3>
        <div className="text-sm font-medium text-green-600">
          +{changePercentage}%
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickMargin={10}
              axisLine={false}
            />
            <YAxis 
              domain={['auto', 'auto']}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              name="Weight (lbs)"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExerciseProgressCard;
