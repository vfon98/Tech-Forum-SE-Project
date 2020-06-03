import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import footerStyles from '../assets/jss/footerStyles';
import { Grid } from '@material-ui/core'
import { Copyright } from '@material-ui/icons';

class Footer extends Component {
  addMessageButton = () => {
    // document.querySelector('.messenger-popup')[0].classList.add('active')
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background} id='contact'>
        <Grid container
          className={classes.container}
        >
          <Grid
            item
            sm={6}
            className={classes.left}
          >

            <div
              className={classes.brand}
            >
              Covid
              <span
                className={classes.highlight}
              >
                Forum
              </span>
            </div>
            <ul>
              <li><a href='https://www.facebook.com/Covid-Forum-107153144353828/' target="_blank">Fanpage</a></li>
              <li>Email: khoanv.me@gmail.com</li>
              <li>
                <button
                  onClick={this.addMessageButton}
                  className={classes.contactBtn}
                >Chat with admins</button></li>
            </ul>

          </Grid>
          <Grid
            item
            sm={6}
            className={classes.right}
          >
            <p
              className={classes.copyright}
            >
              Site logo / design
              <Copyright 
                className={classes.icon}
              />
              2020
              by PKQ Team
            </p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(footerStyles)(Footer);
