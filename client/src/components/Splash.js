import React from 'react'
import Typed from 'react-typed';
import './Splash.css'



const Splash = () => {
    return (
        <div >
            <img className="splashimage" src="./images/Splash.jpg" />
            
            <Typed 
            className="typed"
            strings= {['Welcome to code time bank',
                        'Ask for Help',
                        'Help others',
                        'Earn time for your bank',
                        'Ready to Code?']}
                        typeSpeed={80}
                        backSpeed={30}
                        backDelay={300}
                        loop>

                        </Typed>
                        
                
        </div>

)
}

export default Splash
