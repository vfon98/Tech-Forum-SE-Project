import React, { Component } from 'react'
import './style.css'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/styles'
import history from 'utils/history'
const CustomButton = withStyles({
  root: {
    background: '#DD163B',
    color: 'rgba(255,255,255,.8)',
    fontSize: '1rem',
    padding: '1rem 2.5rem',
    "&:hover": {
      background: '#B9163B'
    }
  }
})(Button)
export class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      404: "the page you're looking for can't be found!",
      401: "you don't allow to access this page!",

    }
  }
  render() {
    const { errorCode } = this.props;
    return (
      <>
        <div
          className='container'
        >
          <span
            className='wartermark'
          >
            {errorCode == 401 ? 401 : 404}
          </span>
          <div
            className='content'
          >
            <h1
              className='t1'
            >
              Ooops!
            </h1>

            <p
              className='t2'>
              We're sorry, {' '}
              {
                errorCode ? this.state[errorCode] :
                  this.state[404]
              }
            </p>

            <div
              className='btn'
            >
              <CustomButton
                onClick={()=> history.push('/')}
              >
                Go back
          </CustomButton>
            </div>
          </div>

        </div>
      </>
    )
  }
}

export default NotFound
