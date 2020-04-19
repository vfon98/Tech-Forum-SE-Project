import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';

import NavBar from '../../components/NavBar';
import BannerNews from './viewsSection/BannerNews';

import { withStyles } from '@material-ui/styles';
import newsStyles from '../../assets/jss/newsStyles';
import LeftMainNews from './viewsSection/LeftMainNews';
import RightMainNews from './viewsSection/RightMainNews';

class News extends Component {
  handleAuthChanged = state => {
    this.setState({
      isLogin: state,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <NavBar isLogin={this.handleAuthChanged} />
        <Grid className={classes.pageWrapper}>
          <Container>
            <Grid>
              <BannerNews />
            </Grid>
            <Grid container style={{ marginTop: '1.2em' }} spacing={2}>
              <Grid item sm={9}>
                <LeftMainNews />
              </Grid>
              <Grid item sm={3}>
                <RightMainNews />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </>
    );
  }
}

export default withStyles(newsStyles)(News);
