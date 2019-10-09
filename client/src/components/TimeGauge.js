import React, {Component} from 'react'
import ReactD3Gauge from 'react-d3-gauge';


class TimeGauge extends Component {
    
    calculateTime(){
        let currentTime = this.props.hours;
        console.log ("current time " +currentTime)
        let gaugeTime;
        if (currentTime == 0 ||currentTime == null || currentTime == undefined || currentTime == NaN){
            
            gaugeTime= 50;
        } else if (currentTime > 100){
          gaugeTime = 100;
        }else if (currentTime < -100){
          gaugeTime = 0;
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
          colors={['#dc3545', '#28a745']}
          width={320}
          percent={this.calculateTime()}
        />
      </div>
    );
  }
}

export default TimeGauge;