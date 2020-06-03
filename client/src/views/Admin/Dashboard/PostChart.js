import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

const data = {
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
      label: 'Posts per room',
      backgroundColor: 'rgba(156,39,176,0.1)',
      // backgroundColor: 'rgba(0,0,0,0)',
      borderColor: purple[500],
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(156,39,176,0.4)',
      hoverBorderColor: purple[600],
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      barPercentage: 0.5,
      hoverBorderWidth: 3,
    },
  ],
};

class PostChart extends Component {
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
      this.setState({ data: data });
    }
  }

  render() {
    return (
      <>
        <Typography component='h5' style={{ color: '#9a9a9a' }}>
          Total posts by room
        </Typography>
        <Bar
          data={data}
          // width={100}
          // height={200}
          options={{
            // maintainAspectRatio: false,
            plugins: {
              datalabels: {
                display: 'auto',
                color: 'white',
                anchor: 'end',
                align: 'end',
                offset: '-1',
              },
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: 'rgba(156,39,176,1)',
                    lineWidth: 0.1,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                  gridLines: {
                    color: 'rgba(156,39,176,1)',
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

export default PostChart;
