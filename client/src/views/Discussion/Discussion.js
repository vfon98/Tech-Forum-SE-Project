import React from 'react'

import { Grid, Dialog, DialogContent } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/styles'

import Card from './view components/CustomCard'
import NavBar from '../../components/NavBar'

import discussionViewStyles from '../../assets/jss/discussionViewStyles'

import windows from '../../assets/img/title/windows.jpg'
import macos from '../../assets/img/title/macos.jpg'
import ios from '../../assets/img/title/ios.jpg'
import android from '../../assets/img/title/android.jpg'
import linux from '../../assets/img/title/linux.jpg'
import smartphone from '../../assets/img/title/smartphone.jpg'
import laptop_desktop from '../../assets/img/title/laptop_desktop.jpg'
import programing from '../../assets/img/title/programing.jpg'


import Login from '../Login/Login';
import Register from '../Register/Register'


const rooms = [
  {
    id: '5e5e76ff0df4c97fa160c193',
    title: 'Windows',
    img: windows,
    newPost: 1
  },
  {
    id: '5e5e770c0df4c97fa160c194',
    title: 'macOS',
    img: macos,
    newPost: 3
  },
  {
    id: '5e5e77110df4c97fa160c195',
    title: 'Linux',
    img: linux,
    newPost: 5
  },
  {
    id: '5e5e77170df4c97fa160c196',
    title: 'iOS',
    img: ios,
    newPost: 2
  },
  {
    id: '5e5e771c0df4c97fa160c197',
    title: 'Android',
    img: android,
    newPost: 1
  },
  {
    id: '5e5e77250df4c97fa160c198',
    title: 'Smartphone',
    img: smartphone,
    newPost: 1
  },
  {
    id: '5e5e772d0df4c97fa160c199',
    title: 'Laptop - Desktop',
    img: laptop_desktop,
    newPost: 8
  },
  {
    id: '5e5e77340df4c97fa160c19a',
    title: 'Programing',
    img: programing,
    newPost: 1
  },
]

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

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      popup: null
    }
  }
  handleClick = value => {
    window.location = `/${value.toLowerCase()}`
  }

  handlePopup = (value) => {
    this.setState({
      popup: value
    })
  }
  render() {
    const { classes } = this.props
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
        <div
          className={classes.background}
        >
          <Grid container className={classes.container} spacing={2}>
            {
              rooms.map(room => (
                <Grid sm={4} item>
                  <Card
                    image={room.img}
                    handleClick={this.handleClick}
                    id={room.id}
                    title={room.title}
                    newPost={room.newPost}
                  />
                </Grid>
              ))
            }
          </Grid>
        </div>
      </>
    )
  }
}


export default withStyles(discussionViewStyles)(Discussion)
