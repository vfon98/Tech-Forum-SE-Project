import React, { Component } from 'react'

import NavBar from 'components/NavBar.jsx'
import MainThreads from './viewSections/MainThreads'
import RecentNews from './viewSections/RecentNews'
import HotTopic from './viewSections/HotTopic'
import Footer from '../../components/Footer'
import { makeStyles } from '@material-ui/styles'

import { Dialog, DialogContent } from '@material-ui/core'
import Login from '../Login/Login'
import Register from '../Register/Register'

const popupStyles = makeStyles({
  paper: {
    background: 'transparent !important',
    boxShadow: "none",
    marginTop: '-5%'
  },
});

function Popup(props) {
  const classes = popupStyles();
  return (
    <>
      <Dialog
        open={true}
        onClose={() => props.handlePopup(null)}
        aria-labelledby="simple-dialog-title"
        BackdropProps={{
          classes: {
            root: classes.root
          }
        }
        }
        PaperProps={{
          classes: {
            root: classes.paper
          }
        }}
      >
        <DialogContent
          className={classes.paper}
        >
          {props.type == "login" ? <Login handlePopup={props.handlePopup} /> : <Register />}
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
    this.setState({ popup: value })

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
