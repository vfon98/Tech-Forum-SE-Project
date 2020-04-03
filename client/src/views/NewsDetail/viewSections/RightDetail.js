import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

import newsDetailStyles from '../../../assets/jss/newsDetailStyles';
import { withStyles } from '@material-ui/styles';

import RoomSidebar from '../../Room/viewSections/RoomSidebar';
import RightSection from '../../Room/viewSections/RightSection';

class RightDetail extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper elevation={3} className={classes.rightWrapper}>
          <Grid container>
            <Grid container item>
              <RoomSidebar />
            </Grid>
          </Grid>
        </Paper>

        <RightSection />
      </>
    );
  }
}

export default withStyles(newsDetailStyles)(RightDetail);
