import React, { Component } from 'react';
import {
  Button,
  Card,
  CardContent,
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  CardActions,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { BorderColor } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { getUser } from '../../../utils/session';

import { withStyles } from '@material-ui/styles';
import roomStyles from '../../../assets/jss/roomStyles';

class RightSection extends Component {
  convertDate = date => {
    return new Date(date).toLocaleDateString();
  }

  render() {
    const { classes } = this.props;
    const user = getUser();
    return (
      <Box className={classes.rightWrapper}>
        <Button
          variant='outlined'
          className={classes.btnNewPost}
          startIcon={<BorderColor />}
        >
          Create a new post
        </Button>

        <Card className={classes.bgPrimary}>
          <CardContent className={classes.thumbnailBg}></CardContent>
          <Divider />
          <CardContent className={classes.boxWrapper}>
            <Box className={classes.userBox}>
              <Avatar src={user && user.avatar} className={classes.avatarXl} />
              <div className={classes.userBox_name}>
                {user ? user.displayName : 'Display Name'}
              </div>
              <div>{user ? user.email : 'example@gmail.com'}</div>
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            <List style={{ padding: 0 }}>
              <ListItem>
                <ListItemText>
                  <Typography className={classes.userBox_text}>
                    Joined date: {user ? this.convertDate(user.created_at) : this.convertDate(new Date())}
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography className={classes.userBox_text}>
                    Total posts: 10
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </CardContent>
          <Divider />
          <CardActions style={{ padding: '0' }}>
            <Button
              component={Link}
              to='/profile'
              fullWidth
              color='primary'
              className={classes.userBox_link}
            >
              My profile
            </Button>
            <Divider orientation='vertical' flexItem />
            <Button
              Component={Link}
              to='/wall'
              fullWidth
              color='primary'
              className={classes.userBox_link}
            >
              My wall
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }
}

export default withStyles(roomStyles)(RightSection);
