import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import mainThreadsStyles from 'assets/jss/mainThreadsStyles.jsx';
import Carousel from './Carousel';
import VerticalCarousel from 'views/Homepage/viewSections/VerticalCarousel';

class MainThreads extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid container className={classes.container} justify='space-between'>
          <Grid item sm={6} xs={12}>
            <h3 className={classes.title}>News</h3>
            <Carousel />
          </Grid>
          <Grid item sm={5} xs={12}>
            <h3 className={classes.title}>Trending</h3>
            <VerticalCarousel />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(mainThreadsStyles)(MainThreads);
