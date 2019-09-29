import React, { useContext, useEffect } from 'react';
import questionContext from "../Context/question/questionContext";

function HelpOthers(props) {
    
    const QuestionContext = useContext(questionContext);
    const { getQuestions, questions } = QuestionContext;

    const loadQuestions = () => {
        console.log(questions)
        // console.log(getQuestions)
        //getQuestions().then( data => console.log(data)/*data.map(info => console.log(info))*/ );
    }

    useEffect(
        () => loadQuestions(),
        //eslint-disable-next-line
        []
      );

    return (
        <section>
            <h1>Help Others</h1>
            {/* {loadQuestions()} */}
        </section>
    )
}

export default HelpOthers
