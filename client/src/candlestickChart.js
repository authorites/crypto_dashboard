import Chart from "react-google-charts";
import { Component } from "react";
import axios from 'axios';

class CandlestickChart extends Component {

  constructor(props) {
    super(props);
    this.state = {data: ""};
  }

  componentDidMount() { 
    axios.get(`http://localhost:8000/`)
      .then(res => {
        this.setState({ data: res.data });
    })
  }

  render() {
    return (
      <div style={{ display: 'flex', height: 'auto'}}>
          <Chart
              width={'100%'}
              height={350}
              chartType="CandlestickChart"
              loader={<div>Loading Chart</div>}
              data={[
                  ['day', 'high', 'open', 'close', 'low'],
                  ...this.state.data
              ]}
              options={{
                  legend: 'none',
                  bar: {groupWidth: "100%"}, // Remove space between bars.
                  candlestick: {
                    fallingColor: {strokeWidth: 0, fill: "#a52714"}, // red
                    risingColor: {strokeWidth: 0, fill: "#0f9d58"}, // green
                  },
              }}
              rootProps={{ 'data-testid': '1' }}
          />
      </div>
    );
  }
}

  export default CandlestickChart;