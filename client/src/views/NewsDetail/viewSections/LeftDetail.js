import React, { Component } from 'react';
import {
  Paper,
  Typography,
  Card,
  Divider,
  CardContent,
  CardMedia,
  Box,
  Button,
  Collapse,
} from '@material-ui/core';
import newsPlaceholder from 'assets/img/news-placeholder.jpg';
import axios from '../../../axios/instance';
import history from '../../../utils/history';

import newsDetailStyles from '../../../assets/jss/newsDetailStyles';
import { withStyles } from '@material-ui/styles';

import NewsBreadcrumbs from './Left/NewsBreadcrumbs';
import NewsHeader from './Left/NewsHeader';
import NewsActions from './Left/NewsActions';
import UserComment from '../../Room/viewSections/Main/UserComment';
import CommentInput from '../../Room/viewSections/Main/CommentInput';
import OtherNews from './Left/OtherNews';
import Loading from '../../../components/Loading';
import { ExpandMoreRounded, ExpandLessRounded } from '@material-ui/icons';

class LeftDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {},
      needUpdateComment: null,
      isLoading: true,
      isCommentsShown: true,
      commentsNum: 0,
      likesNum: 0,
      viewsNum: 0,
    };
  }

  componentDidMount() {
    // Fetch when loaded
    this.fetchNews();
    // Fetch when location changed
    history.listen(() => {
      this.setState({ isLoading: true });
      this.fetchNews();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { comments } = this.state.news;
    if (comments && prevState.commentsNum !== comments.length) {
      this.setState({
        commentsNum: comments.length,
      });
    }
  }

  fetchNews() {
    window.scrollTo(0, 0);
    const { pathname } = history.location;
    axios
      .get(pathname || '/news/5e7b290e292573070b0435c1')
      .then(res => {
        const { news } = res.data;
        this.setState({
          news: news,
          isLoading: false,
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
    const { news } = this.state;
    news.comments = comments;
    this.setState({ news });
  };

  toggleComments = () => {
    this.setState({
      isCommentsShown: !this.state.isCommentsShown,
    });
  };

  render() {
    const { classes } = this.props;
    const { news, isLoading, likesNum, commentsNum, viewsNum } = this.state;
    const { isCommentsShown } = this.state;

    return isLoading ? <Loading /> : (
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
        <Paper elevation={2} className={classes.leftWrapper}>
          <OtherNews />
        </Paper>
        <Paper elevation={2} className={classes.leftWrapper}>
          <Box className={classes.btnCommentsToggle}>
            <Button
              color='primary'
              className={classes.btnComments}
              variant='contained'
              fullWidth
              onClick={this.toggleComments}
              endIcon={
                isCommentsShown ? <ExpandLessRounded /> : <ExpandMoreRounded />
              }
            >
              {commentsNum} Comments
            </Button>
          </Box>
          <Collapse in={isCommentsShown}>
            <Box className={classes.commentBoxWrapper}>
              <CommentInput
                postId={news.id}
                type='news'
                refreshComments={this.handleRefreshComments}
                needUpdateComment={this.state.needUpdateComment}
                cancelUpdateMode={() =>
                  this.setState({ needUpdateComment: null })
                }
              />
            </Box>
            <Divider variant='middle' />

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
          </Collapse>
        </Paper>
      </>
    );
  }
}

export default withStyles(newsDetailStyles)(LeftDetail);
