import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
  Hidden,
} from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Search from '@material-ui/icons/Search';
import UserPanel from './UserPanel';

import navbarStyles from 'assets/jss/navbarStyles.jsx';
import { getUser, logoutUser } from '../utils/session';
import axios from '../axios/instance';
import { setUser, isLogin } from '../utils/session';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverAnchor: null,
      displayName: '',
      avatar: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevState) {
    // Check if displayName has changed
    const user = getUser();
    if (user && user.displayName !== this.state.displayName) {
      this.fetchUser();
    }
  }

  fetchUser = () => {
    axios
      .get('/auth/check')
      .then(res => {
        if (res.data.isAuthenticated) {
          const { display_name, avatar } = res.data.user;
          // Set user info into client storage
          setUser({ displayName: display_name });
          // Set to state
          this.setState({
            displayName: display_name,
            avatar: avatar,
          });
        }
      })
      .catch(err => console.log(err));
  };

  handleClickUserBtn = e => {
    if (!isLogin()) {
      this.props.handlePopup('login');
    } else {
      this.setState({
        popoverAnchor: e.currentTarget,
      });
    }
  };

  handleCloseUserPanel = () => {
    this.setState({ popoverAnchor: null });
  };

  handleLogout = () => {
    axios.post('/users/logout').then(() => {
      // Close popup then remove session
      logoutUser();
      this.setState({
        displayName: '',
        avatar: '',
      });
    });
  };

  render() {
    const { classes } = this.props;
    const user = getUser();
    return (
      <>
        <AppBar position='relative'>
          <Toolbar className={classes.appBar}>
            <Grid container justify='space-between'>
              <Grid item sm={2}>
                <Link to='/' className={classes.link}>
                  {this.props.brand ? this.props.brand : 'BRAND'}
                  <span className={classes.brandHighlight}>
                    {' '}
                    {this.props.brandHighlight ? this.props.brandHighlight : ''}
                  </span>
                </Link>
              </Grid>
              <Grid container sm={6} justify='center'>
                <Button className={classes.btn}>
                  <NavLink className={classes.link} to='/'>
                    Home
                  </NavLink>
                </Button>
                <Button className={classes.btn}>
                  <NavLink className={classes.link} to='/windows'>
                    News
                  </NavLink>
                </Button>
                <Button className={classes.btn}>
                  <NavLink className={classes.link} to='/discussion'>
                    Discussion
                  </NavLink>
                </Button>
                <Button className={classes.btn}>
                  <NavLink className={classes.link} to='/windows'>
                    Contact
                  </NavLink>
                </Button>
              </Grid>
              <Grid container sm={4} justify='flex-end'>
                <Hidden smDown>
                  <input
                    type='text'
                    name='searchBox'
                    className={classes.searchBox}
                    placeholder='Search'
                  />
                </Hidden>
                {/* USER BUTTON */}
                <Button>
                  <Search className={classes.accountBtn} />
                </Button>
                <Button
                  onClick={this.handleClickUserBtn}
                  // startIcon={<AccountCircle className={classes.accountBtn} />}
                >
                  <Avatar className={classes.avatar} src={this.state.avatar} />
                  <span className={classes.displayName}>
                    {this.state.displayName}
                  </span>
                </Button>
                <UserPanel
                  popoverAnchor={this.state.popoverAnchor}
                  onClose={this.handleCloseUserPanel}
                  onLogout={this.handleLogout}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default withStyles(navbarStyles)(NavBar);
