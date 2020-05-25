import React from 'react'
import { Button, TextField, Grid } from "@material-ui/core"
import { withStyles } from '@material-ui/styles'
import { Edit, Close, Done, Delete } from '@material-ui/icons'
import itemStyles from './jss/itemStyles'
import axios from '../../../axios/instance'
import ConfirmPopup from '../../../components/ConfirmPopup'
import notification from 'components/Notification'



const StyledButton = withStyles({
  root: {
    width: '1rem',
    margin: '0 .5rem',
    transition: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)'

  }
})(Button)

const SuccessButton = withStyles({
  root: {
    margin: '0 .2rem',
    transition: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
    background: "#1E88E5",
    color: "#fff",
    textTransform: "capitalize",
    "&:hover": {
      background: "#2196F3"
    }
  }
})(Button)

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.value,
      status: false,
      isOpenConfirm: false,
      showEditButton: false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data: nextProps.value
    })
  }

  handleAddNew = () => {
    this.setState({
      data: '',
      status: true
    })
  }

  handleStatus = (value) => {
    this.setState({
      status: value
    })
  }

  handleShowEditButton = (value) => {
    this.setState({
      showEditButton: value
    })
  }

  handleTextFieldChange = (value) => {
    this.setState({
      data: value
    })
  }

  openDeleteConfirm = () => {
    this.setState({
      isOpenConfirm: true
    })
  }


  handleCancel = () => {
    let d = this.state.data;
    if (d == '') {
      d = null
    }
    this.setState({
      data: d,
      status: false
    })
  }

  handleUpdate = async () => {
    let errorNotificationOption = {
      type: 'danger',
      title: 'Error!',
      message: 'Your data update failed'
    }
    let successNotificationOption = {
      type: 'success',
      title: 'Success!',
      message: 'All your data has been successfully updated'
    }

    let updateData = {
      [this.props.id]: this.state.data
    }
    await axios.put('/profile', updateData)
      .then(res => {
        if (res.data.status == 'ok') {
          notification(successNotificationOption)
          this.setState({
            status: false
          })
        }
      })
      .catch(err => notification(errorNotificationOption))
  }

  handleConfirm = async (option) => {
    if (option == 'yes') {
      await this.setState({
        data: null,
        status: false,
        isOpenConfirm: false
      })
      this.handleUpdate();
    }
    else {
      this.setState({
        isOpenConfirm: false
      })
    }
  }

  render() {
    const { classes, icon, label } = this.props;
    const { data, status, isOpenConfirm, showEditButton } = this.state
    return (
      <>
        <ConfirmPopup isOpen={isOpenConfirm} handleClose={this.handleConfirm} />
        <Grid
          container
          spacing={2}
          className={classes.row}
          onMouseOver={() => this.handleShowEditButton(true)}
          onMouseLeave={() => this.handleShowEditButton(false)}

        >
          <Grid item sm={3}>
            <span
              className={classes.icon}
            >
              {icon}
            </span>
            <span
              className={classes.label}
            >
              {label}
            </span>
          </Grid>
          <Grid item sm={6}>
            {
              data != null ?
                (
                  status ? (
                    <div
                      className={classes.inputField}
                    >
                      <TextField
                        className={classes.textField}
                        value={data ? data : null}
                        onChange={e => this.handleTextFieldChange(e.target.value)}
                      />

                      <Button
                        onClick={this.openDeleteConfirm}
                      >
                        <Delete />
                      </Button>
                    </div>
                  )
                    :
                    (<span className={classes.value}>{this.state.data}</span>)

                ) :
                (
                  <Button
                    onClick={this.handleAddNew}
                    className={classes.addNewButton}>
                    + Add new
                  </Button>
                )
            }

          </Grid>
          <Grid item sm={3} >
            {
              status ?
                (<div className={classes.buttonGroup}>
                  <SuccessButton
                    onClick={this.handleUpdate}
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
                </div>)
                : (
                  <div className={classes.buttonGroup}>
                    <StyledButton
                      onClick={() => this.handleStatus(true)}
                      className={!showEditButton ? classes.hideButton : null}
                    >
                      <Edit />
                    </StyledButton>
                  </div>
                )
            }
          </Grid>

        </Grid>

      </>
    )
  }
}

export default withStyles(itemStyles)(Item)
