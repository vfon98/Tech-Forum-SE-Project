import React, { Component } from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { Edit, DeleteForever, Lock } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from '../../../../axios/instance';

import { withStyles } from '@material-ui/styles';
import userPanelStyles from 'assets/jss/userPanelStyles';
import ConfirmPopup from '../../../../components/ConfirmPopup';
import { isLogin } from '../../../../utils/session';

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

  handleClickDelte = () => {
    if (isLogin()) {
      this.toggleConfirmPopup();
    }
    else {
      window.handlePopup('login');
    }
  };

  handleBlockPost = () => {
    // this.toggleConfirmPopup();
  };

  // The result of confirm box
  handleConfirmDelete = option => {
    this.toggleConfirmPopup();
    const { postId } = this.props;
    console.log('postId', postId)
    if (option === 'yes') {
      // axios
      //   .delete(`/posts/${postId}`)
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => console.log(err));
    }
  };

  render() {
    const { classes, postId } = this.props;
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
            <ListItem button component={Link} to={`/post/${postId}/update`}>
              <ListItemIcon className={classes.listPostItem}>
                <Edit />
              </ListItemIcon>
              <ListItemText>Update</ListItemText>
            </ListItem>

            <ListItem button onClick={this.handleClickDelte}>
              <ListItemIcon className={classes.listPostItem}>
                <DeleteForever />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </ListItem>

            <Tooltip title="Admin only">
              <ListItem component='span' onClick={this.handleBlockPost} disabled>
                <ListItemIcon className={classes.listPostItem}>
                  <Lock />
                </ListItemIcon>
                <ListItemText>Block comments</ListItemText>
              </ListItem>
            </Tooltip>
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
