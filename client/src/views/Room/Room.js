import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import {
  Grid,
  Box,
  Container,
  Paper,
  Card,
  CardContent,
  Divider,
  Typography,
  Button,
  CardHeader,
  List,
  ListSubheader,
  ListItem,
  Fab,
} from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import roomStyles from '../../assets/jss/roomStyles';
import LeftSection from './viewSections/LeftSection';
import MainSection from './viewSections/MainSection';
import RightSection from './viewSections/RightSection'

export class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: null,
    };
  }

  handlePopup = value => {
    this.setState({
      popup: value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <NavBar
          brand='Covid'
          brandHighlight='Forum'
          handlePopup={this.handlePopup}
        />
        <Box borderRadius={1} mt={3}>
          <Container>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <LeftSection classes={classes} />
              </Grid>
              <Grid item sm={6}>
                <MainSection classes={classes} />
                <MainSection classes={classes} />
              </Grid>
              <Grid item sm={3}>
                <RightSection classes={classes} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default withStyles(roomStyles)(Room);
