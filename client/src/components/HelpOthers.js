import React, { useContext, useEffect } from 'react';
import questionContext from "../Context/question/questionContext";

function HelpOthers(props) {
    
    const QuestionContext = useContext(questionContext);
    const { getQuestions, questions } = QuestionContext;

    const loadQuestions = async () => {

        return await questions.map( ({id, question, comfort, language}) => {
            return (
                <div>
                    <p>{questions}</p>
                </div>
            )
        })

    }

    useEffect( () => {
        getQuestions();
    })

    return (
        <section>
            <h1>Help Others</h1>
            {loadQuestions()}
        </section>
    )
}

export default HelpOthers
