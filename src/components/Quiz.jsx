import { useState } from "react";
import questions from "../questions";

export default function Quiz() {

    
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    function handleAnswerSelection(answer) {
        setUserAnswers(prevAnswers => {
            return [...prevAnswers, answer];
        });
    }

    return (
        <div id="quiz">
            <h2 id="question"> { questions[activeQuestionIndex].text} </h2>
            <ul id="answers">
                {questions[activeQuestionIndex].answers.map((answer, index) => (
                    <li key={index} className="answer">
                        <button onClick={() => handleAnswerSelection(answer)}>{ answer }</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}