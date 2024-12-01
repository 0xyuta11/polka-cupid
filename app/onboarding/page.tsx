"use client";

// Import necessary components and hooks
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfoDialog from "@/components/infodialog";

// Define question type and structure
type Question = {
  id: number;
  type: "text" | "textarea" | "select" | "multiselect";
  question: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
};

// Define questions array with all onboarding questions
const questions: Question[] = [
  {
    id: 1,
    type: "text",
    question: "What's your name?",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    id: 2,
    type: "textarea",
    question: "Tell us about yourself",
    placeholder: "Share a brief introduction...",
    required: true,
  },
  {
    id: 3,
    type: "select",
    question: "What's your role?",
    options: ["Developer", "Designer", "Product Manager", "Other"],
    required: true,
  },
  {
    id: 4,
    type: "multiselect",
    question: "What are your interests?",
    options: ["Frontend", "Backend", "Mobile", "AI/ML", "DevOps", "UI/UX"],
    required: false,
  },
  {
    id: 5,
    type: "text",
    question: "What's your favorite color?",
    placeholder: "Enter your favorite color",
    required: false,
  },
];

export default function Onboarding() {
  // State management for current question, answers and character limit
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength: 180 });

  // Handle navigation between questions
  const handleNext = () => {
    const currentAnswer = answers[questions[currentQuestion].id];
    const isAnswerEmpty =
      !currentAnswer ||
      (Array.isArray(currentAnswer) && currentAnswer.length === 0);

    if (questions[currentQuestion].required && isAnswerEmpty) {
      return; // Don't proceed if required field is empty
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // Handle answer updates
  const handleAnswer = (value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));
  };

  // Render different input types based on question type
  const renderInput = () => {
    const question = questions[currentQuestion];

    switch (question.type) {
      // Text input component
      case "text":
        return (
          <Input
            placeholder={question.placeholder}
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            className="max-w-md"
          />
        );

      // Textarea component with character limit
      case "textarea":
        return (
          <>
            <Textarea
              id="textarea-16"
              rows={5}
              placeholder={question.placeholder}
              value={answers[question.id] || ""}
              maxLength={180}
              onChange={(e) => handleAnswer(e.target.value)}
              aria-describedby="characters-left-textarea"
            />
            <p
              id="characters-left-textarea"
              className="mt-2 text-right text-xs text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              <span className="tabular-nums">{limit - characterCount}</span>{" "}
              characters left
            </p>
          </>
        );

      // Select dropdown component
      case "select":
        return (
          <Select
            value={(answers[question.id] as string) || ""}
            onValueChange={(value) => handleAnswer(value)}
          >
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      // Multi-select checkbox component
      case "multiselect":
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={(answers[question.id] || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const currentAnswers =
                      (answers[question.id] as string[]) || [];
                    if (checked) {
                      handleAnswer([...currentAnswers, option]);
                    } else {
                      handleAnswer(
                        currentAnswers.filter((item) => item !== option)
                      );
                    }
                  }}
                />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    // Main container with responsive padding and centering
    <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress Bar - Shows current question progress */}
        <div className="flex gap-1 mb-12 md:mb-24 px-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className="relative h-0.5 md:h-1 flex-1 rounded-full bg-muted overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={false}
                animate={{
                  scaleX: index === currentQuestion ? 1 : 0,
                  originX: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              />
            </div>
          ))}
        </div>

        {/* Question Container with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-8 overflow-y-auto max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
          >
            {/* Question Title and Input Area */}
            <div className="space-y-4 px-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-newKansasMedium">
                {questions[currentQuestion].question}
                {questions[currentQuestion].required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h2>
              {renderInput()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-2 px-4 mt-auto">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="p-2 sm:p-3"
              >
                <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
                className="p-2 sm:p-3"
              >
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="fixed bottom-4 right-4">
        <InfoDialog
          message="Skip this page"
          link="/dashboard"
          linkText="Dashboard"
        />
      </div>
    </div>
  );
}
