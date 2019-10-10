import React from 'react'
import { render } from 'react-dom';
import Typed from 'react-typed';


// import WordCloud from './WordCloud'

const Splash = () => {
    return (
        <div>
            <img className="splashImage" src="">
            {/* <WordCloud /> */}
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
                </img>
        </div>

)
}

export default Splash
