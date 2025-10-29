import { useState, useCallback } from "react";
import questions from "../questions";
import TropyLogo from "../assets/quiz-complete.png";
import Progressbar from "./Progressbar";

export default function Quiz() {

    
    const [userAnswers, setUserAnswers] = useState([]);
   

    const isQuizFinished = userAnswers.length === questions.length;

    if (isQuizFinished) {
        return (
            <div id="summary">
                <img src={TropyLogo} alt="Quiz Completed" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }
    
     const activeQuestionIndex = userAnswers.length;
    const shuffledAnswers = [...questions[activeQuestionIndex].answers];
        shuffledAnswers.sort(() => Math.random() - 0.5);

    const skipQuestion = useCallback(() => {
        handleAnswerSelection(null)
    }, [handleAnswerSelection]);

    function handleAnswerSelection(answer) {
        setUserAnswers(prevAnswers => {
            return [...prevAnswers, answer];
        });
    }

    return (
        <div id="quiz">
            <Progressbar timer={15000} onTimeout={skipQuestion} />
            <h2 id="question"> { questions[activeQuestionIndex].text} </h2>
            <ul id="answers">
                {shuffledAnswers.map((answer, index) => (
                    <li key={index} className="answer">
                        <button onClick={() => handleAnswerSelection(answer)}>{ answer }</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}