import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import { Grid, Box, Container, Hidden } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import roomStyles from '../../assets/jss/roomStyles';
import LeftSection from './viewSections/LeftSection';
import MainSection from './viewSections/MainSection';
import RightSection from './viewSections/RightSection';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
    };
  }

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
        <Box className={classes.roomWrapper}>
          <Container>
            <Grid container spacing={2}>
              <Grid item sm={4} md={3} xs={12}>
                <LeftSection />
              </Grid>
              <Grid item sm={8} md={6} xs={12}>
                <MainSection />
              </Grid>
              <Grid item md={3}>
                <Hidden smDown>
                  <RightSection />
                </Hidden>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default withStyles(roomStyles)(Room);
