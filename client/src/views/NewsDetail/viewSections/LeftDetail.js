import React, { Component } from 'react';
import {
  Paper,
  Typography,
  Card,
  Divider,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import newsPlaceholder from 'assets/img/news-placeholder.jpg';
import axios from '../../../axios/instance';

import newsDetailStyles from '../../../assets/jss/newsDetailStyles';
import { withStyles } from '@material-ui/styles';

import NewsBreadcrumbs from './Left/NewsBreadcrumbs';
import NewsHeader from './Left/NewsHeader';
import NewsActions from './Left/NewsActions';
import UserComment from '../../Room/viewSections/Main/UserComment';

class LeftDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {},
      commentsNum: 0,
      likesNum: 0,
      viewsNum: 0,
    };
  }

  componentDidMount() {
    axios
      .get('/news/5e7b290e292573070b0435c1')
      .then(res => {
        const { news } = res.data;
        this.setState({
          news: news,
          commentsNum: news.comments.length,
          likesNum: news.likes.length,
          viewsNum: news.views,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { news, likesNum, commentsNum, viewsNum } = this.state;

    return (
      <>
        <Card className={classes.secondaryBg} raised>
          <Paper elevation={3} className={classes.leftWrapper}>
            <NewsBreadcrumbs room={news.room} />

            <NewsHeader
              news={news}
              commentsNum={commentsNum}
              viewsNum={viewsNum}
            />
            <Divider />

            <CardContent>
              <CardMedia
                className={classes.newsThumbnail}
                component='img'
                image={news.thumbnail ? news.thumbnail : newsPlaceholder}
              />
              <Divider />
              <Typography
                className={classes.newsContent}
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </CardContent>

            <NewsActions likesNum={likesNum} />
          </Paper>
        </Card>
        <Paper
          elevation={2}
          className={classes.leftWrapper}
          style={{ marginTop: '0.5em' }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio sint
          perferendis deserunt. Saepe aliquid tempora quasi, consectetur eaque
          quae neque cum dolore minus officiis atque nulla maxime, eveniet
          commodi voluptatum?
        </Paper>
        <Paper
          elevation={2}
          className={classes.leftWrapper}
          style={{ marginTop: '0.5em' }}
        >
          <UserComment />
        </Paper>
      </>
    );
  }
}

export default withStyles(newsDetailStyles)(LeftDetail);
