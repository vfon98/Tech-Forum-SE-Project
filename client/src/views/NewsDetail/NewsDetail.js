import React, { Component } from 'react';
import { Grid, Box, Container, Hidden } from '@material-ui/core';

import newsDetailStyles from '../../assets/jss/newsDetailStyles';
import { withStyles } from '@material-ui/styles';

import NavBar from '../../components/NavBar';
import LeftDetail from './viewSections/LeftDetail';
import RightDetail from './viewSections/RightDetail';

class NewsDetail extends Component {
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
        <Box className={classes.pageWrapper}>
          <Container className={classes.gridWrapper}>
            <Grid container spacing={4}>
              <Grid item md={9} xs={12}>
                <LeftDetail />
              </Grid>
              <Grid item md={3}>
                <Hidden smDown>
                  <RightDetail />
                </Hidden>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default withStyles(newsDetailStyles)(NewsDetail);
