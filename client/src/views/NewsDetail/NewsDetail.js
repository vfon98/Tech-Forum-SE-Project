import React, { Component } from 'react';
import { Grid, Box, Container } from '@material-ui/core';

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
        <NavBar
          brand='Covid'
          brandHighlight='Forum'
          isLogin={this.handleAuthChanged}
        />
        <Box className={classes.pageWrapper}>
          <Container>
            <Grid container spacing={4}>
              <Grid item sm={9}>
                <LeftDetail />
              </Grid>
              <Grid item sm={3}>
                <RightDetail />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default withStyles(newsDetailStyles)(NewsDetail);
