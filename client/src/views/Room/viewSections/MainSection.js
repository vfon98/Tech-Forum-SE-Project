import React, { Component } from 'react';
import UserPost from './Main/UserPost';

import axios from '../../../axios/instance';

class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true
    };
  }

  componentDidMount() {
    axios
      .get('/posts')
      .then(res => {
        this.setState({
          posts: res.data.posts,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { posts } = this.state;
    return (
      <>
        {posts.map(post => (
          <UserPost key={post.id} post={post} />
        ))}
      </>
    );
  }
}

export default MainSection;
