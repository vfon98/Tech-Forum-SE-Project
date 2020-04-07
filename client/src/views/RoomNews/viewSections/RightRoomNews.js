import React, { Component } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import axios from '../../../axios/instance';
import history from '../../../utils/history';

import NewsItem from './Right/NewsItem';
import Loading from '../../../../src/components/Loading';
import InfiniteScroll from 'react-infinite-scroller';
import { parseTagFrom } from '../../../utils/converter';

import { withStyles } from '@material-ui/styles';
import roomNewsStyles from '../../../assets/jss/roomNewsStyles';

class RightRoomNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItems: [],
      isLoading: true,
      roomName: '',
      hasNextPage: false,
    };
  }

  componentDidMount() {
    const { pathname } = history.location;
    this.loadMorePage(1);
    this.setState({
      // pathname format /room/:name/news
      roomName: pathname.split('/')[2],
    });
  }

  loadMorePage = pageNumber => {
    // Old news
    const { newsItems } = this.state;
    axios
      .post('/news/test', { page: pageNumber })
      .then(res => {
        this.setState({
          newsItems: newsItems.concat(res.data.news),
          isLoading: false,
          hasNextPage: res.data.hasNextPage,
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const { newsItems, isLoading, roomName, hasNextPage } = this.state;

    return (
      <Paper className={classes.cardBg}>
        <Grid className={classes.titleWrapper}>
          <h3 className={classes.cardTitle}>Recent News</h3>
          {/* <p className={classes.cardTag}>{parseTagFrom(roomName)}</p> */}
        </Grid>
        {isLoading ? (
          <Loading />
        ) : (
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadMorePage}
            hasMore={hasNextPage}
            loader={<Loading />}
            threshold={400}
          >
            {newsItems.map(news => (
              <NewsItem key={news.id} news={news} />
            ))}
            {!hasNextPage ? <Typography textAlign='center'>No more to show</Typography> : ''}
          </InfiniteScroll>
        )}
      </Paper>
    );
  }
}

export default withStyles(roomNewsStyles)(RightRoomNews);
