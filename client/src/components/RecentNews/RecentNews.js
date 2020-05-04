import React, { Component } from 'react';
import { Paper, Grid, Button } from '@material-ui/core';
import axios from 'axios/instance';
import history from 'utils/history';

import InfiniteScroll from 'react-infinite-scroller';

import { withStyles } from '@material-ui/styles';
import roomNewsStyles from 'assets/jss/roomNewsStyles.jsx';

import Loading from 'components/Loading';
import RecentNewsItem from './RecentNewsItem';
import ComposeButton from './ComposeButton';
import { withRouter } from 'react-router-dom';

class RecentNews extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.match;
    this.state = {
      newsItems: [],
      isLoading: true,
      // pathname format /room/:name/news
      roomName: params.name,
      hasNextPage: false,
    };
  }

  componentDidMount() {
    this.loadMorePage(1);
    history.listen(() => {
      console.log('changed');
      this.setState({ newsItems: [], isLoading: true }, () => {
        this.loadMorePage(1);
      });
    });
  }

  loadMorePage = pageNumber => {
    const { newsItems } = this.state;
    const { params } = this.props.match;
    // Get all lastest news if roomName doesn't exists
    const endpoint = params.name ? `/news/room/${params.name}` : `/news/recent`;
    axios
      .post(endpoint, { page: pageNumber })
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
        </Grid>
        <div className={classes.composeBtn}>
          {/* {roomName ? parseTagFrom(roomName) : ''} */}
          {roomName && <ComposeButton />}
        </div>
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
              <RecentNewsItem
                key={news.id}
                news={news}
                theme={this.props.theme}
              />
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

export default withStyles(roomNewsStyles)(withRouter(RecentNews));
