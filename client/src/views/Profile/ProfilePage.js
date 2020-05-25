import React, { Component } from 'react'
import axios from '../../axios/instance'
import NavBar from '../../components/NavBar'
import { Dialog, DialogContent, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import profilePageStyles from '../../assets/jss/profilePageStyles';
import Login from '../Login/Login';
import Register from '../Register/Register';

import Header from './viewSections/Header'
import VerticalTabs from './viewSections/VerticalTabs';
import { getUser } from '../../utils/session'



import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const useStyles = makeStyles({
  root: {
    marginTop: '-5%',
    background: 'rgba(0,0,0,.7)',
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none',
  },
});

const Popup = props => {
  const { type } = props;
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={true}
        onClose={() => props.handlePopup(null)}
        className={classes.root}
        scroll='body'
        BackdropProps={{
          classes: {
            root: classes.root,
          },
        }}
        PaperProps={{
          classes: {
            root: classes.paper,
          },
        }}
      >
        <DialogContent>
          {type == 'login' ? (
            <Login handlePopup={props.handlePopup} />
          ) : type == 'register' ? (
            <Register handlePopup={props.handlePopup} />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};
export class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: null,
      avatar: '',
      status: null,
      displayName : null,
      isLogin: sessionStorage.user ? true : false
    };
  }
  componentDidMount() {
    if (this.state.isLogin) {
      axios
        .get(`/profile/${getUser()._id}`)
        .then(res => {
          this.setState({
            avatar: res.data.user.avatar,
            status: res.data.user.status,
            displayName: res.data.user.display_name
          })
        })
    } else {
      window.location.href = '/'
    }
  }


  handlePopup = value => {
    this.setState({
      popup: value,
    });
  };

  render() {
    const { userInfo } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <ReactNotification />
        {this.state.popup !== null ? (
          <Popup handlePopup={this.handlePopup} type={this.state.popup} />
        ) : null}
        <NavBar
          brand='Covid'
          brandHighlight='Forum'
          handlePopup={this.handlePopup}
          isLogin={state => this.setState({ isLogin: state })}
        />

        <Header
          avatar={this.state.avatar ? this.state.avatar : null}
          status={this.state.status ? this.state.status : null}
          displayName={this.state.displayName ? this.state.displayName : null}
        />
        <Grid container className={classes.container}>
          <VerticalTabs />
        </Grid>

      </div>
    )
  }
}

export default withStyles(profilePageStyles)(ProfilePage)
