import React, { Component } from 'react';
import {
  Card,
  Grid,
  CardMedia,
  Typography,
  ButtonBase,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { limitLine } from 'assets/jss/main';
import { Link } from 'react-router-dom';

const resutlStyles = {
  wrapper: {
    padding: '8px',
    marginTop: '8px',
    '&:hover': {
      boxShadow:
        '0px 0px 3px 1px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    },
  },
  thumbnail: {
    borderRadius: '2px',
    border: '1px solid lightblue',
  },
  resultHeader: {
    ...limitLine(2),
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  resultInfo: {
    ...limitLine(1),
    fontSize: '0.6rem',
  },
};

class SearchResult extends Component {
  render() {
    const { classes, result } = this.props;
    return (
      <ButtonBase component={Link} to={`/news/${result.id}`}>
        <Card className={classes.wrapper} title={result.header}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <CardMedia
                component='img'
                className={classes.thumbnail}
                image={result.thumbnail}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.resultHeader}>
                {result.header}
              </Typography>
              <Typography className={classes.resultInfo}>
                {result.user.display_name} posted in {result.room.name}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </ButtonBase>
    );
  }
}

export default withStyles(resutlStyles)(SearchResult);
