import React, { Component } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  makeStyles,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@material-ui/core';
import { Inbox, Dashboard, People, Report, Airplay } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import sidebarStyles from 'assets/jss/admin/sidebarStyles';
import { getUser } from 'utils/session';

const useStyles = makeStyles(sidebarStyles);

const SidebarLink = props => {
  const classes = useStyles();
  return (
    <ListItem
      component={NavLink}
      to={props.to}
      activeClassName={classes.activeLink}
      exact
      className={classes.sidebarLink}
      button
    >
      <ListItemIcon className={classes.iconLink}>{props.icon}</ListItemIcon>
      <ListItemText>{props.text}</ListItemText>
    </ListItem>
  );
};

class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    const user = getUser();

    return (
      <Box>
        {/* <Typography className={classes.title}>Dashboard</Typography> */}
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={user ? user.avatar : ''} alt='Admin icon' />
            </ListItemAvatar>
            <ListItemText>
              <Typography className={classes.adminDisplayName}>
                {user ? user.display_name : 'Loading'}
              </Typography>
            </ListItemText>
          </ListItem>
          <Divider className={classes.divider} />
          <SidebarLink
            icon={<Dashboard />}
            text='Dashboard'
            to='/admin/dashboard'
          />
          <SidebarLink
            icon={<Airplay />}
            text='Rooms'
            to='/admin/rooms-manager'
          />
          <SidebarLink
            icon={<People />}
            text='Users'
            to='/admin/users-manager'
          />
          <SidebarLink
            icon={<Report />}
            text='Reports'
            to='/admin/reports-manager'
          />
        </List>
      </Box>
    );
  }
}

export default withStyles(sidebarStyles)(Sidebar);
