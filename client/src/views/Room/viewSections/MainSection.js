import React, { Component } from 'react';
import UserPost from './Main/UserPost';

import axios from '../../../axios/instance';
import history from '../../../utils/history';
import Loading from '../../../components/Loading';

class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
    };
    // Bind fetchPosts to global
    window.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
    history.listen(() => {
      this.setState({ isLoading: true });
      this.fetchPosts();
    });
  }

  fetchPosts = () => {
    const { pathname } = history.location;
    axios
      .get('/posts' + pathname)
      .then(res => {
        this.setState({
          posts: res.data.posts,
          isLoading: false,
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { posts, isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <>
        {posts.map(post => (
          <UserPost key={post.id} post={post} />
        ))}
      </>
    );
  }
}

export default MainSection;
