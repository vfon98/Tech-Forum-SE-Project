import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import { Paper, Grid } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import axios from 'axios/instance';

import PostChart from './PostChart';
import NewsChart from './NewsChart';
import NewsLineChart from './NewsLineChart';
import PostLineChart from './PostLineChart';
// import tablelabels for all child components
import 'chartjs-plugin-datalabels';

const dashboardStyles = {
  chartWrapper: {
    background: '#27293D',
    margin: '0 16px',
    marginBottom: '32px',
    padding: '24px',
    '@media (max-width: 600px)': {
      padding: '8px',
      marginTop: '16px',
    },
  },
  lineChartWrapper: {
    background: '#27293D',
    margin: '0 16px',
    marginBottom: '32px',
    padding: '16px',
    '@media (max-width: 600px)': {
      padding: '8px',
      marginTop: '16px',
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      roomsName: [],
      // For line chart
      labels: [],
      data: { news: [], posts: [] },
    };
  }

  componentDidMount() {
    axios
      .get('/rooms')
      .then(res => {
        this.setState({
          rooms: res.data.rooms,
          roomsName: this.getDataField(res.data.rooms, 'name'),
        });
      })
      .catch(err => console.log(err));
    axios.get('/admin/statistic').then(res => {
      this.setState({
        data: res.data.statistics,
        labels: this.getDataField(res.data.statistics.posts, 'date'),
      });
    });
  }

  getDataField = (arr, field) => {
    return arr.map(item => item[field]);
  };

  render() {
    const { classes } = this.props;
    const { rooms, roomsName, labels, data } = this.state;

    return (
      <Layout>
        <Paper className={classes.chartWrapper}>
          <PostChart
            roomsName={roomsName}
            data={this.getDataField(rooms, 'total_posts')}
          />
        </Paper>
        <Paper className={classes.chartWrapper}>
          <NewsChart
            roomsName={roomsName}
            data={this.getDataField(rooms, 'total_news')}
          />
        </Paper>
        {data.posts.length && (
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.lineChartWrapper}>
                <PostLineChart
                  labels={labels}
                  data={this.getDataField(data.posts, 'total')}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.lineChartWrapper}>
                <NewsLineChart
                  labels={labels}
                  data={this.getDataField(data.news, 'total')}
                />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Layout>
    );
  }
}

export default withStyles(dashboardStyles)(Dashboard);
