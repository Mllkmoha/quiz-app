import QUESTIONS from "./questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Summary({ userAnswers }) {
  // Calculate skipped answers
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  
  // Calculate correct answers
  const correctAnswers = userAnswers.filter((answer, index) => {
    return answer === QUESTIONS[index].answers[0];
  });

  // Calculate wrong answers
  const wrongAnswers = userAnswers.length - skippedAnswers.length - correctAnswers.length;

  // Calculate percentages
  const skippedPercent = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  
  const correctPercent = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  
  const wrongPercent = 100 - skippedPercent - correctPercent;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Complete!</h2>

      {/* Stats */}
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercent}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctPercent}%</span>
          <span className="text">Correct</span>
        </p>
        <p>
          <span className="number">{wrongPercent}%</span>
          <span className="text">Wrong</span>
        </p>
      </div>

      {/* Detailed Results */}
      <ol>
        {userAnswers.map((answer, index) => {
          // Determine CSS class
          let cssClass = "user-answer";
          
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>
                {answer || "Skipped"}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}