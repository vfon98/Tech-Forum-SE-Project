import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Avatar,
  Hidden,
  ClickAwayListener,
} from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import Search from '@material-ui/icons/Search';
import UserPanel from './UserPanel';
import LoginPopup from './LoginPopup';

import navbarStyles from 'assets/jss/navbarStyles.jsx';
import { getUser, logoutUser } from '../utils/session';
import axios from '../axios/instance';
import { setUser, isLogin } from '../utils/session';
import SearchBox from './SearchBox/SearchBox';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverAnchor: null,
      displayName: '',
      avatar: '',
      popup: null,
      showSearchBox: false,
    };
    // Make handlePopup can call global
    window.handlePopup = this.handlePopup.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate() {
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
          setUser({ displayName: display_name, ...res.data.user });
          // Set to state
          this.setState({
            displayName: display_name,
            avatar: avatar,
          });
          this.props.isLogin(true);
        } else {
          // Delete session on browser
          logoutUser();
        }
      })
      .catch(err => console.log(err));
  };

  handleClickUserBtn = e => {
    if (!isLogin()) {
      this.handlePopup('login');
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
      this.props.isLogin(false);
      window.location.reload();
    });
  };

  handlePopup = value => {
    // Only show when user is not login
    this.setState({
      popup: value,
    });
  };

  toggleSearch = () => {
    this.setState({
      showSearchBox: !this.state.showSearchBox,
    });
  };

  render() {
    const { classes } = this.props;
    const { showSearchBox } = this.state;

    return (
      <>
        {this.state.popup !== null ? (
          <LoginPopup handlePopup={this.handlePopup} type={this.state.popup} />
        ) : null}
        <AppBar position='relative'>
          <Toolbar className={classes.appBar}>
            <Grid container justify='space-between'>
              <Grid item sm={2}>
                <Link to='/' className={classes.link}>
                  Covid <span className={classes.brandHighlight}>Forum</span>
                </Link>
              </Grid>
              <Grid container sm={6} justify='center'>
                <Button className={classes.btn}>
                  <NavLink className={classes.link} to='/'>
                    Home
                  </NavLink>
                </Button>
                <Button className={classes.btn}>
                  <NavLink className={classes.link} to='/news'>
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
                <form
                  autoComplete="off"
                >
                  <Hidden smDown>
                    <input
                      type='text'
                      name='searchBox'
                      className={classes.searchBox}
                      placeholder='Search'
                      autoComplete='new-password'
                    />
                  </Hidden>
                </form>
                {/* USER BUTTON */}
                <Button>
                  <ClickAwayListener onClickAway={() => this.setState({showSearchBox: false})}>
                    <SearchBox isOpen={showSearchBox}>
                      <Search
                        className={classes.accountBtn}
                        onClick={this.toggleSearch}
                      />
                    </SearchBox>
                  </ClickAwayListener>
                </Button>
                {/* USER PANEL */}
                <Button onClick={this.handleClickUserBtn}>
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
