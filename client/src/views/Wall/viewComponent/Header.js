import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Grid, Button } from '@material-ui/core'
import headerStyles from './jss/headerStyles'
import userDefaultAvatar from 'assets/img/profiles/user-default-avatar.png'
import { Edit } from '@material-ui/icons'
import Popup from './Popup/Popup'
import notification from 'components/Notification'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isOpenPopup: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    })
  }

  handlePopup = () => {
    this.setState({
      isOpenPopup: !this.state.isOpenPopup
    })
  }

  handleUpdate = async newData => {
    this.setState({
      data: { ...this.state.data, ...newData },
      isOpenPopup: false
    })
  }

  handleNotification = (type) => {
    let successNotiOption = {
      type: 'success',
      title: 'Update successfully',
      message: 'All your data has been update successfully!'
    }
    let errorNotiOption = {
      type: 'danger',
      title: 'Update faild',
      message: 'All your data has been update failed! Try again.'
    }

    if (type = 'success') {
      window.location.reload()
    } else {
      notification(errorNotiOption)
    }
  }

  render() {
    const { classes } = this.props;
    const { isOpenPopup, data } = this.state;
    return (
      <>
        {
          this.props.permission == 'edit' ?
            (<Popup
              isOpen={isOpenPopup}
              handlePopup={this.handlePopup}
              handleUpdate={this.handleUpdate}
              data={data ? data : null}
              handleNotification={this.handleNotification}
            />)
            : null
        }
        <div className={classes.wrap}>
          <Grid
            container
            className={classes.container}
            spacing={6}
          >
            <Grid item sm={4}>
              <div
                className={classes.avatar}
              >
                <img
                  src={data?.avatar ? data.avatar : userDefaultAvatar}
                  className={classes.avatarImg}
                />
              </div>
            </Grid>
            <Grid item sm={8}>
              <div>
                <p
                  className={classes.displayName}
                >
                  {data ? data.displayName : 'Loading...'}

                </p>
                <p
                  className={classes.job}
                >
                  {data ? data.job : null}
                </p>
                <p
                  className={classes.status}
                >
                  {data ? data.status : 'Please wait'}
                </p>
              </div>

            </Grid>
          </Grid>
          {
            this.props.permission == 'edit' ?
              (<Button
                className={classes.editBtn}
                onClick={this.handlePopup}
              >
                <Edit />
              </Button>) : null
          }
        </div>
      </>
    )
  }
}

export default withStyles(headerStyles)(Header)
