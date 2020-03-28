import React, { Component } from 'react';
import { CardActions, Grid, Button } from '@material-ui/core';
import {
  ReportRounded,
  ThumbUpRounded,
  Facebook,
} from '@material-ui/icons';

import { withStyles } from '@material-ui/styles';

const newsActionsStyles = {
  wrapper: {
    padding: '0 1em',
  },
  btn: {
    textTransform: 'none',
  },
  btnLike: {
    textTransform: 'none',
  },
  btnShare: {
    textTransform: 'none',
    color: '#A2F6FF',
    border: '1px solid #A2F6FF'
  }
};

class NewsActions extends Component {
  render() {
    const { classes, likesNum } = this.props;

    return (
      <CardActions className={classes.wrapper}>
        <Grid container>
          <Grid container sm justify='flex-start' spacing={1}>
            <Grid item>
              <Button
                className={classes.btnLike}
                color='primary'
                variant='contained'
                startIcon={<ThumbUpRounded />}
              >
                {likesNum} Likes
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.btnShare}
                color='inherit'
                variant='outlined'
                startIcon={<Facebook />}
              >
                Share this post
              </Button>
            </Grid>
          </Grid>
          <Grid container sm justify='flex-end'>
            <Button
              className={classes.btn}
              color='secondary'
              variant='outlined'
              startIcon={<ReportRounded />}
            >
              Report
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    );
  }
}

export default withStyles(newsActionsStyles)(NewsActions);
