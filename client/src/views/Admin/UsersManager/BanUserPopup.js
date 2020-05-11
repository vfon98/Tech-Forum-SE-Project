import React, { Component } from 'react';
import {
  Dialog,
  Slide,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  TextField,
  CardActions,
  Button,
  Divider,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import { getIdentifier } from 'utils/userIdentifier';
import { getCurrentTime, isValidTime } from 'utils/converter';
import axios from 'axios/instance';

const popupStyles = {
  wrapper: {},
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& button': {
      textTransform: 'none',
    },
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

class BanUserPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      hasError: false,
    };
  }

  handleChangeDate = e => {
    this.setState({
      date: e.target.value,
      hasError: isValidTime(e.target.value),
    });
  };

  handleBanUser = id => {
    axios
      .post('admin/ban/user', {
        userId: id,
        expiredDate: this.state.date,
      })
      .then(() => {
        // refresh table after ban
        window.fetchUsers();
        window.fetchBanned();
        this.props.onClose();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { user, classes } = this.props;
    const { hasError } = this.state;

    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
        className={classes.wrapper}
      >
        <Card>
          <CardHeader
            avatar={<Avatar src={user ? user.avatar : ''} />}
            title={user ? user.display_name : 'Loading'}
            subheader={getIdentifier(user.email)}
          />
          <Divider />
          <CardContent>
            <TextField
              type='datetime-local'
              label='Ban until'
              helperText={hasError ? 'Invalid date' : ''}
              error={hasError}
              defaultValue={getCurrentTime()}
              onChange={this.handleChangeDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CardContent>
          <CardActions className={classes.btnWrapper}>
            <Button
              variant='outlined'
              color='primary'
              disabled={hasError}
              onClick={() => this.handleBanUser(user._id)}
            >
              OK
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={this.props.onClose}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    );
  }
}

export default withStyles(popupStyles)(BanUserPopup);
