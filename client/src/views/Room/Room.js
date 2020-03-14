import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import { Grid, Box, Container } from '@material-ui/core';

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
      isLogin: state
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <NavBar
          brand='Covid'
          brandHighlight='Forum'
          isLogin={this.handleAuthChanged}
        />
        <Box className={classes.roomWrapper}>
          <Container>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <LeftSection />
              </Grid>
              <Grid item sm={6}>
                <MainSection />
              </Grid>
              <Grid item sm={3}>
                <RightSection />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default withStyles(roomStyles)(Room);
