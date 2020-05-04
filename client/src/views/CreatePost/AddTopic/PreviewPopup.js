import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Divider,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { primaryColor, textColor } from 'assets/jss/main';

const popupStyles = {
  popup: {
    background: 'transparent',
    transform: ' translateY(-2em)',
  },
  bgDark: {
    backgroundColor: primaryColor,
    color: textColor,
  },
  content: {
    // paddingTop: '1em',
    paddingBottom: '1em',
    wordWrap: 'break-word'
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

class PreviewPopup extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.onClose}
        scroll='body'
        TransitionComponent={Transition}
        PaperProps={{
          classes: {
            root: classes.popup,
          },
        }}
      >
        <div className={classes.bgDark}>
          <DialogTitle>{this.props.header || 'Empty'}</DialogTitle>
          <Divider />
          <DialogContent
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: this.props.content || `Enter something...`,
            }}
          />
        </div>
      </Dialog>
    );
  }
}

export default withStyles(popupStyles)(PreviewPopup);
