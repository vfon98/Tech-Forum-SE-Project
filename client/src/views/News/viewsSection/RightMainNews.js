import React, { Component } from 'react';
import { Paper } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import newsStyles from '../../../assets/jss/newsStyles';

class RightMainNews extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.bannerWrapper}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex aut culpa in
        consequatur, cupiditate sunt corrupti unde natus dolorem deleniti quam
        officia quaerat ullam ab odio. Soluta officiis esse commodi?
      </Paper>
    );
  }
}

export default withStyles(newsStyles)(RightMainNews);
