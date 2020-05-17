import React, { Component } from 'react';
import { CardActions, Grid, Button } from '@material-ui/core';
import { ReportRounded, ThumbUpRounded, Facebook } from '@material-ui/icons';
import { FacebookShareButton } from 'react-share';

import { withStyles } from '@material-ui/styles';
import ReportPopup from '../../../../components/ReportPopup';

const newsActionsStyles = {
  wrapper: {
    padding: '0 1rem',
    '@media (max-width: 600px)': {
      padding: '0 8px'
    },
  },
  btnLike: {
    textTransform: 'none',
  },
  btnShare: {
    textTransform: 'none',
    color: '#A2F6FF',
    whiteSpace: 'nowrap',
  },
  btnReport: {
    textTransform: 'none',
    '@media (max-width: 424px)': {
      margin: '16px -4px',
      fontSize: '0.8rem'
    },
  },
};

class NewsActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenReport: false,
    };
  }

  toggleReportPopup = () => {
    this.setState({
      isOpenReport: !this.state.isOpenReport,
    });
  };

  render() {
    const { classes, likesNum } = this.props;

    return (
      <CardActions className={classes.wrapper}>
        <Grid container>
          <Grid container sm xs={9} justify='flex-start' spacing={1}>
            <Grid item>
              <Button
                className={classes.btnLike}
                color='primary'
                variant='contained'
                startIcon={<ThumbUpRounded className={classes.blueText} />}
                onClick={this.props.toggleLike}
              >
                {likesNum} Likes
              </Button>
            </Grid>
            <Grid item>
              <FacebookShareButton url='google.com'>
                <Button
                  className={classes.btnShare}
                  color='inherit'
                  variant='outlined'
                  startIcon={<Facebook />}
                >
                  Share this post
                </Button>
              </FacebookShareButton>
            </Grid>
          </Grid>
          <Grid container sm xs={3} justify='flex-end'>
            <Button
              className={classes.btnReport}
              color='secondary'
              variant='outlined'
              startIcon={<ReportRounded />}
              onClick={this.toggleReportPopup}
            >
              Report
            </Button>
            {/* Report Popup */}
            <ReportPopup
              isOpen={this.state.isOpenReport}
              onClose={this.toggleReportPopup}
              newsId={this.props.newsId}
              type='news'
            />
          </Grid>
        </Grid>
      </CardActions>
    );
  }
}

export default withStyles(newsActionsStyles)(NewsActions);
