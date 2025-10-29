import { useState, useCallback, useMemo } from "react";
import questions from "../questions";
import TropyLogo from "../assets/quiz-complete.png";
import Progressbar from "./Progressbar";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    
    const handleAnswerSelection = useCallback((answer) => {
        setUserAnswers(prevAnswers => [...prevAnswers, answer]);
    }, []);

    const skipQuestion = useCallback(() => {
        handleAnswerSelection(null);
    }, [handleAnswerSelection]);

    const activeQuestionIndex = userAnswers.length;
    const isQuizFinished = userAnswers.length === questions.length;

    const shuffledAnswers = useMemo(() => {
        if (isQuizFinished) return [];
        const answers = [...questions[activeQuestionIndex].answers];
        return answers.sort(() => Math.random() - 0.5);
    }, [activeQuestionIndex, isQuizFinished]);

    if (isQuizFinished) {
        return (
            <div id="summary">
                <img src={TropyLogo} alt="Quiz Completed" />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    return (
        <div id="quiz">
            <Progressbar key={activeQuestionIndex} timer={15000} onTimeout={skipQuestion} />
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