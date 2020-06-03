import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'number of posts',
      fill: true,
      lineTension: 0.2,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

class NewsLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
    };
  }
  
  componentDidMount() {
    data.labels = this.props.labels;
    data.datasets[0].data = this.props.data;
    this.setState({ data })
  }

  render() {
    return (
      <>
        <Typography component='h5' style={{ color: '#9a9a9a' }}>
          Recent created posts
        </Typography>
        <Line
          data={data}
          options={{
            plugins: {
              datalabels: {
                display: 'auto',
                color: 'white',
                anchor: 'end',
                align: 'end',
                offset: '-1',
              },
            },
          }}
        />
      </>
    );
  }
}

export default NewsLineChart;
