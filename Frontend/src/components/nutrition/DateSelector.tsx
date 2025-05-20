
import { nutritionLog } from "@/utils/data";

interface DateSelectorProps {
  selectedDate: number;
  onSelectDate: (index: number) => void;
}

const DateSelector = ({ selectedDate, onSelectDate }: DateSelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {nutritionLog.map((log, index) => {
        const date = new Date(log.date);
        const day = date.toLocaleDateString('en-US', { day: 'numeric' });
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        
        return (
          <button
            key={log.id}
            className={`flex flex-col items-center justify-center size-14 rounded-full border transition-colors press-effect ${
              selectedDate === index
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white text-foreground"
            }`}
            onClick={() => onSelectDate(index)}
          >
            <span className="text-xs font-medium">{month}</span>
            <span className="text-lg font-semibold">{day}</span>
          </button>
        );
      })}
    </div>
  );
};

export default DateSelector;
