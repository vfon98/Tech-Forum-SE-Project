import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { Dialog, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Login from '../Login/Login';
import Register from '../Register/Register';

import Header from './viewSections/Header'

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

const data = {
  _id: '5e5e001e50b5c51a38840a21',
  is_banned: false,
  fbID: "2635529400057723",
  email: "vfon98@gmail.com",
  display_name: "Phong Vủ",
  avatar: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2635529400057723&height=50&width=50&ext=1585810717&hash=AeTv691agEZpRcDX",
  gender: "male",
  address: "Cần Thơ",
  status: "Status"
}


export class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: null,
      userInfo: data
    };
  }

  handlePopup = value => {
    this.setState({
      popup: value,
    });
  };

  render() {
    const { userInfo } = this.state;
    return (
      <div>
        {this.state.popup !== null ? (
          <Popup handlePopup={this.handlePopup} type={this.state.popup} />
        ) : null}
        <NavBar
          brand='Covid'
          brandHighlight='Forum'
          handlePopup={this.handlePopup}
        />

        <Header
          id={userInfo.id}
          avatar={userInfo.avatar}
          status={userInfo.status}

        />

      </div>
    )
  }
}

export default ProfilePage
