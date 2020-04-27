import React, { Component } from 'react';
import {
  ForumRounded,
  ImportContactsRounded,
  PeopleRounded,
  AssignmentLateRounded,
} from '@material-ui/icons';
import { purple, green, red, blue } from '@material-ui/core/colors';
import axios from 'axios/instance';

import StatisticItem from './StatisticItem';

class Statistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPosts: 0,
      totalNews: 0,
      totalUsers: 0,
      totalReports: 0,
    };
  }

  componentDidMount() {
    axios
      .get('/admin/dashboard')
      .then(res => {
        this.setState({
          totalPosts: res.data.total_posts,
          totalNews: res.data.total_news,
          totalUsers: res.data.total_users,
          totalReports: res.data.total_reports,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { totalPosts, totalNews, totalUsers, totalReports } = this.state;
    return (
      <>
        <StatisticItem
          icon={<ForumRounded />}
          color={purple}
          title='Total Posts'
          data={totalPosts}
          description="User's discussion"
        />
        <StatisticItem
          icon={<ImportContactsRounded />}
          color={blue}
          title='Total News'
          data={totalNews}
          description='Updated news in every rooms'
        />
        <StatisticItem
          icon={<PeopleRounded />}
          color={green}
          title='Total Users'
          data={totalUsers}
          description='Current active users'
        />
        <StatisticItem
          icon={<AssignmentLateRounded />}
          color={red}
          title='Total Reports'
          data={totalReports}
          description='Reports by users'
        />
      </>
    );
  }
}

export default Statistic;
