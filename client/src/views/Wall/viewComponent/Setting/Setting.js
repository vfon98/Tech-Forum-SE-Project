import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import settingStyles from './settingStyles'

class Setting extends Component {
  render() {
    const { classes } = this.props
    return (
      <div
        className={classes.background}
      >
        kajslfka

      </div>
    )
  }
}

export default withStyles(settingStyles)(Setting)
