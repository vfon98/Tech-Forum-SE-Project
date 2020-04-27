import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import { Grid, Paper } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import dashboardStyles from 'assets/jss/admin/dashboardStyles';
import axios from 'axios/instance';

import PostChart from './PostChart';
import NewsChart from './NewsChart';
import Statistic from './Statistic';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      roomsName: [],
    };
  }

  componentDidMount() {
    axios
      .get('/rooms')
      .then((res) => {
        this.setState({
          rooms: res.data.rooms,
          roomsName: this.getDataField(res.data.rooms, 'name'),
        });
      })
      .catch((err) => console.log(err));
  }

  getDataField = (arr, field) => {
    return arr.map((item) => item[field]);
  };

  render() {
    const { classes } = this.props;
    const { rooms, roomsName } = this.state;

    return (
      <Layout>
        <Grid
          container
          justify='space-around'
          className={classes.statisticWrapper}
        >
          <Statistic />
        </Grid>
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
      </Layout>
    );
  }
}

export default withStyles(dashboardStyles)(Dashboard);
