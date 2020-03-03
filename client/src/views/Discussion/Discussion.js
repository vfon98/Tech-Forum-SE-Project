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
    id: '1',
    title: 'Windows',
    img: windows,
    newPost: 1
  },
  {
    id: '2',
    title: 'macOS',
    img: macos,
    newPost: 3
  },
  {
    id: '3',
    title: 'Linux',
    img: linux,
    newPost: 5
  },
  {
    id: '4',
    title: 'iOS',
    img: ios,
    newPost: 2
  },
  {
    id: '5',
    title: 'Android',
    img: android,
    newPost: 1
  },
  {
    id: '6',
    title: 'Smartphone',
    img: smartphone,
    newPost: 1
  },
  {
    id: '7',
    title: 'Laptop - Desktop',
    img: laptop_desktop,
    newPost: 8
  },
  {
    id: '8',
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
    console.log(value)
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
