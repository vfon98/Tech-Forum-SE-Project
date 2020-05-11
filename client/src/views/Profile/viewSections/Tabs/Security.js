import React from 'react'
import { TextField, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  input: {
    width: "25rem",
    display: 'flex',
    margin: '1.5rem 0 0 1rem'
  },
  button: {
    display: 'block',
    margin: '2rem 1rem',
    padding: ".5rem 1rem",
    textTransform: 'capitalize',
    color: "#ffffff",
    background: "#388E3C",
    '&:hover' : {
      background: '#43A047'
    }
  }
})

export default function Security() {
  const classes = useStyles();
  return (
    <>
      <h3>Change password</h3>
        <TextField
          className={classes.input}
          id="filled-password-input"
          label="Old password"
          type="password"
          autoComplete="new-password"
          variant="filled"
        />
        <TextField
          className={classes.input}
          id="filled-password-input"
          label="New password"
          type="password"
          autoComplete="new-password"
          variant="filled"
        />
        <TextField
          className={classes.input}  id="filled-password-input"
          label="Retype password"
          type="password"
          autoComplete="new-password"
          variant="filled"
          
        />
        <Button className={classes.button}>Update password</Button>
    </>
  )
}
