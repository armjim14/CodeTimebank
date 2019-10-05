import React, {Component} from 'react'
import ReactD3Gauge from 'react-d3-gauge';
import { callbackify } from 'util';

class App extends Component {
    
    calculateTime(){
        let currentTime = 70;
        let gaugeTime;
        if (currentTime == 0 || null || undefined){
            
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

export default App;