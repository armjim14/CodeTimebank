import React, { useContext } from 'react';
import questionContext from "../Context/question/questionContext";

function HelpOthers() {
    
    const QuestionContext = useContext(questionContext);
    const { getQuestions } = QuestionContext;

    const loadQuestions = () => {
        getQuestions().then( data => data.map( info => console.log(info) ));
    }

    return (
        <section>
            <h1>Help Others</h1>
            {loadQuestions()}
        </section>
    )
}

export default HelpOthers
