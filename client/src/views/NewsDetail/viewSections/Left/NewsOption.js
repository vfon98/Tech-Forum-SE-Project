import React, { Component } from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Edit, DeleteForever, Lock } from '@material-ui/icons';
import { hasModifyPermission, isAdmin } from 'utils/session';
import axios from 'axios/instance';

import { withStyles } from '@material-ui/styles';
import userPanelStyles from 'assets/jss/userPanelStyles';

import ConfirmPopup from 'components/ConfirmPopup';
import history from 'utils/history';

class NewsOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openConfirm: false,
    };
  }

  toggleConfirm = () => {
    this.setState({
      openConfirm: !this.state.openConfirm,
    });
  };

  handleCloseConfirm = option => {
    if (option === 'yes') {
      const { newsId } = this.props;
      axios
        .delete(`/news/${newsId}`)
        .then(res => {
          console.log(res.data)
          history.goBack();
        })
        .catch(err => console.log(err));
    }
  };

  handleBlockNews = () => {}

  render() {
    const { classes, newsId, userId } = this.props;

    return (
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
            to={`/news/update/${newsId}`}
            // disabled={!this.isOwner()}
          >
            <ListItemIcon className={classes.listPostItem}>
              <Edit />
            </ListItemIcon>
            <ListItemText>Update</ListItemText>
          </ListItem>

          <ListItem
            button
            onClick={this.toggleConfirm}
            disabled={!hasModifyPermission(userId)}
          >
            <ListItemIcon className={classes.listPostItem}>
              <DeleteForever />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
            <ConfirmPopup
              isOpen={this.state.openConfirm}
              handleClose={this.handleCloseConfirm}
            />
          </ListItem>

          {/* <Tooltip title='Admin only'>
            <ListItem
              component='span'
              onClick={this.handleBlockNews}
              button
              disabled={!isAdmin()}
            >
              <ListItemIcon className={classes.listPostItem}>
                <Lock />
              </ListItemIcon>
              <ListItemText>Block comments</ListItemText>
            </ListItem>
          </Tooltip> */}
        </List>
      </Popover>
    );
  }
}

export default withStyles(userPanelStyles)(NewsOption);
