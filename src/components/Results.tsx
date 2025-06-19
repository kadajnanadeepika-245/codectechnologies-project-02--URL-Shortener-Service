
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  isMultiple?: boolean;
}

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  questions: Question[];
  userAnswers: (number | number[])[];
}

const Results = ({ score, totalQuestions, onRestart, questions, userAnswers }: ResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent work! You have a strong understanding of Generative AI concepts.";
    if (percentage >= 60) return "Good job! You have a solid foundation, but there's room for improvement.";
    return "Keep studying! Review the concepts and try again.";
  };

  const isCorrect = (questionIndex: number) => {
    const question = questions[questionIndex];
    const userAnswer = userAnswers[questionIndex];
    
    if (question.isMultiple) {
      const correctAnswers = question.correctAnswer as number[];
      const userAnswersArray = userAnswer as number[];
      return userAnswersArray && Array.isArray(userAnswersArray) && 
             correctAnswers.length === userAnswersArray.length &&
             correctAnswers.every(ans => userAnswersArray.includes(ans));
    } else {
      return userAnswer === question.correctAnswer;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-8 text-center bg-white/70 backdrop-blur-sm shadow-lg border-0">
        <div className="flex justify-center mb-4">
          <Trophy className={cn("w-16 h-16", getScoreColor())} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <div className={cn("text-6xl font-bold mb-2", getScoreColor())}>
          {score}/{totalQuestions}
        </div>
        <div className={cn("text-2xl font-semibold mb-4", getScoreColor())}>
          {percentage}%
        </div>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          {getScoreMessage()}
        </p>
        <Button
          onClick={onRestart}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Take Quiz Again
        </Button>
      </Card>

      <Card className="p-6 bg-white/70 backdrop-blur-sm shadow-lg border-0">
        <h3 className="text-xl font-semibold mb-4">Review Your Answers</h3>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-start gap-3 mb-2">
                {isCorrect(index) ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Question {question.id}: {question.question}
                  </h4>
                  
                  {question.isMultiple ? (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Your answers:</p>
                      <div className="flex flex-wrap gap-1">
                        {(userAnswers[index] as number[] || []).map((ansIndex) => (
                          <Badge key={ansIndex} variant="outline">
                            {question.options[ansIndex]}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Correct answers:</p>
                      <div className="flex flex-wrap gap-1">
                        {(question.correctAnswer as number[]).map((ansIndex) => (
                          <Badge key={ansIndex} className="bg-green-100 text-green-800">
                            {question.options[ansIndex]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        Your answer: <span className="font-medium">
                          {userAnswers[index] !== undefined ? question.options[userAnswers[index] as number] : "Not answered"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Correct answer: <span className="font-medium text-green-600">
                          {question.options[question.correctAnswer as number]}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Results;
