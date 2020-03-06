import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { container, title } from '../../../assets/jss/main'
import classNames from 'classnames'



import { Grid } from '@material-ui/core'
import { CameraAlt } from '@material-ui/icons'

const useStyles = makeStyles({
  container: {
    ...container,
    height: '20rem',
  },

  img: {
    width: '100%',
    height: '100%',
    overflow: "hidden",
    objectFit: 'cover',
    objectPosition: 'center',
    borderBottomLeftRadius: '1rem',
    borderBottomRightRadius: '1rem',
    zIndex: '-1'
  },
  headerTitle: {
    marginTop: '-9.5rem',
    position: 'relative'
  },

  avatar: {
    width: '10rem',
    height: '10rem',
    borderRadius: '50%',
    border: '.3rem solid #fff'
  },
  editAvatarBtn: {
    position: 'absolute',
    display: 'inline',
    margin: '70% -30%',
    background: '#E4E6EB',
    padding: '.5rem',
    borderRadius: '50%',
    outline: 'none',
    border: 'none',
    transition: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
    '&:hover': {
      cursor: 'pointer',
      background: '#E4E6EE'
    }

  },
  avatarInputFile: {
    fontSize: '100px',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '3rem',
    height: '3rem',
    outline: 'none',
    opacity: 1,
    "&:hover": {
      cursor: 'pointer'
    }
  },
  displayName: {
    color: "rgba(51,51,51,.9)",
    fontSize: "1.8rem",
    textAlign: "center",
    margin: '1rem auto'
  },
  status: {
    fontSize: "1rem",
    color: "rgba(51,51,51,.8)",
    textAlign: 'center'
  }

})



const img = 'https://wallpaperaccess.com/full/7280.jpg'
const avt = 'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-1/p160x160/67149291_864932330549540_4452945672139702272_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=4Y5lzp1uG2QAX_osD9W&_nc_ht=scontent.fsgn5-1.fna&_nc_tp=6&oh=0959aa6f7e87a4a6b782d7949c3fe6cf&oe=5E80D2E7'

export default function Header(props) {
  
  const classes = useStyles()
  return (
    <>
      <Grid className={classes.container} container>
        <img className={classes.img} src={img} />
      </Grid>
      <Grid container justify='center'>
        <Grid item className={classes.headerTitle}>
          <img className={classes.avatar} src={props.avatar} />
          <div className={classes.editAvatarBtn}>
            <CameraAlt />
            <input type='file' className={classes.avatarInputFile} />
          </div> 
          <h3 className={classes.displayName}>Nguyen Khoa</h3>
          <p className={classes.status} >Status</p>
        </Grid>
      </Grid>
    </>
  )
}
