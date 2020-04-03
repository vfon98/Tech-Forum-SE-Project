import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import LeftRoomNews from './viewSections/LeftRoomNews';
import { Box, Container, Grid } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import roomNewsStyles from '../../assets/jss/roomNewsStyles';
import RightRoomNews from './viewSections/RightRoomNews';

class RoomNews extends Component {
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
        <Box className={classes.roomWrapper}>
          <Container>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <LeftRoomNews />
              </Grid>
              <Grid item sm={9}>
                <RightRoomNews />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default withStyles(roomNewsStyles)(RoomNews);
