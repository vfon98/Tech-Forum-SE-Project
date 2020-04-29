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
import { Inbox, Dashboard, People, Report } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import sidebarStyles from 'assets/jss/admin/sidebarStyles';

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
    return (
      <Box>
        {/* <Typography className={classes.title}>Dashboard</Typography> */}
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText>
              <Typography className={classes.adminDisplayName}>
                Admin
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
            icon={<People />}
            text='Users'
            to='/admin/users-manager'
          />
          <SidebarLink icon={<Report />} text='Reports' to='/' />
          <SidebarLink icon={<Inbox />} text='Others' to='/' />
        </List>
      </Box>
    );
  }
}

export default withStyles(sidebarStyles)(Sidebar);
