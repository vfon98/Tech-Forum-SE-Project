import React from 'react'
import { Button, TextField, Grid } from "@material-ui/core"
import { withStyles } from '@material-ui/styles'
import { Edit, Close, Done, Delete } from '@material-ui/icons'
import itemStyles from './jss/itemStyles'
import axios from '../../../axios/instance'
import ConfirmPopup from '../../../components/ConfirmPopup'

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

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.value,
      status: false,
      show: false,
      displayDeleteButton: false,
      isOpenConfirm: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.value
    })

  }
  handleInputChange = (newValue) => {
    this.setState({
      data: newValue
    })
  }

  handleStatus = (value) => {
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
      data: this.props.value
    })
  }

  handleShowDeleteButton = (value) => {
    this.setState({ displayDeleteButton: value })
  }

  handleAddNew = () => {
    this.handleStatus(true);
    this.setState({
      data: ''
    })
  }

  handleUpdate = () => {
    let d = this.state.data;

    let tmp = new Object();
    tmp[this.props.id] = d
    axios.put('/profile', tmp)
  }

  handleDelete = () => {
    this.setState({
      isOpenConfirm: true
    })
  }


  handleConfirm = async (option) => {
    if (option === 'yes') {
      await this.setState({
        isOpenConfirm: false,
        data: ''
      })
      this.handleUpdate()
    } else {
      this.setState({
        isOpenConfirm: false
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.item} onMouseOver={e => this.handleShow(true)} onMouseLeave={e => this.handleShow(false)}>

        <ConfirmPopup isOpen={this.state.isOpenConfirm} handleClose={this.handleConfirm} />
        <Grid container spacing={2}>
          <Grid item style={{ width: '8rem' }}>
            <span className={classes.icon}> {this.props.icon}</span>
            <span className={classes.label}>{this.props.label}</span>

          </Grid>
          <Grid item sm={6}>
            {
              this.state.status ?
                (
                  <div
                    onMouseOver={() => this.handleShowDeleteButton(true)}
                    onMouseLeave={() => this.handleShowDeleteButton(false)}
                    className={classes.row}
                  >
                    <TextField
                      className={classes.textField}
                      type="text" value={this.state.data}
                      onChange={e => this.handleInputChange(e.target.value)}
                    />
                    {/* <Button
                          className={
                            !this.state.displayDeleteButton ?
                              classes.displayButton :
                              null
                          }
                          onClick={this.handleDelete}
                        >
                          <Delete />
                        </Button> */}
                  </div>
                ) :
                this.props.type ? (<a href={`https://${this.state.data}`} target="_blank" className={classes.link}>{this.state.data}</a>) : (<span className={classes.value}>{this.state.data}</span>)
            }

          </Grid>
          <Grid item sm={3} >
            {this.state.data !== '' ? (
              <div>
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
                          <Done />
                      Save
                    </SuccessButton>

                        <StyledButton
                          onClick={() => {
                            this.cancel()
                            this.handleStatus(false)
                          }}
                        >
                          <Close />
                      Cancel
                    </StyledButton>
                      </div>
                    ) :
                    (
                      <div className={classes.buttonGroup}>
                        <StyledButton onClick={() => this.handleStatus(true)}
                          className={!this.state.show ? classes.displayButton : null}
                        >
                          <Edit />
                        </StyledButton>
                      </div>
                    )
                  )
                }
              </div>
            ) : null}
          </Grid>

        </Grid>


      </div>
    )
  }
}
export default withStyles(itemStyles)(Item)