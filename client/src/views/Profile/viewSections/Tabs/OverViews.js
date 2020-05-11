import React, { Component } from 'react'
import Item from '../../view components/Item'
import { LocationOn, Home, School } from '@material-ui/icons'
import List from '../../view components/List'
import axios from '../../../../axios/instance'

class OverViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    axios
      .get('/profile')
      .then(res => {
        this.setState({
          data: res.data.profile.overview
        })
      })

  } 

  render() {
    return (
      <>
      <h3>
        Overview
      </h3>
        <List
          label={'Education'}
          value={this.state.data ? this.state.data.education : null}
          id={'educations'}
          icon={<School />}
        />
        <Item
          value={this.state.data ? this.state.data.hometown : null}
          label={'From'}
          id="hometown"
          icon={<LocationOn />}
        />
        <Item
          value={this.state.data ? this.state.data.live_at : null}
          label={'Live at'}
          id="live_at"
          icon={<Home />}
        />
      </>
    )
  }
}

export default OverViews
