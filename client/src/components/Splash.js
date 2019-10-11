import React from "react";
import Typed from "react-typed";
import "./Splash.css";

const Splash = () => {
  return (
    <div>
      <img className='splashimage' src='./images/Splash.jpg' />

      <Typed
        className='typed'
        strings={[
          "Welcome to Code Timebank",
          "Ask for Help",
          "Help others",
          "Earn credits (time) and climb the leaderboard",
          "Ready to Code?"
        ]}
        typeSpeed={80}
        backSpeed={30}
        backDelay={1500}
        loop
      ></Typed>
    </div>
  );
};

export default Splash;
