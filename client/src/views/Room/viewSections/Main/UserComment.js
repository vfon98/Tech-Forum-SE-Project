import React, { Component } from 'react';
import {
  Grid,
  Avatar,
  Paper,
  Typography,
  Box,
  Divider,
} from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import roomStyles from 'assets/jss/roomStyles';

class UserComment extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.commentContainer}>
        <Grid item sm={1}>
          <Avatar>Bp</Avatar>
        </Grid>
        <Grid item sm={11}>
          <Box className={classes.comment}>
            <Typography>
              <strong className={classes.userName}>Display name</strong>
              <small className={classes.secondaryText}>@example25</small>
              <div className={classes.timeText}>5 minutes ago</div>
              <p className={classes.commentContent}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                sit quis, impedit magni deserunt debitis minus quos eum sapiente
                odit possimus quam perspiciatis, laudantium, et corporis
                assumenda suscipit nostrum incidunt.
              </p>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(roomStyles)(UserComment);
