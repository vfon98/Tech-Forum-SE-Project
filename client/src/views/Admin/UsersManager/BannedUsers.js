import React, { Component, useState } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListSubheader,
  Box,
  Tooltip,
  Typography,
} from '@material-ui/core';
import axios from 'axios/instance';

import { LockOpenTwoTone } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import {
  textColor,
  textSecondaryColor,
  darkGreen,
  orangeColor,
} from 'assets/jss/main';
import ConfirmPopup from 'components/ConfirmPopup';

const listStyles = {
  wrapper: {
    margin: '0 16px',
    position: 'sticky',
    top: '1em',
  },
  darkBg: {
    background: '#27293D',
    color: textColor,
  },
  title: {
    color: textSecondaryColor,
  },
  unlockIcon: {
    color: darkGreen,
  },
  avatar: {
    // background: red[400],
  },
  empty: {
    color: orangeColor,
    fontSize: '1rem',
    fontWeight: 700,
    // textAlign: 'center',
    marginLeft: '16px',
    fontStyle: 'italic',
  },
};

const BannedUser = props => {
  const { classes, user } = props;
  const [openPopup, setOpenPopup] = useState(false);

  const togglePopup = () => setOpenPopup(!openPopup);

  const handleClose = option => {
    togglePopup();
    if (option === 'yes') {
      unbanUser();
    }
  };

  const unbanUser = () => {
    axios
      .post('/admin/unban/user', { userId: user._id })
      .then(() => {
        window.fetchUsers();
        window.fetchBanned();
      })
      .catch(err => console.log(err));
  };

  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar src={user ? user.avatar : ''} className={classes.avatar} />
      </ListItemAvatar>
      <ListItemText>{user ? user.display_name : 'Display name'}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge='end' onClick={togglePopup}>
          <Tooltip title='Unlock this account' placement='top' arrow>
            <LockOpenTwoTone className={classes.unlockIcon} />
          </Tooltip>
        </IconButton>
      </ListItemSecondaryAction>
      <ConfirmPopup isOpen={openPopup} handleClose={handleClose} />
    </ListItem>
  );
};

class BannedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannedUser: [],
    };
    window.fetchBanned = this.fetchBanned.bind(this);
  }

  componentDidMount() {
    this.fetchBanned();
  }

  fetchBanned = () => {
    axios
      .get('/admin/users/banned')
      .then(res => {
        this.setState({
          bannedUser: res.data.users,
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const { bannedUser } = this.state;

    return (
      <Box className={classes.wrapper}>
        <Paper className={classes.darkBg}>
          <List
            dense
            subheader={
              <ListSubheader className={classes.title} disableSticky>
                Banned Users
              </ListSubheader>
            }
          >
            {bannedUser.length ? (
              bannedUser.map(user => (
                <BannedUser classes={classes} key={user._id} user={user} />
              ))
            ) : (
              <Typography className={classes.empty}>Empty list</Typography>
            )}
          </List>
        </Paper>
      </Box>
    );
  }
}

export default withStyles(listStyles)(BannedUsers);
