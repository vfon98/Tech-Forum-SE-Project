import React from 'react'
import { Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles({
  background: {
    width: '100%',
    height: '100%',
    background: 'none',
    border: 'none',
    outline: 'none',
    transition: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  card: {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    }
  },

  img: {
    width: '100%',
    height: '100%',
    maxHeight: '12rem',
    overflow: 'hidden',
    objectFit: 'cover',
    objectPosition: 'center center',
  },
  title: {
    textAlign: 'left',
    fontSize: '1rem',
    padding: 0,
    paddingLeft: '.5rem',
    margin: '.3rem',


  },
  body: {
    textAlign: 'left',
    fontSize: '.8rem',
    padding: 0,
    paddingLeft: '.5rem',
    margin: '.3rem',
    marginBottom:'.5rem',
    color: "rgba(51,51,51,.8)"

  }

})

function CustomCard(props) {
  const classes = useStyles();
  return (
    <>
      <button
        onClick={() => props.handleClick(props.id)}
        className={classes.background}
      >
        <Card className={classes.card}>
          <img
            src={props.image}
            className={classes.img}
          />
          <h3 className={classes.title}>
            {props.title}
          </h3>
          <p className={classes.body}>
            New Post: {props.newPost}
          </p>
        </Card>
      </button>
    </>
  )
}

export default (CustomCard)
