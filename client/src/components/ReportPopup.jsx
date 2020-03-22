import React, { Component } from 'react';
import {
  Dialog,
  DialogContent,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  DialogActions,
  Button,
  Checkbox,
  TextField,
} from '@material-ui/core';
import { Slide } from '@material-ui/core';
import axios from '../axios/instance';

import ReportPopupStyles from '../assets/jss/ReportPopupStyles';
import { withStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const reportReasons = [
  {
    id: 1,
    isChecked: false,
    label: 'Spam',
  },
  {
    id: 2,
    isChecked: false,
    label: 'Hateful, violent or inappropriate content',
  },
  {
    id: 3,
    isChecked: false,
    label: 'Software copyright infrigement',
  },
  {
    id: 4,
    isChecked: false,
    label: 'Wrong community',
  },
  {
    id: 5,
    isChecked: false,
    label: 'Rude words',
  },
  {
    id: 6,
    isChecked: false,
    label: 'Breaking community rules',
  },
  {
    id: 7,
    isChecked: false,
    label: 'Other',
  },
];

const StyledCheckbox = withStyles({
  root: {
    color: green[500],
    '&:checked': {
      color: green[600],
    },
  },
})(props => <Checkbox color='default' {...props} />);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

class ReportPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: reportReasons,
      info: '',
    };
  }

  handleCheckboxId = id => {
    const { items } = this.state;
    // Change state of checkbox on click
    const newItems = items.map(item => {
      if (item.id === id) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });

    this.setState({
      items: newItems,
    });
  };

  handleSendReport = () => {
    const { items, info } = this.state;
    const selectedLabels = this.getSelectedLabelsFrom(items);
    if (selectedLabels.length <= 0) {
      alert('Please choose at least one reasons');
    }
    console.log('selectedItems', selectedLabels, info);
    // Post to API
    axios
      .post('/reports', {
        types: selectedLabels,
        content: info,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  getSelectedLabelsFrom = items => {
    return items
      .filter(item => {
        if (item.isChecked) {
          return item;
        }
      })
      .map(item => {
        return item.label;
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Choose reason(s)</FormLabel>
            <FormGroup>
              {this.state.items.map(item => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <StyledCheckbox
                      checked={item.isChecked}
                      onChange={() => this.handleCheckboxId(item.id)}
                    />
                  }
                  label={item.label}
                />
              ))}
            </FormGroup>
          </FormControl>
          <FormGroup>
            <FormLabel className={classes.textareaLabel}>
              Additional infomation
            </FormLabel>
            <TextField
              variant='outlined'
              size='small'
              placeholder='Write something...'
              multiline
              value={this.state.info}
              onChange={e => this.setState({ info: e.target.value })}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSendReport}>Send</Button>
          <Button onClick={this.props.onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(ReportPopupStyles)(ReportPopup);
