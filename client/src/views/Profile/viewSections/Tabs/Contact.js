import React, { Component } from 'react'
import Item from '../../view components/Item'
import { AlternateEmail, Call, Link } from '@material-ui/icons'
import List from '../../view components/List'
import axios from '../../../../axios/instance'
import classNames from 'classnames'
import { withStyles } from '@material-ui/styles'
import contactStyles from '../../view components/jss/Contact'

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  async componentDidMount() {
    await axios
      .get('/profile')
      .then(res => {
        this.setState({
          data: res.data.profile
        })
      })
  }

  render() {
    const { classes } = this.props;
    return (
      <>
      <h3>
        Contact Info
      </h3>
        <List
          label={'Email'}
          value={this.state.data ? this.state.data.contact.emails : null}
          id={'emails'}
          icon={<AlternateEmail />}
        />
        <Item
          value={this.state.data ? this.state.data.contact.phone : null}
          label={'Phone'}
          id="phone"
          icon={<Call />}
        />
        <Item
          value={this.state.data ? this.state.data.socials.facebook : null}
          label={'Facebook'}
          id="facebook"
          icon={<i aria-hidden="true" className={classNames('fab fa-facebook', classes.icon)}></i>}
          type="link"

        />
        <Item
          value={this.state.data ? this.state.data.socials.github : null}
          label={'Github'}
          id="github"
          icon={<i aria-hidden="true" className={classNames("fab fa-github", classes.icon)}></i>}
          type="link"

        />
        <Item
          value={this.state.data ? this.state.data.socials.instagram : null}
          label={'Instagram'}
          id="instagram"
          icon={<i aria-hidden="true" className={classNames("fab fa-instagram", classes.icon)}></i>}
          type="link"

        />
        <Item
          value={this.state.data ? this.state.data.socials.twitter : null}
          label={'Twitter'}
          id="twitter"
          icon={<i aria-hidden="true" className={classNames("fab fa-twitter", classes.icon)}></i>}
          type="link"
        />
      </>
    )
  }
}

export default withStyles(contactStyles)(Contact)
