import React from 'react'
import { Button, TextField } from "@material-ui/core"
import { withStyles } from '@material-ui/styles'
import { Edit, Close, Done } from '@material-ui/icons'
import itemStyles from './jss/itemStyles'
import axios from '../../../axios/instance'

const StyledButton = withStyles({
  root: {
    width: '1rem',
    margin: '0 .5rem',
    transition: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)'

  }
})(Button)

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.value,
      status: false,
      show: false
    }
  }

  componentWillReceiveProps(nextProps){
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

  handleUpdate = (newData, id) => {
    let obj = {};
    obj[id] = newData;
    axios
    .post('/api/',
      obj
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.item} onMouseOver={e => this.handleShow(true)} onMouseLeave={e => this.handleShow(false)}>

        <span className={classes.icon}> {this.props.icon}</span>
        <span className={classes.label}>{this.props.label}</span>
        {
          this.state.status ?
            <TextField
              className={classes.textField}
              type="text" value={this.state.data}
              onChange={e => this.handleInputChange(e.target.value)}
            /> :
            <span className={classes.value}>{this.state.data}</span>
        }
        {
          (this.state.status ?
            (
              <>
                <StyledButton
                  onClick={() => {
                    this.handleUpdate(this.state.data, this.props.id)
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

      </div>
    )
  }
}
export default withStyles(itemStyles)(Item)