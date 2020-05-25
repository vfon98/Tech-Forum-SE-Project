import React, { Component } from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { Edit, DeleteForever, Lock, LockOpen } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios/instance';

import { withStyles } from '@material-ui/styles';
import userPanelStyles from 'assets/jss/userPanelStyles';
import ConfirmPopup from 'components/ConfirmPopup';
import {
  isLogin,
  isAdmin,
  getUser,
  hasModifyPermission,
} from 'utils/session';

const BlockComments = props => {
  const handleBlockPost = () => {
    // this.toggleConfirmPopup();
    axios
      .post('/posts/block', {
        postId: props.postId,
      })
      .then(res => {
        props.handleClosePopover();
        window.fetchPosts();
      })
      .catch(err => console.log(err));
  };

  return (
    <Tooltip title='Admin only'>
      <ListItem
        component='span'
        onClick={handleBlockPost}
        button
        disabled={!isAdmin()}
      >
        <ListItemIcon className={props.classes.listPostItem}>
          <Lock />
        </ListItemIcon>
        <ListItemText>Block comments</ListItemText>
      </ListItem>
    </Tooltip>
  );
};

const UnblockComments = props => {
  const handleUnblockPost = () => {
    // this.toggleConfirmPopup();
    axios
      .post('/posts/unblock', {
        postId: props.postId,
      })
      .then(res => {
        console.log(res.data);
        props.handleClosePopover();
        window.fetchPosts();
      })
      .catch(err => console.log(err));
  };
  return (
    <Tooltip title='Admin only'>
      <ListItem
        component='span'
        onClick={handleUnblockPost}
        button
        disabled={!isAdmin()}
      >
        <ListItemIcon className={props.classes.listPostItem}>
          <LockOpen />
        </ListItemIcon>
        <ListItemText>Unblock comments</ListItemText>
      </ListItem>
    </Tooltip>
  );
};

class PostOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenConfirm: false,
    };
  }

  toggleConfirmPopup = () => {
    this.setState({
      isOpenConfirm: !this.state.isOpenConfirm,
    });
  };

  handleClickDelete = () => {
    if (isLogin()) {
      this.toggleConfirmPopup();
    } else {
      window.handlePopup('login');
    }
  };

  // The result of confirm box
  handleConfirmDelete = option => {
    this.toggleConfirmPopup();
    const { postId } = this.props;
    console.log('postId', postId);
    if (option === 'yes') {
      axios
        .delete(`/posts/${postId}`)
        .then(res => {
          console.log(res);
          window.fetchPosts();
        })
        .catch(err => console.log(err));
    }
  };

  isOwner = () => {
    const { userId } = this.props;
    return getUser() && getUser()._id === userId;
  };

  render() {
    const { classes, postId, userId, isBlocked } = this.props;
    return (
      <>
        <Popover
          open={!!this.props.popoverAnchor}
          anchorEl={this.props.popoverAnchor}
          onClose={this.props.handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <List className={classes.list}>
            {/* Link to update post page */}
            <ListItem
              button
              component={Link}
              to={`/posts/update/${postId}`}
              // disabled={!this.isOwner()}
            >
              <ListItemIcon className={classes.listPostItem}>
                <Edit />
              </ListItemIcon>
              <ListItemText>Update</ListItemText>
            </ListItem>

            <ListItem
              button
              onClick={this.handleClickDelete}
              disabled={!hasModifyPermission(userId)}
            >
              <ListItemIcon className={classes.listPostItem}>
                <DeleteForever />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </ListItem>

            {isBlocked ? (
              <UnblockComments
                classes={classes}
                postId={postId}
                handleClosePopover={this.props.handleClosePopover}
              />
            ) : (
              <BlockComments
                classes={classes}
                postId={postId}
                handleClosePopover={this.props.handleClosePopover}
              />
            )}
          </List>
        </Popover>
        {/* Confirm Popup */}
        <ConfirmPopup
          isOpen={this.state.isOpenConfirm}
          handleClose={this.handleConfirmDelete}
        />
      </>
    );
  }
}

export default withStyles(userPanelStyles)(PostOptions);
