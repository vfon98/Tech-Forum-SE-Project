import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  btn: {
    textTransform: 'none',
  },
  actionBox: {
    paddingTop: 0,
    paddingBottom: 4,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ConfirmPopup = props => {
  const classes = useStyles();

  const handleYesOption = () => {
    props.handleClose('yes');
  };

  const handleNoOption = () => {
    props.handleClose('no');
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <DialogContent>Are you seriously want to delete it?</DialogContent>
      <DialogActions className={classes.actionBox}>
        <Button className={classes.btn} onClick={handleYesOption}>
          Yes
        </Button>
        <Button className={classes.btn} onClick={handleNoOption}>
          No, bring me back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmPopup;
