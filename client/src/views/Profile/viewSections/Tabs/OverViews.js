import React, { Component } from 'react'
import Item from '../../view components/Item'
import { LocationOn, Home, School,AlternateEmail, Call, } from '@material-ui/icons'
import classNames from 'classnames'
import List from '../../view components/List'
import axios from '../../../../axios/instance'
import { withStyles } from '@material-ui/styles'
import contactStyles from '../../view components/jss/Contact'
import { Divider } from '@material-ui/core'

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
        res.data.profile ?
          this.setState({
            data: res.data.profile
          }) :
          this.setState({
            data: null
          })

      })

  }

  render() {
    const { data } = this.state
    const { classes } = this.props
    return (
      <>
        <h3>
          Overview
      </h3>
        <List
          label={'Education'}
          value={data ? data.overview.education : null}
          id={'educations'}
          icon={<School />}
        />
        <Item
          value={data ? data.overview.hometown : null}
          label={'From'}
          id="hometown"
          icon={<LocationOn />}
        />
        <Item
          value={data ? data.overview.live_at : null}
          label={'Live at'}
          id="liveAt"
          icon={<Home />}
        />
        <Divider 
          style={{margin: '1rem 0'}}
        />
        <h3>
          Contact Info
      </h3>
        <List
          label={'Email'}
          value={data ? data.contact.email : null}
          id={'email'}
          icon={<AlternateEmail />}
        />
        <Item
          value={data ? data.contact.phone : null}
          label={'Phone'}
          id="phone"
          icon={<Call />}
        />
        <Item
          value={data ? data.socials.facebook : null}
          label={'Facebook'}
          id="facebook"
          icon={<i aria-hidden="true" className={classNames('fab fa-facebook', classes.icon)}></i>}
          type="link"

        />
        <Item
          value={data ? data.socials.github : null}
          label={'Github'}
          id="github"
          icon={<i aria-hidden="true" className={classNames("fab fa-github", classes.icon)}></i>}
          type="link"

        />
        <Item
          value={data ? data.socials.instagram : null}
          label={'Instagram'}
          id="instagram"
          icon={<i aria-hidden="true" className={classNames("fab fa-instagram", classes.icon)}></i>}
          type="link"

        />
        <Item
          value={data ? data.socials.twitter : null}
          label={'Twitter'}
          id="twitter"
          icon={<i aria-hidden="true" className={classNames("fab fa-twitter", classes.icon)}></i>}
          type="link"
        />
      </>
    )
  }
}

export default withStyles(contactStyles)(OverViews)
