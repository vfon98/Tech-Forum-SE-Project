import React from 'react'
import { withStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import { Edit, Delete, Done, Close } from '@material-ui/icons'
import axios from '../../../axios/instance'
import ConfirmPopup from '../../../components/ConfirmPopup'
import notification from '../../../components/Notification'
import { Grid, TextField } from '@material-ui/core'
import { CameraAlt } from '@material-ui/icons'

import headerStyles from '../view components/jss/headerStyles'

const StyledButton = withStyles({
  root: {
    margin: '.5rem',
    padding: "0 .5rem",
    transition: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
    textTransform: "capitalize",
    height: '2rem'
  }
})(Button)
const SuccessButton = withStyles({
  root: {
    margin: '.5rem',
    height: '2rem',
    transition: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
    background: "#1E88E5",
    color: "#fff",
    textTransform: "capitalize",
    "&:hover": {
      background: "#2196F3"
    }
  }
})(Button)

const img = 'https://wallpaperaccess.com/full/7280.jpg'
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenConfirm: false,
      status: {
        message: null,
      },
      showEditButton: false,
      editStatus: false,
      file: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      status: {
        message: nextProps.status,
      }
    })
  }

  handleShowEditStatusButton = (value) => {
    this.setState({
      showEditButton: value
    })
  }

  handleFileInputChange = async (e) => {
    await this.setState({
      file: e.target.files[0],
      isOpenConfirm: true
    })
  }

  handleConfirm = (option) => {

    const { file } = this.state;
    if (option == 'yes') {
      let errorNotificationOption = {
        title: "Error",
        type: "danger",
        message: "Your profile picture update failed. Try again!"
      }

      let successNotificationOption = {
        title: 'Success',
        title: 'success',
        message: "Your profile picture was updated successfully!"
      }

      let warningNotificationOption = {
        title: "Processing!",
        type: "warning",
        message: "Your data being in process! Please wait...",
        duration: 5000
      }

      this.setState({
        isOpenConfirm: false
      })

      notification(warningNotificationOption)
      let a = new FormData();
      a.append('avatar', file);
      axios.put('/users/avatar', a)
        .then(async response => {
          if (response.data.user.id) {
            await notification(successNotificationOption)
            setTimeout(() => {
              window.location.reload()
            }, 3000)
          }
        })
        .catch(err => {
          notification(errorNotificationOption)
        })
    } else {
      this.setState({
        isOpenConfirm: false
      })
    }
  }
  handleEditStatus = () => {
    this.setState({
      editStatus: true
    })
  }

  handleAddNew = () => {
    this.setState({
      editStatus: true,
      status: {
        message: ''
      }
    })
  }
  handleTextFieldChange = e => {
    this.setState({
      status: {
        message: e.target.value
      }
    })
  }
  handleCancel = () => {
    this.setState({
      editStatus: false,
      status: {
        message: this.props.status
      }
    })
  }
  handleUpdateStatus = () => {

    this.setState({
      editStatus: false
    })
    let a = this.state.status.message;
    if (a.replace(/\s/g, "") == "") {
      a = null;
    }

    let errorNotificationOption = {
      title: "Error",
      type: "danger",
      message: "Your status update failed. Try again!"
    }

    let successNotificationOption = {
      title: 'Success',
      title: 'success',
      message: "Your status was updated successfully!"
    }

    axios.put('/users/status', { 'status': a })
      .then(res => {
        if (res.data.user.id) {

          notification(successNotificationOption)
        } else {
          notification(errorNotificationOption)
          this.setState({
            editStatus: true
          })

        }
      })
      .catch(() => {
        notification(errorNotificationOption);
        this.setState({
          editStatus: true
        })
      })
  }

  render() {
    const { classes } = this.props;
    const { isOpenConfirm, status } = this.state
    return (
      <>
        <ConfirmPopup isOpen={isOpenConfirm} handleClose={this.handleConfirm}
          message='Are you seriously want to update it?'
        />
        <Grid className={classes.container} container>
          <img className={classes.img} src={img} />
        </Grid>
        <Grid container justify='center'>
          <Grid item className={classes.headerTitle}>
            <img className={classes.avatar} src={this.props.avatar} />
            <div className={classes.editAvatarBtn}>
              <CameraAlt />
              <input
                type='file'
                name='avatar'
                className={classes.avatarInputFile}
                onChange={this.handleFileInputChange}
              />
            </div>
            <h3 className={classes.displayName}>Nguyen Khoa</h3>


          </Grid>
        </Grid>

        <Grid container justify='space-around'>
          <Grid
            item sm={6}
            alignContent='center'
          >
            <div
              className={classes.statusWrap}
              onMouseOver={() => this.handleShowEditStatusButton(true)}
              onMouseLeave={() => this.handleShowEditStatusButton(false)}

            >

              {
                this.state.status.message != null ? (
                  !this.state.editStatus ?
                    (
                      <>
                        <p
                          className={classes.status}
                        >
                          {
                            status.message
                          }
                        </p>
                        <Button
                          className={
                            this.state.showEditButton ?
                              classes.activeEditButton :
                              classes.hiddenEditButton}
                          onClick={this.handleEditStatus}
                        >
                          <Edit />
                        </Button>
                      </>
                    ) :
                    (
                      <>
                        <div
                          className={classes.inputField}
                        >
                          <TextField
                            className={classes.textField}
                            value={this.state.status.message ? this.state.status.message : null}
                            onChange={this.handleTextFieldChange}
                          />


                        </div>
                        <div
                          className={classes.actionButton}
                        >
                          <SuccessButton
                            onClick={this.handleUpdateStatus}
                          >
                            <Done />
                           Save
                        </SuccessButton>

                          <StyledButton
                            onClick={this.handleCancel}
                          >
                            <Close />
                      Cancel
                    </StyledButton>
                        </div>
                      </>
                    )
                )
                  :
                  (
                    <Button
                      onClick={this.handleAddNew}
                      className={classes.addNewButton}>
                      + Add new
                    </Button>
                  )
              }
            </div>

          </Grid>
        </Grid>
        <div className={classes.hr}></div>
      </>
    )
  }
}

export default withStyles(headerStyles)(Header);
