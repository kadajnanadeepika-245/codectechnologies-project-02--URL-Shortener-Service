
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-gray-600">
          {Math.round(percentage)}% Complete
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-3 bg-gray-200"
      />
    </div>
  );
};

export default ProgressBar;
