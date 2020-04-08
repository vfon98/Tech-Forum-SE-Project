import React, { Component } from 'react';
import Slider from 'react-slick';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  ButtonBase,
  CardActionArea,
  CardActions,
  Avatar,
  Grid,
  Divider,
} from '@material-ui/core';
import { VisibilityTwoTone, EventAvailableTwoTone } from '@material-ui/icons';
import axios from '../../../../axios/instance';
import {
  parseShortDateFrom,
  parseStringFrom,
} from '../../../../utils/converter';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';

import { withStyles } from '@material-ui/styles';
import otherNewsStyles from '../../../../assets/jss/otherNewsStyles';

const OneItem = props => {
  const { classes, news } = props;

  return (
    <ButtonBase
      className={classes.slideWrapper}
      component={Link}
      to={`/news/${news._id}`}
    >
      <Card title={news.header} className={classes.slideBg}>
        <CardActionArea>
          <CardMedia
            className='slick-image'
            component='img'
            image={news.thumbnail}
          />
          <CardContent className={classes.textWrapper}>
            <Typography className={classes.slideTitle}>
              {news.header}
            </Typography>
          </CardContent>
          <CardActions>
            <Avatar src={news.user.avatar} className={classes.avatarSm} />
            <small>
              by{' '}
              <span className={classes.displayName}>
                {news.user.display_name}
              </span>
            </small>
          </CardActions>
          <Divider />
          <CardActions>
            <Grid container justify='space-between'>
              <Grid item className={classes.actionWrapper}>
                <EventAvailableTwoTone
                  fontSize='small'
                  className={classes.actionIcon}
                />
                {parseShortDateFrom(news.created_at)}
              </Grid>
              <Grid item className={classes.actionWrapper}>
                <VisibilityTwoTone
                  fontSize='small'
                  className={classes.actionIcon}
                />
                {parseStringFrom(news.views)}
              </Grid>
            </Grid>
          </CardActions>
        </CardActionArea>
      </Card>
    </ButtonBase>
  );
};

class OtherNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get('/news/random')
      .then(res => {
        this.setState({
          list: res.data.news,
          isLoading: false,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;
    const settings = {
      // dots: true,
      slidesToShow: 4,
      autoplay: true,
    };
    return isLoading ? (
      <Loading />
    ) : (
      <div>
        <Typography className={classes.sectionHeader}>Other posts</Typography>

        <Slider {...settings}>
          {this.state.list.map(item => (
            <OneItem key={item._id} news={item} classes={classes} />
          ))}
        </Slider>
      </div>
    );
  }
}

export default withStyles(otherNewsStyles)(OtherNews);
