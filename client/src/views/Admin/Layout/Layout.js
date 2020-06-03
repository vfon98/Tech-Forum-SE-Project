import React, { Component } from 'react';
import {
  Grid,
  Hidden,
  Drawer,
  ClickAwayListener,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import NavBar from 'components/NavBar';
import Sidebar from './Sidebar';
import { secondaryColor } from 'assets/jss/main';
import { primaryColor } from 'assets/jss/main';
import Statistic from './Statistic';
import { DoubleArrow } from '@material-ui/icons';

const layoutStyles = {
  container: {
    display: 'flex',
  },
  sidebar: {
    flexBasis: '260px',
    // width: '260px',
    flexGrow: 1,
    height: '100vh',
    background: `linear-gradient(${primaryColor}, #000 85%)`,
    position: 'sticky',
    top: 0,
    '@media (max-width: 600px)': {
      width: '180px',
    },
  },
  main: {
    backgroundColor: secondaryColor,
    flexGrow: '1',
  },
  expandButton: {
    background: 'lightgrey',
    position: 'fixed',
    top: '20%',
    left: 0,
    borderRadius: '0 2px 2px 0',
  },
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
      openSidebar: false,
    };
  }

  toggleSidebar = () => {
    this.setState({
      openSidebar: !this.state.openSidebar,
    });
  };

  closeSidebar = () => {
    this.setState({
      openSidebar: false
    })
  }

  render() {
    const { classes } = this.props;
    const { openSidebar } = this.state;

    return (
      <>
        <NavBar isLogin={isLogin => this.setState({ isLogin })} />
        <Grid container className={classes.container}>
          <Hidden smUp>
            <DoubleArrow
              className={classes.expandButton}
              onClick={this.toggleSidebar}
            />
            <Drawer open={openSidebar} anchor='left' variant='temporary'>
              <Grid className={classes.sidebar} item xs>
                <ClickAwayListener
                  onClickAway={this.closeSidebar}
                >
                  <Sidebar />
                </ClickAwayListener>
              </Grid>
            </Drawer>
          </Hidden>

          <Hidden only='xs'>
            <Grid className={classes.sidebar} item sm={3} md={2}>
              <Sidebar />
            </Grid>
          </Hidden>
          <Grid className={classes.main} item xs={12} sm={9} md={10}>
            <Statistic />
            {this.props.children}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(layoutStyles)(Layout);
