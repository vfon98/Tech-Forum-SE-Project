import React, { Component } from 'react';
import { Box, Paper, Grid, Container } from '@material-ui/core';

import newsDetailStyles from '../../../assets/jss/newsDetailStyles';
import { withStyles } from '@material-ui/styles';

import Sidebar from '../../Room/viewSections/LeftSidebar';
import RightSection from '../../Room/viewSections/RightSection';

class RightDetail extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Box mb={2}>
          <Paper elevation={3} className={classes.rightWrapper}>
            <Grid container>
              <Grid container item>
                <Sidebar />
              </Grid>
            </Grid>
          </Paper>
        </Box>

        <RightSection />
      </>
    );
  }
}

export default withStyles(newsDetailStyles)(RightDetail);
