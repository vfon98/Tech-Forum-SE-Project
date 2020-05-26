import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Dialog, DialogContent } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

import Login from '../views/Login/Login';
import Register from '../views/Register/Register';

const useStyles = makeStyles({
  root: {
    marginTop: '-5%',
    background: 'rgba(0,0,0,.7)',
  },
  dialogContent: {
    '@media (max-width: 600px)': {
      padding: 0
    }
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none',
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

const Popup = props => {
  const { type } = props;
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={type !== null}
        scroll='body'
        onClose={() => props.handlePopup(null)}
        className={classes.root}
        TransitionComponent={Transition}
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
        <DialogContent className={classes.dialogContent}>
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
