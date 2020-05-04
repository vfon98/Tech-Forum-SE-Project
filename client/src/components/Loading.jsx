import React, { Component } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { textColor, orangeColor } from '../assets/jss/main';

const loadingStyles = {
  btn: {
    textTransform: 'none',
    color: textColor,
    fontSize: '1.4rem',
  },
  loader: {
    color: orangeColor,
    marginRight: '8px',
  },
};

class Loading extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Button
        className={classes.btn}
        variant='text'
        size='large'
        startIcon={
          <CircularProgress
            className={classes.loader}
            thickness={5}
            size='2rem'
            disableShrink
          />
        }
      >
        Loading...
      </Button>
    );
  }
}

export default withStyles(loadingStyles)(Loading);
