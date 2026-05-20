import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 0) {
            onTimeout();
            return 0;
          }
          return prev - 50;
        });
      }, 50);
  
      return () => clearInterval(interval);
    }, [timeout, onTimeout]);
  
    return (
      <progress 
        id="question-progress" 
        max={timeout} 
        value={remainingTime}
        className={mode}  // ← NEW: Use mode for styling
      />
    );
  }