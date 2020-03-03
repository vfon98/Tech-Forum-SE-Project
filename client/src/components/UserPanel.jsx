import React from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from '@material-ui/core';
import { isLogin } from '../utils/session';
import { withStyles } from '@material-ui/styles';
import { PowerSettingsNew, Person, Assignment } from '@material-ui/icons';
import userPanelStyles from '../assets/jss/userPanelStyles';


const UserPanel = props => {
  const ListItemLink = props => (
    <ListItem className={classes.listItem} button component='a' {...props} />
  );

  const { classes } = props;
  const isOpen = () => Boolean(props.popoverAnchor);

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
          <ListItemLink>
            <ListItemIcon className={classes.listItem}>
              <Person />
            </ListItemIcon>
            <ListItemText primary='My profile' />
          </ListItemLink>
          <ListItemLink>
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
