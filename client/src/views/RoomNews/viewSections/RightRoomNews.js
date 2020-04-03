import React, { Component } from 'react';
import { withStyles, Paper, Box, Grid } from '@material-ui/core';
import axios from '../../../axios/instance';
import history from '../../../utils/history';

import NewsItem from './Right/NewsItem';
import Loading from '../../../../src/components/Loading';
import roomNewsStyles from '../../../assets/jss/roomNewsStyles';
import { parseTagFrom } from '../../../utils/converter';

class RightRoomNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItems: [],
      isLoading: true,
      roomName: ''
    };
  }

  componentDidMount() {
    const { pathname } = history.location;
    axios
      .get('/news/all')
      .then(res => {
        console.log('res.data', res.data);
        this.setState({
          newsItems: res.data.news,
          isLoading: false,
        });
      })
      .catch(err => console.log(err));
    this.setState({
      roomName: pathname.split('/')[2]
    })
  }

  render() {
    const { classes } = this.props;
    const { newsItems, isLoading, roomName } = this.state;

    return (
      <Paper className={classes.cardBg}>
        <Grid className={classes.titleWrapper}>
          <h3 className={classes.cardTitle}>Recent News</h3>
          <p className={classes.cardTag}>{parseTagFrom(roomName)}</p>
        </Grid>
        {isLoading ? (
          <Loading />
        ) : (
          newsItems.map(news => <NewsItem key={news.id} news={news} />)
        )}
      </Paper>
    );
  }
}

export default withStyles(roomNewsStyles)(RightRoomNews);
