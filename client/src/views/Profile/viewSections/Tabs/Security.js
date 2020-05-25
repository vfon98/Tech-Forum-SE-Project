import React from 'react'
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from '../../../../axios/instance'
import { getUser } from '../../../../utils/session'
import notification from '../../../../components/Notification'


const useStyles = makeStyles(theme => (
  {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '35ch',
    },
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
      '&:hover': {
        background: '#43A047'
      }
    },
    row: {
      display: 'block'
    },
    errorMessage: {
      display: 'block',
      color: "#f00",
      fontSize: ".8rem",
      margin: "0.5rem 0"
    }
  }
))



export default function Security() {
  const [pwd, setPwd] = React.useState({
    oldPwd: null,
    newPwd: null,
    retype: null,
    oldPasswordMessage: null,
    newPasswordError: null,
    flag: false
  })

  const [showPassword, setShowPassword] = React.useState(false);
  const classes = useStyles();

  const passwordMatchChecker = (str) => {
    if (str?.length > 0) {
      if (str !== pwd.newPwd) {
        setPwd({ ...pwd, newPasswordError: 'Those password doesn\'t match. Try again!' });
      } else {
        setPwd({ ...pwd, flag: true, newPasswordError: null })
      }
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUpdate = async () => {
    let a = {
      email: getUser().email,
      password: pwd.oldPwd
    }
    axios.post('/users/login', a)
      .then(response => {
        if (!response.data.isAuthenticated) {
          setPwd({ ...pwd, oldPasswordMessage: "The password that you're entered is incorrect!" })
        } else {
          if (!pwd.newPwd || pwd.newPwd.length == 0) {
            setPwd({...pwd, newPasswordError: "Enter a password!", oldPasswordMessage: null})
          } else {
            if (pwd?.newPwd != pwd?.retype) {
              setPwd({
                ...pwd,
                newPasswordError: "Those password didn't match. Try again!",
                oldPasswordMessage: null
              })
            } else {

              let errorNotificationOption = {
                type: 'danger',
                title: 'Error!',
                message: 'Your password update failed. Try again!'
              }
              let successNotificationOption = {
                type: 'success',
                title: 'Success!',
                message: 'Your password was updated successfully!'
              }

              setPwd({...pwd, newPasswordError: null});
              let a = new FormData();
              a.append('password', pwd.newPwd)
              axios.put('/users/password', {password: pwd.newPwd})
              .then(response => {
                if(response.data.success == true) {
                 notification(successNotificationOption)
                } else {
                  notification(errorNotificationOption)
                }
              })
              .catch(err => notification(errorNotificationOption))
            }
          }
        }
      })
      .catch(err => {
        setPwd({ ...pwd, oldPasswordMessage: "The password that you're entered is incorrect!" })
      })
  }


  return (
    <>
      <h3>Change password</h3>
      <div className={classes.row}>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Old password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={pwd.oldPwd}
            onChange={e => setPwd({ ...pwd, oldPwd: e.target.value })}
            autoComplete="new-password"
            error={pwd.oldPasswordMessage ? true : false}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <p
            className={classes.errorMessage}
          >
            {
              pwd.oldPasswordMessage
            }
          </p>
        </FormControl>
      </div>
      <div className={classes.row}>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">New password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={pwd.newPwd}
            onChange={e => setPwd({ ...pwd, newPwd: e.target.value })}
            autoComplete="new-password"
            error={pwd.newPasswordError ? true : false}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <p
            className={classes.errorMessage}
          >
            {
              pwd.newPasswordError
            }
          </p>
        </FormControl>
      </div>
      <div className={classes.row}>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Re-type password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={pwd.retype}
            onChange={e => setPwd({ ...pwd, retype: e.target.value })}
            autoComplete="new-password"
            error={pwd.newPasswordError ? true : false}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <p
            className={classes.errorMessage}
          >
            {
              pwd.newPasswordError
            }
          </p>
        </FormControl>
      </div>
      <Button
        className={classes.button}
        onClick={handleUpdate}
      >
        Update password
        </Button>
    </>
  )
}
