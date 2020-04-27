import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import NavBar from 'components/NavBar';
import Sidebar from './Sidebar';
import { secondaryColor } from 'assets/jss/main';
import { primaryColor } from 'assets/jss/main';

const layoutStyles = {
  container: {
    display: 'flex',
  },
  sidebar: {
    flexBasis: '260px',
    height: '100vh',
    background: `linear-gradient(${primaryColor}, #000 85%)`,
    position: 'sticky',
    top: 0
  },
  main: {
    backgroundColor: secondaryColor,
    flexGrow: '1',
  },
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <NavBar isLogin={(isLogin) => this.setState({ isLogin })} />
        <Grid container className={classes.container}>
          <Grid className={classes.sidebar} item sm={3} md={2}>
            <Sidebar />
          </Grid>
          <Grid className={classes.main} item sm={9} md={10}>{this.props.children}</Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(layoutStyles)(Layout);
