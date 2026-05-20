import { useState } from "react";
import QUESTIONS from "./questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  const question = QUESTIONS[index];

  // DYNAMIC TIMER! ← NEW
  let timer = 10000; // Default: 10 seconds
  
  if (answer.selectedAnswer) {
    timer = 1000; // Wait 1s to show result
  }
  
  if (answer.isCorrect !== null) {
    timer = 2000; // Wait 2s before moving to next
  }

  const handleSelectAnswer = (selectedAnswer) => {
    setAnswer({
      selectedAnswer,
      isCorrect: null,
    });

    setTimeout(() => {
      const isCorrect = selectedAnswer === question.answers[0];
      setAnswer({
        selectedAnswer,
        isCorrect,
      });

      setTimeout(() => {
        onSelectAnswer(selectedAnswer);
      }, 2000);
    }, 1000);
  };

  // CONDITIONAL onTimeout! ← NEW
  const handleTimeout = answer.selectedAnswer === "" ? onSkipAnswer : null;

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer 
        key={timer}  // ← NEW: Recreate when timer changes
        timeout={timer}  // ← NEW: Dynamic timer
        onTimeout={handleTimeout}  // ← NEW: Conditional
        mode={answerState}  // ← NEW: For styling
      />
      <h2>{question.text}</h2>
      <Answers
        answers={question.answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}