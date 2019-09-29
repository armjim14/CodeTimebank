import React, { useContext } from 'react';
import questionContext from "../Context/question/questionContext";

function HelpOthers() {
    
    const QuestionContext = useContext(questionContext);
    const { getQuestions } = QuestionContext;

    const loadQuestions = () => {
        console.log(getQuestions)
        getQuestions();
    }

    return (
        <section>
            <h1>Help Others</h1>
            {loadQuestions}
        </section>
    )
}

export default HelpOthers
