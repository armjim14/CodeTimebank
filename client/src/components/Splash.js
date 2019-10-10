import React from 'react'
// import { render } from 'react-dom';
import Typed from 'react-typed';
import './Splash.css'

import WordCloud from './WordCloud'

const Splash = () => {
    return (
        <div >
            <img src="./images/Splash.jpg" />
            <h1 className="typed">
            <Typed 
            className="typed"
            strings= {['Welcome to code time bank',
                        'Ask for Help',
                        'Help others',
                        'Earn time for your bank',
                        'Ready to Code?']}
                        typeSpeed={30}
                        backSpeed={40}
                        backDelay={20}
                        loop>

                        </Typed></h1>
                
        </div>

)
}

export default Splash
