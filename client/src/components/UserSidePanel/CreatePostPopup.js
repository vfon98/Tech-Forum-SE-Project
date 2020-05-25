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
  postBtn: {
    backgroundColor: lightBlueColor,
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

class CreatePostPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  createPost = () => {
    const { params } = this.props.match;
    axios
      .post('/posts', {
        roomName: params.name,
        content: this.state.content,
      })
      .then(() => {
        // Refresh posts
        window.fetchPosts();
        this.props.onClose();
      })
      .catch(err => {
        console.log({ err });
        alert('error');
      });
  };

  getData = data => {
    this.setState({
      content: data,
    });
  };

  render() {
    const { classes } = this.props;
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
          <DialogTitle className={classes.title}>Create your post</DialogTitle>
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
            <CKEditor height={150} getData={this.getData} />
          </DialogContent>
          <Divider />
          <DialogActions className={classes.actionWrapper}>
            <Button
              variant='outlined'
              className={classes.postBtn}
              startIcon={<PostAddRounded />}
              size='large'
              fullWidth
              onClick={this.createPost}
            >
              Post now
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(popupStyles)(withRouter(CreatePostPopup));
