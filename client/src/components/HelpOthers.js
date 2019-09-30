import React, { useContext, useEffect, Fragment, useState } from 'react';
import questionContext from "../Context/question/questionContext";

function HelpOthers() {
    
    const QuestionContext = useContext(questionContext);
    const { getQuestions, questions } = QuestionContext;

    const [ allQuestions, getAllQuestions ] = useState([]);

    const loadQuestions = async () => {

        getAllQuestions(questions)

    }

    const allStuff = async () => {
        console.log(allQuestions)
        return await allQuestions.map( info => <p>{info.question}</p> )
    }

    useEffect( () => {
        getQuestions()
        .then(() => loadQuestions());
    })

    return (
        <Fragment>
            <h1>Help Others</h1>
            {allStuff()}
        </Fragment>
    )
}

export default HelpOthers
