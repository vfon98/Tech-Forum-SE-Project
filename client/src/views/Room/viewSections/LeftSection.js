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
  Typography,
} from '@material-ui/core';
import { Forum, MenuBookTwoTone } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import roomStyles from '../../../assets/jss/roomStyles';

import LeftSidebar from './LeftSidebar';

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
        roomName: params.name
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Card variant='outlined' className={classes.bgPrimary}>
          <List style={{ padding: 0 }}>
            <ListSubheader className={classes.leftHeader}>
              {this.state.roomName} Community
            </ListSubheader>
            <Divider />
            <ListItem button classes={{ selected: classes.active }}>
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
            <ListItem button classes={{ selected: classes.active }} selected>
              <ListItemAvatar>
                <Avatar className={classes.listIcon}>
                  <Forum color='action' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Forum'
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
        <LeftSidebar />
      </>
    );
  }
}

export default withStyles(roomStyles)(withRouter(LeftSection));
