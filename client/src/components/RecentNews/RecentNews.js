import React, { Component } from 'react';
import { Paper, Grid, Button } from '@material-ui/core';
import axios from 'axios/instance';
import history from 'utils/history';

import InfiniteScroll from 'react-infinite-scroller';
import { parseTagFrom } from 'utils/converter';

import { withStyles } from '@material-ui/styles';
import roomNewsStyles from 'assets/jss/roomNewsStyles.jsx';

import Loading from 'components/Loading';
import RecentNewsItem from './RecentNewsItem';

class RecentNews extends Component {
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
    const { classes, isInfinite = true } = this.props;
    const { newsItems, isLoading, roomName, hasNextPage } = this.state;

    return (
      <Paper className={classes.cardBg}>
        <Grid className={classes.titleWrapper}>
          <h3 className={classes.cardTitle}>Recent News</h3>
          <p className={classes.cardTag}>
            {roomName ? parseTagFrom(roomName) : ''}
          </p>
        </Grid>
        {isLoading ? (
          <Loading />
        ) : (
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadMorePage}
            hasMore={isInfinite && hasNextPage}
            loader={<Loading />}
          >
            {newsItems.map(news => (
              <RecentNewsItem key={news.id} news={news} theme={this.props.theme} />
            ))}
            {!hasNextPage && (
              <Grid className={classes.noMoreWrapper}>
                <Button
                  className={classes.noMoreButton}
                  variant='outlined'
                  size='small'
                  color='inherit'
                  fullWidth
                >
                  No more to show
                </Button>
              </Grid>
            )}
          </InfiniteScroll>
        )}
      </Paper>
    );
  }
}

export default withStyles(roomNewsStyles)(RecentNews);
