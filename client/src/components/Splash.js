import React from "react";
import Typed from "react-typed";
import "./Splash.css";

const Splash = () => {
  return (
    <div className='row'>
      <img className='splashimage' src='./images/Splash.jpg' />
      <img className='splashmobile' src='./images/Splash-mobile.jpg' />

      <Typed
        className='typed'
        strings={[
          "Welcome to Code Timebank",
          "Ask for Help",
          "Help Others",
          "Earn Credits {time}",
          "Climb the Leaderboard",
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
