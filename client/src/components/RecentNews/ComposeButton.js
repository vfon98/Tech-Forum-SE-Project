import React from 'react';
import { Button } from '@material-ui/core';
import { BorderColor } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import history from 'utils/history'

import { makeStyles } from '@material-ui/styles';
import { textColor, orangeColor } from 'assets/jss/main';

const useStyles = makeStyles({
  btn: {
    backgroundColor: orangeColor,
    textTransform: 'none',
    borderRadius: '999px',
    color: textColor,
    padding: '0.3em 1.5em',
  }
})

function ComposeButton() {
  const classes = useStyles();

  return (
    <Button
      component={Link}
      to={`${history.location.pathname}/create`}
      variant='extended'
      size='small'
      startIcon={<BorderColor />}
      className={classes.btn}
    >
      Compose a news
    </Button>
  );
}

export default ComposeButton;
