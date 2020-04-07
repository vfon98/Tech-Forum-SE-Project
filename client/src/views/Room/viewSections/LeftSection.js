import React, { Component } from 'react';
import {
  Card,
  List,
  ListSubheader,
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Typography,
} from '@material-ui/core';
import { Forum, MenuBookTwoTone } from '@material-ui/icons';
import { NavLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import roomStyles from '../../../assets/jss/roomStyles';

import RoomSidebar from './RoomSidebar';

const activeLink = {
  background: 'rgb(0,0,0,0.3)',
};

class LeftSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.setState({
      roomName: params.name,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { params } = this.props.match;
    if (prevState.roomName !== params.name) {
      this.setState({
        roomName: params.name,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { roomName } = this.state;

    return (
      <Box className={classes.leftSliderWrapper}>
        <Card variant='outlined' className={classes.bgPrimary}>
          <List style={{ padding: 0 }}>
            <ListSubheader className={classes.leftHeader}>
              {roomName} Community
            </ListSubheader>
            <Divider />
            <ListItem
              button
              component={NavLink}
              activeStyle={activeLink}
              to={`/room/${roomName}/news`}
              exact
            >
              <ListItemAvatar>
                <Avatar className={classes.listIcon}>
                  <MenuBookTwoTone color='action' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='News'
                secondary={
                  <Typography className={classes.leftSecondary}>
                    +2 new posts
                  </Typography>
                }
              />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              activeStyle={activeLink}
              to={`/room/${roomName}`}
              exact
            >
              <ListItemAvatar>
                <Avatar className={classes.listIcon}>
                  <Forum color='action' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Discussion'
                secondary={
                  <Typography className={classes.leftSecondary}>
                    +10 new posts
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Card>
        {/* SIDEBAR */}
        <RoomSidebar />
      </Box>
    );
  }
}

export default withStyles(roomStyles)(withRouter(LeftSection));
