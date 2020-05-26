import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import { Paper } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import axios from 'axios/instance';

import PostChart from './PostChart';
import NewsChart from './NewsChart';

const dashboardStyles = {
  chartWrapper: {
    background: '#27293D',
    margin: '0 16px',
    marginBottom: '32px',
    padding: '24px',
    '@media (max-width: 600px)': {
      padding: '8px',
      marginTop: '16px'
    }
  }
};

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
      .then(res => {
        this.setState({
          rooms: res.data.rooms,
          roomsName: this.getDataField(res.data.rooms, 'name'),
        });
      })
      .catch(err => console.log(err));
  }

  getDataField = (arr, field) => {
    return arr.map(item => item[field]);
  };

  render() {
    const { classes } = this.props;
    const { rooms, roomsName } = this.state;

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
      </Layout>
    );
  }
}

export default withStyles(dashboardStyles)(Dashboard);
