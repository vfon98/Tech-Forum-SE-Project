import React, { Component } from 'react'
import { Button, TextField, Grid } from "@material-ui/core"
import { withStyles } from '@material-ui/styles'
import { Edit, Close, Done, Delete } from '@material-ui/icons'
import listStyles from './jss/listStyles'


const StyledButton = withStyles({
  root: {
    width: '1rem',
    margin: '0 .5rem',
    transition: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)'

  }
})(Button)

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      show: false,
      showDeleteButton: [],
      data: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.value,
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

  render() {
    const { classes } = this.props
    return (
      <>
        <div
          className={classes.item}
          onMouseOver={e => this.handleShow(true)}
          onMouseLeave={e => this.handleShow(false)}
        >
          <Grid container spacing={2}>
            <Grid item sm={3} justify='flex-start'>
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
            <Grid item sm={6}>
              {
                this.state.status ?
                  this.state.data ? (this.state.data.map((d, i) => (
                    <div
                      onMouseOver={e => this.setDisplay(true, i)}
                      onMouseLeave={e => this.setDisplay(false, i)}
                      key={i}
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
                      >
                        <Delete />
                      </Button>

                    </div>
                  )
                  )) : null

                  :
                  this.state.data ? (this.state.data.map((d, i) => (
                    <span
                      className={classes.value}
                      key={i}
                    >
                      {
                        d
                      }
                    </span>
                  ))) : null
              }
            </Grid>

          </Grid >
          <Grid container justify='flex-end' className={classes.buttonWrap}>
            <Grid>
              {
                (this.state.status ?
                  (
                    <>
                      <StyledButton
                        onClick={() => {
                          this.handleStatus(false)
                        }}
                      >
                        <Done />
                      </StyledButton>

                      <StyledButton
                        onClick={() => {
                          this.cancel()
                          this.handleStatus(false)
                        }}
                      >
                        <Close />
                      </StyledButton>
                    </>
                  ) :
                  (<StyledButton onClick={() => this.handleStatus(true)}
                    className={!this.state.show ? classes.displayButton : null}
                  >
                    <Edit />
                  </StyledButton>))
              }
            </Grid></Grid>

        </div>
      </>
    )
  }
}

export default withStyles(listStyles)(List)
