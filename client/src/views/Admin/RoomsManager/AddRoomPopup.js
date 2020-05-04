import React, { Component } from 'react';
import {
  Dialog,
  DialogContent,
  Slide,
  DialogTitle,
  TextField,
  Divider,
  InputBase,
  Grid,
  Typography,
  DialogActions,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import axios from 'axios/instance';

const inputStyles = {
  contentWrapper: {},
  input: {
    width: '100%',
    marginTop: '12px',
    marginBottom: '12px',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  inputFile: {
    fontSize: '0.8rem',
    marginBottom: '12px',
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

class AddRoomPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: null,
      description: null,
      thumbnai: null,
      uploading: false,
    };
  }

  handleCreateRoom = () => {
    this.setState({ uploading: true });
    const { roomName, description, thumbnail } = this.state;
    const body = new FormData();
    body.append('roomName', roomName);
    body.append('description', description);
    body.append('thumbnail', thumbnail);

    axios
      .post('/rooms', body, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then(() => {
        this.setState({ uploading: false });
        this.props.onClose();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
        scroll='body'
      >
        <DialogTitle>Create a new room</DialogTitle>
        <Divider />
        <DialogContent className={classes.contentWrapper}>
          <Grid>
            <TextField
              className={classes.input}
              label='Room name'
              variant='outlined'
              size='small'
              InputLabelProps={{ shrink: true }}
              onChange={e =>
                this.setState({
                  roomName: e.target.value,
                })
              }
              required
            />
          </Grid>
          <Grid>
            <TextField
              className={classes.input}
              label='Description (optional)'
              variant='outlined'
              size='small'
              multiline
              InputLabelProps={{ shrink: true }}
              onChange={e =>
                this.setState({
                  description: e.target.value,
                })
              }
            />
          </Grid>
          <Grid>
            <Typography className={classes.label}>Thumbnail image</Typography>
            <InputBase
              className={classes.inputFile}
              type='file'
              margin='dense'
              onChange={e => {
                this.setState({
                  thumbnail: e.target.files[0],
                });
              }}
            />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={this.handleCreateRoom} disabled={this.state.uploading}>
            {this.state.uploading ? <CircularProgress size={20} color='secondary' /> : 'OK'}
          </Button>
          <Button onClick={this.props.onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(inputStyles)(AddRoomPopup);
