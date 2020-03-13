import React, { Component } from 'react'
import Item from '../../view components/Item'
import { LocationOn, Home, School } from '@material-ui/icons'
import List from '../../view components/List'
const label = {
  "hometown" : 'From',
  "live_at" : "Live at"
}

class OverViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.userOverview
    })
  }
  render() {
    return (
      <>
        <h1>Overviews</h1>
        <List 
          label={'Education'}
          value={this.state.data ? this.state.data.education : null}
          id={'education'}
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
