import React, { Component } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import axios from 'axios/instance';

import { withStyles } from '@material-ui/styles';
import { secondaryColor } from 'assets/jss/main';

import NavBar from 'components/NavBar';
import RoomList from 'components/RoomList.js/RoomList';
import UserSidePanel from 'components/UserSidePanel/UserSidePanel';
import UserPost from '../Room/viewSections/Main/UserPost';
import { withRouter } from 'react-router-dom';
import Loading from 'components/Loading';

const postStyles = {
  roomWrapper: {
    backgroundColor: secondaryColor,
    paddingTop: '24px',
  },
};

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isLogin: null,
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    axios
      .get(`/posts/${params.id}`)
      .then(res => {
        console.log('res.data', res.data.post);
        this.setState({
          post: res.data.post,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { post } = this.state;

    return (
      <>
        <NavBar isLogin={state => this.setState({ isLogin: state })} />
        <Box className={classes.roomWrapper}>
          <Container>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <RoomList />
              </Grid>
              <Grid item sm={6}>
                {post ? <UserPost post={post} /> : <Loading />}
              </Grid>
              <Grid item sm={3}>
                <UserSidePanel />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default withStyles(postStyles)(withRouter(PostDetail));
