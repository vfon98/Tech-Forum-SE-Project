import React, { Component } from 'react'

import { Dialog, DialogContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import NavBar from 'components/NavBar.jsx'
import MainThreads from './viewSections/MainThreads'
import RecentNews from './viewSections/RecentNews'
import HotTopic from './viewSections/HotTopic'
import Footer from '../../components/Footer'

import Login from '../Login/Login';
import Register from '../Register/Register'

const useStyles = makeStyles({
  root: {
    marginTop: '-5%',
    background: 'rgba(0,0,0,.7)'
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
})

const Popup = (props) => {
  const { type } = props;
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={true}
        onClose={() => props.handlePopup(null)}
        className={classes.root}
        BackdropProps={{
          classes: {
            root: classes.root
          }
        }}
        PaperProps={{
          classes: {
            root: classes.paper
          }
        }}
      >
        <DialogContent>
          {
            type == 'login' ? <Login handlePopup={props.handlePopup} /> : type == "register" ? <Register handlePopup={props.handlePopup} /> : null
          }
        </DialogContent>
      </Dialog>
    </>
  )
}

export class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: null
    }
  }

  handlePopup = (value) => {
    this.setState({
      popup: value
    })
  }
  render() {
    return (
      <>
        {
          this.state.popup !== null ? <Popup handlePopup={this.handlePopup} type={this.state.popup} /> : null
        }
        <NavBar
          brand="Covid"
          brandHighlight="Forum"
          handlePopup={this.handlePopup}
        />
        <MainThreads />
        <RecentNews />
        <HotTopic />
        <Footer />
      </>
    )
  }
}

export default Homepage
