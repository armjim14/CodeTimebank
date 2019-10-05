import React, {Component} from 'react'
import ReactD3Gauge from 'react-d3-gauge';


class TimeGauge extends Component {
    
    calculateTime(){
        let currentTime = this.props.hours;
        console.log ("current time " +currentTime)
        let gaugeTime;
        if (currentTime == 0 ||currentTime == null || currentTime == undefined || currentTime == NaN){
            
            gaugeTime= 50;
        } else {
            
            gaugeTime = 50 + (currentTime / 2)
        }
        console.log(gaugeTime)
       return gaugeTime
    }
  render() {
    return (
      <div className="App">
        <ReactD3Gauge
          needleColor="blue"
          colors={['red', 'green']}
          width={400}
          percent={this.calculateTime()}
        />
      </div>
    );
  }
}

export default TimeGauge;