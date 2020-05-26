import React, { Component } from 'react';
import {
  Dialog,
  DialogContent,
  Slide,
  DialogTitle,
  DialogActions,
  Button,
  Divider,
  Avatar,
  Box,
} from '@material-ui/core';
import CKEditor from '../../views/CreatePost/CKEditor';
import axios from 'axios/instance';

import { withStyles } from '@material-ui/styles';
import {
  secondaryColor,
  orangeColor,
  textColor,
  darkGreen,
  lightBlueColor,
  textSecondaryColor,
} from '../../assets/jss/main';
import { PostAddRounded } from '@material-ui/icons';
import { getUser } from '../../utils/session';
import { getIdentifier } from '../../utils/userIdentifier';
import { withRouter } from 'react-router-dom';

const popupStyles = {
  paper: {
    background: 'transparent',
  },
  bgDark: {
    backgroundColor: secondaryColor,
    color: textColor,
  },
  title: {
    color: 'inherit',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  actionWrapper: {
    paddingLeft: '24px',
    paddingRight: '24px',
  },
  updateBtn: {
    backgroundColor: orangeColor,
    color: textColor,
    textTransform: 'none',
    marginBottom: '0.1em',
    '&:hover': {
      backgroundColor: '#006eff',
    },
  },
  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    fontWeight: 700,
    '& small': {
      color: textSecondaryColor,
      fontStyle: 'italic',
      marginLeft: '4px',
      fontWeight: 550,
    },
  },
  avatar: {
    marginRight: '8px',
    backgroundColor: darkGreen,
    border: `2px solid ${lightBlueColor}`,
  },
  '@media (max-width: 600px)': {
    contentWrapper: {
      padding: '8px',
    },
    actionWrapper: {
      padding: '8px'
    },
    title: {
      padding: '8px'
    }
  },
};

const Transition = React.forwardRef(function Transion(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

class UpdatePostPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      postContent: '',
    };
  }

  componentDidMount() {
    this.getPostContent();
  }

  updatePost = () => {
    const postId = this.props.postId;
    console.log('postId', postId);
    axios
      .put(`/posts/${postId}`, {
        //roomName: params.name,
        content: this.state.content,
      })
      .then(() => {
        window.fetchPosts();
        this.props.onClose();
      })
      .catch(err => {
        console.log({ err });
        alert('update error');
      });
  };

  getPostContent = () => {
    const postId = this.props.postId;
    axios
      .get(`/posts/${postId}`)
      .then(response => {
        var postContent = response.data.post.content;
        //console.log('postcontent', postContent);
        this.setState({
          postContent: postContent,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getData = data => {
    this.setState({
      content: data,
    });
  };

  render() {
    const { classes, postId } = this.props;
    const user = getUser();

    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.onClose}
        scroll='body'
        maxWidth='md'
        TransitionComponent={Transition}
        PaperProps={{
          classes: {
            root: classes.paper,
          },
        }}
      >
        <div className={classes.bgDark}>
          <DialogTitle className={classes.title}>Update your post</DialogTitle>
          <Divider />
          <DialogContent className={classes.contentWrapper}>
            <Box className={classes.avatarWrapper}>
              <Avatar
                className={classes.avatar}
                src={user ? user.avatar : ''}
              />
              {user ? user.display_name : 'Display name'}
              <small>{user && getIdentifier(user.email)}</small>
            </Box>

            <CKEditor
              height={150}
              getData={this.getData}
              postId={postId}
              postContent={this.state.postContent}
            />
          </DialogContent>
          <Divider />
          <DialogActions className={classes.actionWrapper}>
            <Button
              variant='outlined'
              className={classes.updateBtn}
              startIcon={<PostAddRounded />}
              size='large'
              fullWidth
              onClick={this.updatePost}
            >
              Update now
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(popupStyles)(withRouter(UpdatePostPopup));
