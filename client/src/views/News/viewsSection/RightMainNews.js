import React, { Component } from 'react';
import { Paper, Typography, Grid, Box } from '@material-ui/core';
import axios from '../../../axios/instance';

import { withStyles } from '@material-ui/styles';
import newsStyles from '../../../assets/jss/newsStyles';

import TrendingSlider from './Trending/TrendingSlider';

class RightMainNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingNews: [],
    };
  }

  componentDidMount() {
    axios.get('/news/trending').then(res => {
      this.setState({
        trendingNews: res.data.news,
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { trendingNews } = this.state;

    return (
      <Paper className={classes.trendingNewsWrapper}>
        <Typography className={classes.cardTitle}>Trending</Typography>
        <TrendingSlider news={trendingNews} />
      </Paper>
    );
  }
}

export default withStyles(newsStyles)(RightMainNews);
