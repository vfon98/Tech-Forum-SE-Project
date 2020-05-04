import React, { Component } from 'react';
import {
  Grid,
  Badge,
  Avatar,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Telegram, Close } from '@material-ui/icons';

import { withStyles } from '@material-ui/styles';
import roomStyles from 'assets/jss/roomStyles';

import { getUser, isLogin } from 'utils/session';
import axios from 'axios/instance';

class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentContent: '',
      // Mode of comment input
      isUpdateCommentMode: false,
    };
    this.commentInputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { needUpdateComment } = this.props;
    // Change to update mode when needUpdateComment is existed
    if (prevProps.needUpdateComment !== needUpdateComment) {
      if (needUpdateComment) {
        this.commentInputRef.current.focus();
        this.setState({
          isUpdateCommentMode: true,
          commentContent: needUpdateComment.content,
        });
      }
    }
  }

  cancelUpdateMode = () => {
    this.props.cancelUpdateMode();
    this.setState({
      isUpdateCommentMode: false,
      commentContent: '',
    });
  };

  handleSendComment = e => {
    e.preventDefault();
    if (!isLogin()) {
      return window.handlePopup('login');
    }
    const { isUpdateCommentMode } = this.state;
    if (isUpdateCommentMode) {
      this.updateCommentAPI();
    } else {
      this.addNewCommentAPI();
    }
  };

  addNewCommentAPI = () => {
    const { commentContent } = this.state;
    console.log("New", commentContent, this.props)

    axios
      .post('/comments', {
        postID: this.props.postId,
        content: commentContent,
        type: this.props.type || 'post'
      })
      .then(res => {
        // Refresh comments in parent component
        this.props.refreshComments(res.data.comments);
        this.setState({
          commentContent: '',
        });
      })
      .catch(err => console.log(err));
  };

  updateCommentAPI = () => {
    const { id } = this.props.needUpdateComment;
    axios
      .put(`/comments/${id}`, {
        content: this.state.commentContent,
        type: this.props.type || 'post'
      })
      .then(res => {
        // Refresh comments in parent component
        this.props.refreshComments(res.data.comments);
        this.cancelUpdateMode();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const { commentContent } = this.state;
    const user = getUser();

    return (
      <Grid container className={classes.container} alignItems='center'>
        <Grid item sm={1} container justify='center'>
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
            <Avatar src={user && user.avatar} alt={user && user.display_name} />
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
              required
              onChange={e => this.setState({ commentContent: e.target.value })}
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
              InputLabelProps={{ required: false }}
            />
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(roomStyles)(CommentInput);
