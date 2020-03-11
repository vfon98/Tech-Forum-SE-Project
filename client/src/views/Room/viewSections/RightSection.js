import React, { Component } from 'react';
import {
  Button,
  Paper,
  Card,
  CardContent,
  Avatar,
  CardHeader,
  Box,
  Divider,
  List,
  ListItem,
  CardActions,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Edit, BorderBottom, BorderColor } from '@material-ui/icons';

class RightSection extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
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
              <Avatar className={classes.avatarXl}>JM</Avatar>
              <div className={classes.userBox_name}>Display Name</div>
              <div>example@gmail.com</div>
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            <List style={{ padding: 0 }}>
              <ListItem>
                <ListItemText>
                  <Typography className={classes.userBox_text}>
                    Joined date: {new Date().toLocaleDateString()}
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
            <Button fullWidth color='primary' className={classes.userBox_link}>
              My profile
            </Button>
            <Divider orientation='vertical' flexItem />
            <Button fullWidth color='primary' className={classes.userBox_link}>
              My wall
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }
}

export default RightSection;
