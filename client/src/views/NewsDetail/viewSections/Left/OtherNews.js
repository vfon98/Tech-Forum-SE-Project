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
  CardHeader,
} from '@material-ui/core';
import axios from '../../../../axios/instance';
import { withStyles } from '@material-ui/styles';
import otherNewsStyles from '../../../../assets/jss/otherNewsStyles';

const OneItem = props => {
  const { classes } = props;
  return (
    <ButtonBase className={classes.slideWrapper}>
      <Card title={props.header} className={classes.slideBg}>
        <CardActionArea>
          <CardMedia
            className='slick-image'
            component='img'
            image={props.thumbnail}
          />
          
          <CardContent className={classes.textWrapper}>
            <Typography className={classes.slideTitle}>
              {props.header}
            </Typography>
          </CardContent>
          <CardActions>
            <Avatar fontSize='small' style={{width: 30, height: 30}} />
              <small>by Vphong</small>
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
    };
  }

  componentDidMount() {
    axios
      .get('/news/random')
      .then(res => {
        this.setState({
          list: res.data.news,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const settings = {
      // dots: true,
      slidesToShow: 4,
      autoplay: true,
    };
    return (
      <div>
        <Typography className={classes.sectionHeader}>Other posts</Typography>

        <Slider {...settings}>
          {this.state.list.map(item => (
            <OneItem
              key={item._id}
              thumbnail={item.thumbnail}
              header={item.header}
              content={item.content}
              classes={classes}
            />
          ))}
        </Slider>
      </div>
    );
  }
}

export default withStyles(otherNewsStyles)(OtherNews);
