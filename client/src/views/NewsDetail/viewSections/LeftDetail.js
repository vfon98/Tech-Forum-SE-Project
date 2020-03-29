import React, { Component } from 'react';
import {
  Paper,
  Typography,
  Card,
  Divider,
  CardContent,
  CardMedia,
  Box,
} from '@material-ui/core';
import newsPlaceholder from 'assets/img/news-placeholder.jpg';
import axios from '../../../axios/instance';

import newsDetailStyles from '../../../assets/jss/newsDetailStyles';
import { withStyles } from '@material-ui/styles';

import NewsBreadcrumbs from './Left/NewsBreadcrumbs';
import NewsHeader from './Left/NewsHeader';
import NewsActions from './Left/NewsActions';
import UserComment from '../../Room/viewSections/Main/UserComment';
import CommentInput from '../../Room/viewSections/Main/CommentInput';
import OtherNews from './Left/OtherNews';

class LeftDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {},
      needUpdateComment: null,
      commentsNum: 0,
      likesNum: 0,
      viewsNum: 0,
    };
  }

  componentDidMount() {
    axios
      .get('/news/5e7b290e292573070b0435c1')
      .then(res => {
        const { news } = res.data;
        this.setState({
          news: news,
          commentsNum: news.comments.length,
          likesNum: news.likes.length,
          viewsNum: news.views,
        });
      })
      .catch(err => console.log(err));
  }

  handleToggleLike = () => {
    axios
      .post('/likes', {
        postID: this.state.news.id,
        type: 'news',
      })
      .then(res => {
        this.setState({
          likesNum: res.data.likes,
        });
      })
      .catch(err => console.log(err));
  };

  handleUpdateComment = comment => {
    this.setState({
      needUpdateComment: comment,
    });
  };

  handleDeleteComment = id => {
    axios
      .delete(`/comments/${id}?type=news`)
      .then(res => {
        this.handleRefreshComments(res.data.comments);
      })
      .catch(err => console.log(err));
  };

  handleRefreshComments = comments => {
    console.log('refresh', comments);
    const { news } = this.state;
    news.comments = comments;
    this.setState({ news });
  };

  render() {
    const { classes } = this.props;
    const { news, likesNum, commentsNum, viewsNum } = this.state;

    return (
      <>
        <Card className={classes.secondaryBg}>
          <Paper elevation={3} className={classes.leftWrapper}>
            <NewsBreadcrumbs room={news.room} />

            <NewsHeader
              news={news}
              commentsNum={commentsNum}
              viewsNum={viewsNum}
            />
            <Divider />

            <CardContent>
              <CardMedia
                className={classes.newsThumbnail}
                component='img'
                image={news.thumbnail ? news.thumbnail : newsPlaceholder}
              />
              <Divider />
              <Typography
                className={classes.newsContent}
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </CardContent>

            <NewsActions
              likesNum={likesNum}
              toggleLike={this.handleToggleLike}
            />
          </Paper>
        </Card>
        <Paper
          elevation={2}
          className={classes.leftWrapper}
          style={{ marginTop: '0.5em' }}
        >
          <OtherNews />
        </Paper>
        <Paper
          elevation={2}
          className={classes.leftWrapper}
          style={{ marginTop: '0.5em' }}
        >
          {/* <Button fullWidth color='inherit' variant='outlined'>30 Comments</Button> */}
          <Box mb={1}>
            <CommentInput
              postId={news.id}
              type='news'
              refreshComments={this.handleRefreshComments}
              needUpdateComment={this.state.needUpdateComment}
              cancelUpdateMode={() => this.setState({ needUpdateComment: null })}
            />
          </Box>
          <Divider />
          {news.comments &&
            news.comments.map(comment => (
              <UserComment
                key={comment.id}
                comment={comment}
                isOwner={news.user_id === comment.user_id}
                onUpdateComment={this.handleUpdateComment}
                onDeleteComment={this.handleDeleteComment}
              />
            ))}
        </Paper>
      </>
    );
  }
}

export default withStyles(newsDetailStyles)(LeftDetail);
