import React, { Component } from 'react'
import discussionStyles from 'assets/jss/discussionStyles'
import { Grid, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'

import img1 from 'assets/img/sidebar/windows.jpg'
import img2 from 'assets/img/sidebar/macos.jpg'
import img3 from 'assets/img/sidebar/ios.jpg'
import img4 from 'assets/img/sidebar/android.jpg'

const items = [
  {
    img: img1,
    title: 'Windows',
    link: '/windows'
  },
  {
    img: img2,
    title: 'macOS',
    link: '/macos'
  },
  {
    img: img3,
    title: 'iOS',
    link: '/ios'
  },
  {
    img: img4,
    title: 'Android',
    link: '/android'
  }
]

const SideBar = (props) => {
  const { classes } = props
  return (

    <>
      <h3 className={classes.title}>
        Community
      </h3>
      {
        items.map(item => <CardItem item={item} classes={classes} />)
      }

    </>

  );
}

const CardItem = (props) => {
  const { classes } = props
  return <>

    <Button className={classes.btn}>
      <NavLink to={props.item.link} style={{ textDecoration: 'none', textTransform: 'none' }}>
        <Grid container>
          <Grid item sm={4}>
            <img
              className={classes.img}
              src={props.item.img}
            />
          </Grid>
          <Grid item sm={8}>
            <h4 className={classes.linkText}>{props.item.title}</h4>
          </Grid>
        </Grid>
      </NavLink>

    </Button>
  </>
}

class Discussion extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.background}>
        <Grid container className={classes.container}>
          <Grid item={3}>
            <SideBar classes={classes}/>
        </Grid>
          <Grid item={9}>

          </Grid>
        </Grid>

      </div>
    )
  }
}

export default withStyles(discussionStyles)(Discussion)
