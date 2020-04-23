import React, { Component } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Divider,
  Typography,
  CardActions,
  Grid,
  CardMedia,
  Button,
  Box,
  Collapse,
  Tooltip,
} from '@material-ui/core';
import { ThumbUp, Share, Chat, Report } from '@material-ui/icons';

import { getUser, isLogin } from '../../../../utils/session';
import axios from '../../../../axios/instance';

import { withStyles } from '@material-ui/styles';
import roomStyles from 'assets/jss/roomStyles';

import PostHeader from './PostHeader';
import ReportPopup from '../../../../components/ReportPopup';
import UserComment from '../../../../components/Comment/UserComment';
import CommentInput from '../../../../components/Comment/CommentInput';

class UserPost extends Component {
  constructor(props) {
    super(props);
    const { post } = this.props;
    this.state = {
      // Default comments expansion state
      isExpanded: true,
      // Does user like this post
      liked: false,
      // Post number of likes and comments
      likesNum: post.likes.length,
      commentsNum: post.comments.length,
      // Report popup
      isOpenReport: false,
      // Comment pass to CommentInput that need to update
      needUpdateComment: null,
      // Display shadow on hover post
      isShadow: false,
      post: post,
      isLogin: false,
    };
  }

  componentDidMount() {
    this.setState({
      // liked: this.checkLiked(this.state.post),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { comments } = this.state.post;
    // Adjust comment numbers when state changed
    if (prevState.commentsNum !== comments.length) {
      this.setState({
        commentsNum: comments.length,
      });
    }
    // Check like status when logout
    if (!isLogin() && this.state.liked === true) {
      this.setState({ liked: false, isLogin: false });
    }
    // Check like status when login
    if (isLogin() && isLogin() !== this.state.isLogin) {
      this.setState({ isLogin: true, liked: this.checkLiked(this.state.post) });
    }
  }

  checkLiked = post => {
    const user = getUser();
    if (!post || !user) return false;
    return post.likes.some(like => like.user_id === user._id);
  };

  toggleLike = () => {
    if (!isLogin()) {
      return window.handlePopup('login');
    }
    axios
      .post('/likes', { postID: this.state.post.id })
      .then(res => {
        this.setState({
          likesNum: res.data.likes,
        });
      })
      .catch(err => console.log(err));
    this.setState({
      liked: !this.state.liked,
    });
  };

  handleRefreshComments = comments => {
    const { post } = this.state;
    post.comments = comments;
    this.setState({ post });
  };

  handleUpdateComment = comment => {
    this.setState({
      needUpdateComment: comment,
    });
  };

  handleDeleteComment = id => {
    axios
      .delete(`/comments/${id}`)
      .then(res => {
        this.handleRefreshComments(res.data.comments);
      })
      .catch(err => console.log(err));
  };

  toggleReportPopup = () => {
    this.setState({
      isOpenReport: !this.state.isOpenReport,
    });
  };

  toggleShadow = () => {
    this.setState({
      isShadow: !this.state.isShadow,
    });
  };

  render() {
    const { classes } = this.props;
    const { post, liked, isShadow } = this.state;

    return (
      <Box className={classes.postWrapper}>
        <Card
          className={classes.bgPrimary}
          raised={isShadow}
          onMouseEnter={this.toggleShadow}
          onMouseLeave={this.toggleShadow}
        >
          {/* HEADER SECTION */}
          <PostHeader post={post} />
          <Divider />
          {/* CONTENT SECTION */}
          <CardContent>
            {/* <CardMedia component='img' image='https://placehold.it/400x200' /> */}
            <Typography
              className={classes.postContent}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
          <Divider />
          {/* ACTIONS SECTION */}
          <CardActions>
            <Grid container className={classes.container}>
              <Grid item container justify='flex-start' sm={3}>
                <Button
                  className={classes.btnLink}
                  color={liked ? 'primary' : 'inherit'}
                  onClick={this.toggleLike}
                  startIcon={<ThumbUp />}
                >
                  {this.state.likesNum} Likes
                </Button>
              </Grid>
              <Grid item container justify='center' sm={4}>
                <Button
                  className={classes.btnLink}
                  color='inherit'
                  startIcon={<Chat />}
                  onClick={() =>
                    this.setState({ isExpanded: !this.state.isExpanded })
                  }
                >
                  {this.state.commentsNum} Comments
                </Button>
              </Grid>
              <Grid item container justify='center' sm={4}>
                <Button
                  color='inherit'
                  className={classes.btnLink}
                  startIcon={<Share />}
                >
                  Share
                </Button>
              </Grid>
              <Grid item container justify='flex-end' sm={1}>
                <IconButton
                  color='inherit'
                  className={classes.btnLink}
                  onClick={this.toggleReportPopup}
                >
                  <Tooltip title='Report this post' arrow placement='top'>
                    <Report />
                  </Tooltip>
                </IconButton>
                <ReportPopup
                  isOpen={this.state.isOpenReport}
                  onClose={this.toggleReportPopup}
                  postId={post.id}
                  type='post'
                />
              </Grid>
            </Grid>
          </CardActions>

          {/* COLLAPSE SECTION */}
          <Collapse in={this.state.isExpanded} timeout='auto' unmountOnExit>
            <Divider />

            {/* COMMENT INPUT SECTION */}
            <Box py={1} className={classes.bgPrimary}>
              <CommentInput
                postId={post.id}
                refreshComments={this.handleRefreshComments}
                needUpdateComment={this.state.needUpdateComment}
                cancelUpdateMode={() =>
                  this.setState({ needUpdateComment: null })
                }
              />
            </Box>
            <Divider />

            {/* COMMENT SECTION */}
            {post &&
              post.comments.map(comment => (
                <UserComment
                  key={comment.id}
                  comment={comment}
                  isOwner={post.user_id === comment.user_id}
                  onUpdateComment={this.handleUpdateComment}
                  onDeleteComment={this.handleDeleteComment}
                />
              ))}
            {/* <UserComment isAdmin />
          <UserComment isOwner />
          <UserComment /> */}
          </Collapse>
        </Card>
      </Box>
    );
  }
}

export default withStyles(roomStyles)(UserPost);
