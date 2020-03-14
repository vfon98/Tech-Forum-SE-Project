import React, { Component } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  Typography,
  CardActions,
  Grid,
  CardMedia,
  Button,
  FormControl,
  TextField,
  InputAdornment,
  Box,
  Collapse,
  Tooltip,
  Badge,
} from '@material-ui/core';
import {
  ThumbUp,
  Share,
  Chat,
  Telegram,
  Report,
  Close,
} from '@material-ui/icons';

import { getUser } from '../../../../utils/session';
import axios from '../../../../axios/instance';

import { withStyles } from '@material-ui/styles';
import roomStyles from 'assets/jss/roomStyles';

import UserComment from './UserComment';
import PostHeader from './PostHeader';

class UserPost extends Component {
  constructor(props) {
    super(props);
    const { post } = this.props;
    this.state = {
      // Default comments expansion state
      isExpanded: true,
      // Does user like this post
      liked: false,
      // Mode of comment input
      isUpdateCommentMode: false,
      // Comment in updating
      selectedCommentId: null,
      likesNum: post.likes.length,
      commentsNum: post.comments.length,
      commnetContent: '',
      post: post,
    };
    this.commentInputRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      liked: this.checkLiked(this.state.post),
    });
  }

  checkLiked = post => {
    if (!post) return false;
    return post.likes.some(like => like.user_id === post.user_id);
  };

  toggleLike = () => {
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

  handleSendComment = e => {
    e.preventDefault();
    const { isUpdateCommentMode } = this.state;
    if (isUpdateCommentMode) {
      this.updateCommentAPI();
    } else {
      this.addNewCommentAPI();
    }
  };

  addNewCommentAPI = () => {
    const { commentContent, post } = this.state;
    axios
      .post('/comments', {
        postID: post.id,
        content: commentContent,
      })
      .then(res => {
        this.setState({
          commentContent: '',
          post: { ...post, comments: res.data.comments },
        });
      })
      .catch(err => console.log(err));
  };

  updateCommentAPI = () => {
    const { commentContent, post, selectedCommentId } = this.state;
    axios
      .put(`/comments/${selectedCommentId}`, {
        content: commentContent,
      })
      .then(res => {
        this.cancelUpdateMode();
        this.setState({
          post: { ...post, comments: res.data.comments },
        });
      })
      .catch(err => console.log(err));
  };

  handleUpdateComment = comment => {
    this.commentInputRef.current.focus();
    this.setState({
      isUpdateCommentMode: true,
      commentContent: comment.content,
      selectedCommentId: comment.id,
    });
  };

  cancelUpdateMode = () => {
    this.setState({
      isUpdateCommentMode: false,
      commentContent: '',
      selectedCommentId: null,
    });
  };

  handleDeleteComment = id => {
    const { post } = this.state;
    axios
      .delete(`/comments/${id}`)
      .then(res => {
        this.setState({
          post: { ...post, comments: res.data.comments },
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const { post, liked, commentContent } = this.state;
    const user = getUser();

    return (
      <Box className={classes.postWrapper}>
        <Card className={classes.bgPrimary}>
          <PostHeader post={post} />
          <Divider />
          {/* CONTENT SECTION */}
          <CardContent>
            <CardMedia component='img' image='https://placehold.it/400x200' />
            <Typography className={classes.postContent}>
              {post
                ? post.content
                : `Lorem iipsum dolor sit amet consectetur adipisicing elit. Error
              consequuntur dicta non cum voluptate rerum, sed dolor aut debitis
              dolore ut incidunt dolorum? aliquid aliquam nesciunt quisquam
              aspernatur ipsam doloribus`}
            </Typography>
          </CardContent>
          <Divider />
          {/* REACT SECTION */}
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
                <IconButton color='inherit' className={classes.btnLink}>
                  <Tooltip title='Report this post' arrow placement='top'>
                    <Report />
                  </Tooltip>
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
        {/* COLLAPSE SECTION */}
        <Collapse in={this.state.isExpanded} timeout='auto' unmountOnExit>
          <Divider />
          {/* COMMENT INPUT SECTION */}
          <Box py={1} className={classes.bgPrimary}>
            <Grid container className={classes.container} alignItems='center'>
              <Grid item sm={1}>
                <Badge
                  overlap='circle'
                  variant='dot'
                  color='primary'
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  classes={{
                    badge: classes.avatarDot,
                  }}
                >
                  <Avatar
                    src={user && user.avatar}
                    alt={user && user.display_name}
                  />
                </Badge>
              </Grid>
              <Grid item sm={11} container alignItems='center'>
                <FormControl
                  component='form'
                  fullWidth
                  onSubmit={this.handleSendComment}
                >
                  <TextField
                    className={classes.commentInput}
                    inputRef={this.commentInputRef}
                    variant='outlined'
                    label='Enter your comment...'
                    size='small'
                    // multiline={true}
                    value={commentContent}
                    onChange={e =>
                      this.setState({ commentContent: e.target.value })
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            type='submit'
                            color='primary'
                            className={classes.commentInputIcon}
                          >
                            <Telegram />
                          </IconButton>
                          {this.state.isUpdateCommentMode && (
                            <IconButton
                              color='secondary'
                              className={classes.commentInputIcon}
                              onClick={this.cancelUpdateMode}
                            >
                              <Close />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                      className: classes.commentInputText,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
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
      </Box>
    );
  }
}

export default withStyles(roomStyles)(UserPost);
