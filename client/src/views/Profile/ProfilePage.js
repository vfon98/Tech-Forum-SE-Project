import React, { Component } from 'react'
import axios from '../../axios/instance'
import NavBar from '../../components/NavBar'
import { Dialog, DialogContent, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import profilePageStyles  from '../../assets/jss/profilePageStyles';
import Login from '../Login/Login';
import Register from '../Register/Register';

import Header from './viewSections/Header'
import VerticalTabs from './viewSections/VerticalTabs';

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
      userInfo: null
    };
  }
  componentDidMount() {
    axios
    .get('/profile')
    .then(res => {
      this.setState({
        userInfo: res.data
      })
    })
    
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
        {this.state.popup !== null ? (
          <Popup handlePopup={this.handlePopup} type={this.state.popup} />
        ) : null}
        <NavBar
          brand='Covid'
          brandHighlight='Forum'
          handlePopup={this.handlePopup}
        />

        <Header
          avatar={userInfo ? userInfo.profile.user_id.avatar: null}
          // status={userInfo.status}
        />
        <Grid container className={classes.container}>
          <VerticalTabs />
        </Grid>

      </div>
    )
  }
}

export default withStyles(profilePageStyles)(ProfilePage)
