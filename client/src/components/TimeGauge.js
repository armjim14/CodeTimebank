import React, { useEffect } from "react";
import ReactD3Gauge from "react-d3-gauge";

const TimeGauge = props => {
  let gaugeTime;
  const calculateTime = () => {
    let currentTime = props.hours;
    // console.log("current time " + currentTime);
    if (currentTime > 100) {
      gaugeTime = 100;
    } else if (currentTime < -100) {
      gaugeTime = 0;
    } else {
      gaugeTime = 50 + currentTime / 2;
      // console.log(gaugeTime);
    }
    // console.log(`Gauge time should be`, gaugeTime);
    return gaugeTime;
  };

  useEffect(() => {
    calculateTime();
    // console.log("calc time ran from useEffect");
    //eslint-disable-next-line
  }, [props.hours]);

  return (
    <div id='gauge'>
      <ReactD3Gauge
        needleColor='blue'
        colors={["#dc3545", "#28a745"]}
        width={320}
        percent={calculateTime()}
      />
    </div>
  );
};

export default TimeGauge;
