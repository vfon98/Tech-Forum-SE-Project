import React from 'react'

import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import axios from '../../axios/instance'

import discussionViewStyles from '../../assets/jss/discussionViewStyles'

import windows from '../../assets/img/title/windows.jpg'
import macos from '../../assets/img/title/macos.jpg'
import ios from '../../assets/img/title/ios.jpg'
import android from '../../assets/img/title/android.jpg'
import linux from '../../assets/img/title/linux.jpg'
import smartphone from '../../assets/img/title/smartphone.jpg'
import laptop_desktop from '../../assets/img/title/laptop_desktop.jpg'
import programing from '../../assets/img/title/programing.jpg'

import Card from './view components/CustomCard'
import NavBar from '../../components/NavBar'

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
    title: 'Programming',
    img: programing,
    newPost: 1
  },
]

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    }
  }
  
  componentDidMount() {
    axios.get('/rooms').then(res => {
      this.setState({
        rooms: res.data.rooms
      })
    })
  }
  
  handleClick = value => {
    console.log(value)
    this.props.history.push(`/room/${value}`)
  }

  handleAuthChanged = state => {
    this.setState({
      isLogin: state,
    });
  };

  render() {
    const { classes } = this.props
    return (
      <>
        <NavBar isLogin={this.handleAuthChanged} />
        <div
          className={classes.background}
        >
          <Grid container className={classes.container} spacing={2}>
            {
              this.state.rooms.map(room => (
                <Grid sm={4} item key={room.id}>
                  <Card
                    image={room.image}
                    handleClick={this.handleClick}
                    id={room.id}
                    title={room.name}
                    newPost={room.total_news}
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
