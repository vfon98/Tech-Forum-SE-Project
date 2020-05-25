import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import Header from './viewComponent/Header';
import axios from 'axios/instance'
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { getUser } from 'utils/session'
import MainSection from './viewComponent/MainSection'

class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: sessionStorage.user ? true : false,
      permission: 'view',
      userId: null
    }
  }
  componentDidMount() {
    let queryID = window.location.pathname.split('/')[2]

    if (!queryID || queryID == '' || queryID == getUser()._id) {

      this.setState({
        permission: 'edit',
      })
    }

    if (!queryID) {
      queryID = getUser()._id
    }

    this.setState({
      userId: queryID
    })

    axios.get(`/profile/${queryID}`)
      .then(response => {
        let res = response.data.user
        this.setState({
          data: {
            avatar: res.avatar,
            createOn: res.created_at,
            displayName: res.display_name,
            status: res.status,
            job: response.data.user.profile?.overview.job,
            posts: res.posts
          }
        })
      })
  }


  render() {
    return (
      <div>
        <ReactNotification />
        <NavBar isLogin={state => this.setState({ isLogin: state })} />
        <Header
          data={this.state.data ? this.state.data : null}
          permission={this.state.permission}
        />
        
        <MainSection
          permission={this.state.permission}
          userId={this.state.userId}
          userPosts={this.state.data ? this.state.data.posts : null}
        />
      </div>
    )
  }
}

export default Wall
