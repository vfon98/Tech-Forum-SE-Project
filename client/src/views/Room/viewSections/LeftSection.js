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
  Icon,
  ListItemIcon,
} from '@material-ui/core';
import {
  Forum,
  ForumTwoTone,
  FiberNewTwoTone,
  MenuBookTwoTone,
  ForumRounded,
} from '@material-ui/icons';

import HotTopic from '../../Homepage/viewSections/HotTopic';
class LeftSection extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Card variant='outlined' className={classes.bgPrimary}>
          <List>
            <ListSubheader className={classes.text}>MacOs Forum</ListSubheader>
            <Divider />
            <ListItem
              button
              classes={{ selected: classes.active }}
            >
              <ListItemAvatar>
                <Avatar className={classes.listIcon}>
                  <MenuBookTwoTone color='action' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='News' secondary='+2 new posts' />
            </ListItem>
            <ListItem
              button
              classes={{ selected: classes.active }}
              selected
            >
              <ListItemAvatar>
                <Avatar className={classes.listIcon}>
                  <Forum color='action' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Forum' secondary='+10 new posts' />
            </ListItem>
          </List>
        </Card>
      </>
    );
  }
}

export default LeftSection;
