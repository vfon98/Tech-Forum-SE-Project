import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

let data = {
  labels: [
    // 'Windows',
    // 'macOS',
    // 'Linux',
    // 'iOS',
    // 'Android',
    // 'Smartphone',
    // 'Laptop - Desktop',
    // 'Programming',
  ],
  datasets: [
    {
      label: 'News per room',
      backgroundColor: 'rgba(33, 150, 243,0.1)',
      // backgroundColor: 'rgba(0,0,0,0)',
      borderColor: blue[500],
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(33, 150, 243,0.2)',
      hoverBorderColor: blue[600],
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      barPercentage: 0.5,
      hoverBorderWidth: 3,
    },
  ],
};

class NewsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data.labels !== this.props.roomsName) {
      data.labels = this.props.roomsName;
      data.datasets[0].data = this.props.data;
      console.log('data', data)
      this.setState({data: data});
    }
  }

  render() {
    return (
      <>
        <Typography component='h5' style={{ color: '#9a9a9a' }}>
          Total news by room
        </Typography>
        <Bar
          data={data}
          // width={100}
          // height={50}
          options={{
            maintainAspectRatio: true,
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: 'rgba(76, 175, 80)',
                    lineWidth: 0.1,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    color: 'rgba(76, 175, 80)',
                    lineWidth: 0.1,
                  },
                },
              ],
            },
          }}
        />
      </>
    );
  }
}

export default NewsChart;
