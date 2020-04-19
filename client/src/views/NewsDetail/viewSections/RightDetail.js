import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

import newsDetailStyles from '../../../assets/jss/newsDetailStyles';
import { withStyles } from '@material-ui/styles';

import RoomList from '../../../components/RoomList.js/RoomList';
import UserPanel from 'components/UserPanel/UserPanel';

class RightDetail extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper elevation={3} className={classes.rightWrapper}>
          <Grid container>
            <Grid container item>
              <RoomList />
            </Grid>
          </Grid>
        </Paper>

        <UserPanel />
      </>
    );
  }
}

export default withStyles(newsDetailStyles)(RightDetail);
