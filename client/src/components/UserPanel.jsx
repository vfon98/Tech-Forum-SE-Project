import React from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from '@material-ui/core';
import { PowerSettingsNew, Person, Assignment } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { isLogin } from '../utils/session';

import { withStyles } from '@material-ui/styles';
import userPanelStyles from '../assets/jss/userPanelStyles';

const UserPanel = props => {
  const ListItemLink = props => (
    <ListItem className={classes.listItem} button component='a' {...props} />
  );

  const { classes } = props;
  const isOpen = () => !!props.popoverAnchor;

  return (
    isLogin() && (
      <Popover
        id={isOpen() ? 'simple-popover' : undefined}
        open={isOpen()}
        anchorEl={props.popoverAnchor}
        onClose={props.onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List component='nav' className={classes.list}>
          <ListItemLink component={Link} to='/profile'>
            <ListItemIcon className={classes.listItem}>
              <Person />
            </ListItemIcon>
            <ListItemText primary='My profile' />
          </ListItemLink>
          <ListItemLink component={Link} to='/wall'>
            <ListItemIcon className={classes.listItem}>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary='My wall' />
          </ListItemLink>
          <Divider />
          <ListItemLink onClick={props.onLogout}>
            <ListItemIcon className={classes.listItem}>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemLink>
        </List>
      </Popover>
    )
  );
};

export default withStyles(userPanelStyles)(UserPanel);
