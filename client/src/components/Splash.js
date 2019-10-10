import React from 'react'
// import { render } from 'react-dom';
import Typed from 'react-typed';


import WordCloud from './WordCloud'

const Splash = () => {
    return (
        <div>
            <h1>Splash</h1>
            {/* <img className="splashImage" src=""> */}
            
            <Typed
                    strings={['Here you can find anything']}
                    typeSpeed={40}
                />
                <br/>
 
                <Typed
                strings={[
                    'Search for products',
                    'Search for categories',
                    'Search for brands']}
                    typeSpeed={40}
                    backSpeed={50}
                    attr="placeholder"
                    loop >
                    <input type="text"/>
                </Typed>
                {/* </img> */}
                <WordCloud />
        </div>

)
}

export default Splash
