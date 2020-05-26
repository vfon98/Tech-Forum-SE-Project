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
  Hidden,
} from '@material-ui/core';
import { Forum, MenuBookTwoTone } from '@material-ui/icons';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios/instance';

import { withStyles } from '@material-ui/styles';
import roomStyles from '../../../assets/jss/roomStyles';

import RoomList from '../../../components/RoomList.js/RoomList';
import UserSidePanel from 'components/UserSidePanel/UserSidePanel';
import { isLogin } from 'utils/session';

const activeLink = {
  background: 'rgb(0,0,0,0.3)',
};

class LeftSection extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.match;
    this.state = {
      roomName: params.name,
      roomInfo: {},
    };
  }

  componentDidMount() {
    this.fetchRoomInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    const { params } = this.props.match;
    if (prevState.roomName !== params.name) {
      this.fetchRoomInfo();
      this.setState({
        roomName: params.name,
      });
    }
  }

  fetchRoomInfo = () => {
    const { params } = this.props.match;
    axios.get(`/rooms/${params.name}`).then(res => {
      this.setState({
        roomInfo: res.data.room,
      });
    });
  };

  render() {
    const { classes } = this.props;
    const { roomName, roomInfo } = this.state;

    return (
      <Box>
        <Hidden smUp>
          {/* Hide user on small screen */}
          {isLogin() && <UserSidePanel />}
        </Hidden>
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
                    +{roomInfo ? roomInfo.total_news : 0} new posts
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
                    +{roomInfo ? roomInfo.total_posts : 0} new posts
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Card>
        {/* SIDEBAR */}
        <Hidden only='xs'>
          <RoomList />
        </Hidden>
      </Box>
    );
  }
}

export default withStyles(roomStyles)(withRouter(LeftSection));
