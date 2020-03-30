import React, { Component } from 'react';
import UserPost from './Main/UserPost';

import axios from '../../../axios/instance';
import Loading from '../../../components/Loading';

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
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { posts, isLoading } = this.state;
    return isLoading ? <Loading /> : (
      <>
        {posts.map(post => (
          <UserPost key={post.id} post={post} />
        ))}
      </>
    );
  }
}

export default MainSection;
