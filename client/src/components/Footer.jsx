import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import footerStyles from '../assets/jss/footerStyles';

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background} id='contact'>
        <p>{'From P-Q-K With Love <3'}</p>
      </div>
    );
  }
}

export default withStyles(footerStyles)(Footer);
