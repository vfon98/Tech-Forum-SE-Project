import React, { Component } from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Edit, DeleteForever, Lock } from '@material-ui/icons';

import { withStyles } from '@material-ui/styles';
import userPanelStyles from 'assets/jss/userPanelStyles';

class PostOptions extends Component {
  render() {
    const { classes } = this.props;
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
            <ListItem button>
              <ListItemIcon className={classes.listPostItem}>
                <Edit />
              </ListItemIcon>
              <ListItemText>Update</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.listPostItem}>
                <DeleteForever />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.listPostItem}>
                <Lock />
              </ListItemIcon>
              <ListItemText>Block comments</ListItemText>
            </ListItem>
          </List>
        </Popover>
      </>
    );
  }
}

export default withStyles(userPanelStyles)(PostOptions);
