import React, { useContext, useEffect, Fragment } from 'react';
import questionContext from "../Context/question/questionContext";

function HelpOthers(props) {
    
    const QuestionContext = useContext(questionContext);
    const { getQuestions, questions } = QuestionContext;

    const loadQuestions = async () => {

        await console.log(questions)

        // return await questions.map( ({id, question, comfort, language}) => {
        //     return (
        //         <div>
        //             <p>{question}</p>   
        //         </div>
        //     )
        // })

    }

    useEffect( () => {
        getQuestions();
    })

    return (
        <Fragment>
            <h1>Help Others</h1>
            {loadQuestions()}
        </Fragment>
    )
}

export default HelpOthers
