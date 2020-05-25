import React, { Component } from 'react'
import { Button, TextField, Grid } from "@material-ui/core"
import { withStyles } from '@material-ui/styles'
import { Edit, Close, Done, Delete } from '@material-ui/icons'
import listStyles from './jss/listStyles'
import axios from '../../../axios/instance'
import notification from 'components/Notification'


const StyledButton = withStyles({
  root: {
    margin: '0 .2rem',
    transition: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
    textTransform: "capitalize",
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

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      show: false,
      showDeleteButton: [],
      data: null
    }
  }

  componentWillReceiveProps(nextProps) {
    let tmp = nextProps?.value?.length == 0 ? null : nextProps.value
    this.setState({
      data: tmp
    })
  }

  handleChange = (value, index) => {
    let d = this.state.data;
    d[index] = value
    this.setState({
      data: d
    })
  }

  handleStatus = value => {
    this.setState({
      status: value
    })
  }

  handleShow = value => {
    this.setState({
      show: value
    })
  }

  cancel = () => {
    this.setState({
      data: this.props.value,
      status: false
    })
  }

  setDisplay = (value, i) => {
    this.state.showDeleteButton[i] = value
  }

  addNewValue = () => {
    this.setState({
      status: true
    })
    let d = new Array();
    if (this.state.data) {
      d = [...this.state.data];
    }
    d.push("");
    this.setState({
      data: d
    })
  }
  deleteValue = (index) => {
    let d = [...this.state.data];
    d = d.filter((v, i) => i != index);
    this.setState({
      data: d
    })
  }
  handleUpdate = () => {
    let errorNotificationOption = {
      type: 'danger',
      title: 'Error!',
      message: 'Your data update failed!'
    }
    let successNotificationOption = {
      type: 'success',
      title: 'Success!',
      message: 'All your data has been successfully updated!'
    }

    let updateData = {
      [this.props.id]: this.state.data
    }

    let d = [...this.state.data];
    d = d.filter((v, i) => {
      if (v.replace(/\s/g, "") == "") {
        return false
      }
      return true
    })

    axios.put('/profile', updateData)
      .then(res => {
        if (res.data.status == 'ok') {
          notification(successNotificationOption)
        }
      })
      .catch(err => notification(errorNotificationOption))
  }

  render() {
    const { classes } = this.props
    return (
      <>
        <div
          onMouseOver={e => this.handleShow(true)}
          onMouseLeave={e => this.handleShow(false)}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid item sm={3}>
              <span
                className={classes.icon}
              >
                {this.props.icon}
              </span>
              <span
                className={classes.label}
              >
                {this.props.label}
              </span>
            </Grid>
            <Grid item sm={6} className={classes.valueRow}>
              {
                this.state.status ?
                  this.state.data ?
                    (
                      <div>
                        {
                          this.state.data.map((d, i) => (
                            <div
                              onMouseOver={e => this.setDisplay(true, i)}
                              onMouseLeave={e => this.setDisplay(false, i)}
                              key={i}
                              className={classes.row}
                            >
                              <TextField
                                className={classes.textField}
                                type="text"
                                value={d}
                                index={i}
                                onChange={e => this.handleChange(e.target.value, i)}
                              />

                              <Button
                                className={
                                  !this.state.showDeleteButton[i] ?
                                    classes.displayButton :
                                    null
                                }
                                onClick={e => this.deleteValue(i)}
                              >
                                <Delete />
                              </Button>

                            </div>)
                          )
                        }
                        <Button
                          className={classes.button}
                          onClick={this.addNewValue}
                        >
                          + Add new
                        </Button>
                      </div>
                    ) : null
                  : this.state.data ? (this.state.data.map((d, i) => (
                    <span
                      className={classes.value}
                      key={i}
                    >
                      {
                        d
                      }
                    </span>
                  ))) : (
                      <Button
                        className={classes.button}
                        onClick={this.addNewValue}
                      >
                        + Add new
                      </Button>
                    )
              }
            </Grid>
            <Grid item sm={3}>
              <Grid container justify='flex-end' >
                {
                  (this.state.status ?
                    (
                      <div className={classes.buttonGroup}>
                        <SuccessButton
                          onClick={() => {
                            this.handleUpdate()
                            this.handleStatus(false)
                          }}
                        >
                          <Done /> Save
                        </SuccessButton>

                        <StyledButton
                          onClick={() => {
                            this.cancel()
                            this.handleStatus(false)
                          }}
                        >
                          <Close />Cancel
                        </StyledButton>
                      </div >
                    ) :
                    (<StyledButton onClick={() => this.handleStatus(true)}
                      className={!this.state.show ? classes.displayButton : null}
                    >
                      <Edit />
                    </StyledButton>))
                }
              </Grid>
            </Grid>

          </Grid>
        </div>
      </>
    )
  }
}

export default withStyles(listStyles)(List)
