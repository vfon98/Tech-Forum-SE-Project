import React, { useEffect } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from 'axios/instance'
import {
  Dialog,
  DialogContent,
  Card,
  CardContent,
  Typography,
  TextField,
  Input,
  Button
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import notification from 'components/Notification';

const useStyles = makeStyles({
  root: {
    marginTop: '-5%',
    background: 'rgba(0,0,0,.7)',
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none',
  },
  background: {
    width: '25vw',
    // height: '70vh',
    background: '#fff',
    display: 'block',
    minWidth: '30rem'
  },
  container: {
    padding: '1rem',
    boxSizing: 'border-box',
    position: 'relative'
  },
  title: {
    margin: '1rem 0',
    width: '100%',
  },
  breakLine: {
    borderTop: '1px solid rgba(51,51,51,.2)'
  },
  textField: {
    display: 'flex',
    width: '100%',
    margin: '2rem 0 1rem 0'
  },
  body1: {
    textAlign: 'left',
    marginTop: '2rem',
    color: "rgba(51,51,51,.8)"
  },
  input: {
    color: 'rgba(51,51,51,.9)'
  },
  avatar: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: '1rem 1rem',
    boxSizing: 'border-box',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarImg: {
    objectFit: 'cover',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  fileInput: {
    alignItems: 'center',
    marginLeft: '2rem'
  },
  actionButton: {
    display: "flex",
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: '2rem',
    marginBottom: '.5rem'
  }
});


const StyledButton = withStyles({
  root: {
    margin: '0 .5rem',
    display: 'flex',
    padding: ".5rem 1rem",
    transition: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
    textTransform: "capitalize",
  }
})(Button)
const SuccessButton = withStyles({
  root: {
    margin: '0 .5rem',
    display: 'flex',
    padding: ".5rem 1rem",
    transition: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
    background: "#1E88E5",
    color: "#fff",
    textTransform: "capitalize",
    "&:hover": {
      background: "#2196F3"
    }
  }
})(Button)

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'rgba(51,51,51,.6)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgba(51,51,51,.6)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(51,51,51,.6)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(51,51,51,.6)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(51,51,51,.6)',
      },
    },
  },
})(TextField);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

const Popup = props => {
  const [data, setData] = React.useState(null);
  const [updateData, setUpdateData] = React.useState({});
  const { isOpen } = props;
  const classes = useStyles();
  let avatarRef = null;

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const handleChange = (newData, field) => {
    setData({ ...data, [field]: newData })
    setUpdateData({ ...updateData, [field]: newData })
  }

  const handleAvatarUpdate = (e) => {
    // setUpdateData({ ...updateData, avatar: e.target.files[0] })
    const reader = new FileReader();
    reader.onload = function(ev) {
      avatarRef.src = ev.target.result
    }
    reader.readAsDataURL(e.target.files[0])
  }


  const handleUpdate = async () => {
    let warningOption = {
      type: 'warning',
      title: 'Keep calm...',
      message: 'Your data is being processed... Please wait!'
    }
    notification(warningOption)
    let done = false;
    if (updateData.status) {
      await axios.put('/users/status', { status: updateData.status })
        .then(response => {
          if (response.data.status == 'ok') {
            done = true;
          }
        })
        .catch(() => done = false)
    }
    if (updateData.avatar) {
      let a = new FormData();
      a.append('avatar', updateData.avatar)
      await axios.put('/users/avatar', a)
        .then(response => {
          if (response.data.user) {
            done = true;
          }
        })
        .catch(() => done = false)
    }
    if (updateData.job) {
      await axios.put('/profile', { job: updateData.job })
        .then(response => {
          if (response.data.status == 'ok') {
            done = true;
          }
        })
        .catch(() => done = false)
    }
    if (done) {
      props.handleUpdate(updateData)
      setTimeout(() => {
        props.handlePopup(false)
      }, 5000)
      props.handleNotification('success');
    } else {
      setTimeout(() => {
        props.handleUpdate(updateData)
      }, 3000);
      props.handleNotification('error');
      props.handlePopup(true)
    }
  }
  const handleCancel = () => {
    props.handlePopup(false)
  }
  return (
    <>
      <Dialog
        open={isOpen}
        scroll='body'
        onClose={() => props.handlePopup()}
        className={classes.root}
        TransitionComponent={Transition}
        BackdropProps={{
          classes: {
            root: classes.root,
          },
        }}
        PaperProps={{
          classes: {
            root: classes.paper,
          },
        }}
      >
        <DialogContent>
          <Card
            className={classes.background}
          >
            <CardContent
              className={classes.container}
            >
              <Typography
                variant='h6'
                display='block'
                align='center'
                className={classes.title}
              >
                Edit profile
          </Typography>
              <hr
                className={classes.breakLine}
              />
              <CssTextField
                id="standard-basic"
                label="Display Name"
                className={classes.textField}
                value={data ? data.displayName : ''}
                // onChange={(e) => handleChange(e.target.value, 'displayName')}
                InputProps={{ className: classes.input }}
                disabled
              />
              <Typography
                variant='body1'
                display='block'
                align='center'
                className={classes.body1}
              >
                Change your profile picture
          </Typography>

              <div
                className={classes.avatar}

              >
                <img
                  ref={node => avatarRef = node}
                  className={classes.avatarImg}
                  src={data ? data.avatar : null}
                />
                <Input
                  type='file'
                  disableUnderline
                  className={classes.fileInput}
                  onChange={e => handleAvatarUpdate(e)}
                />
              </div>
              <div
                className={classes.centerInput}
              >

              </div>


              <CssTextField
                id="standard-basic"
                label="Your job"
                className={classes.textField}
                value={data ? data.job : ''}
                onChange={(e) => handleChange(e.target.value, 'job')}
                InputProps={{ className: classes.input }}
              />
              <CssTextField
                id="standard-basic"
                label="Status"
                className={classes.textField}
                value={data ? data.status : ''}
                onChange={(e) => handleChange(e.target.value, 'status')}
                InputProps={{ className: classes.input }}
              />

              <div
                className={classes.actionButton}
              >
                <SuccessButton
                  onClick={handleUpdate}
                >
                  Save
                  </SuccessButton>
                <StyledButton
                  onClick={handleCancel}
                >
                  Cancel
                </StyledButton>
              </div>

            </CardContent>

          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Popup;
