import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Dialog, DialogContent } from '@material-ui/core';

import Login from '../views/Login/Login';
import Register from '../views/Register/Register';

const useStyles = makeStyles({
  root: {
    marginTop: '-5%',
    background: 'rgba(0,0,0,.7)',
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none',
  },
});

const Popup = props => {
  const { type } = props;
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={true}
        scroll='body'
        onClose={() => props.handlePopup(null)}
        className={classes.root}
        BackdropProps={{
          classes: {
            root: classes.root,
          },
        }}
        PaperProps={{
          classes: {
            root: classes.paper,
          },
        }}
      >
        <DialogContent>
          {type == 'login' ? (
            <Login handlePopup={props.handlePopup} />
          ) : type == 'register' ? (
            <Register handlePopup={props.handlePopup} />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Popup;
