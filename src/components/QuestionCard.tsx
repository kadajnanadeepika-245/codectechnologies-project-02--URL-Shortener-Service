
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  isMultiple?: boolean;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | number[] | undefined;
  onAnswer: (answer: number | number[]) => void;
}

const QuestionCard = ({ question, selectedAnswer, onAnswer }: QuestionCardProps) => {
  const [localSelection, setLocalSelection] = useState<number[]>([]);

  const handleSingleChoice = (optionIndex: number) => {
    onAnswer(optionIndex);
  };

  const handleMultipleChoice = (optionIndex: number) => {
    const newSelection = localSelection.includes(optionIndex)
      ? localSelection.filter(i => i !== optionIndex)
      : [...localSelection, optionIndex];
    
    setLocalSelection(newSelection);
    onAnswer(newSelection);
  };

  const isSelected = (optionIndex: number) => {
    if (question.isMultiple) {
      return Array.isArray(selectedAnswer) ? selectedAnswer.includes(optionIndex) : localSelection.includes(optionIndex);
    }
    return selectedAnswer === optionIndex;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Question {question.id}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {question.question}
        </p>
        {question.isMultiple && (
          <p className="text-sm text-blue-600 mt-2 font-medium">
            Select all that apply (3 options)
          </p>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <Card
            key={index}
            className={cn(
              "p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2",
              isSelected(index)
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 bg-white"
            )}
            onClick={() => question.isMultiple ? handleMultipleChoice(index) : handleSingleChoice(index)}
          >
            <div className="flex items-start gap-3">
              {question.isMultiple ? (
                <Checkbox
                  checked={isSelected(index)}
                  onChange={() => handleMultipleChoice(index)}
                  className="mt-1"
                />
              ) : (
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 mt-1 transition-colors",
                    isSelected(index)
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  )}
                >
                  {isSelected(index) && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
              )}
              <span className="text-gray-700 leading-relaxed">{option}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
