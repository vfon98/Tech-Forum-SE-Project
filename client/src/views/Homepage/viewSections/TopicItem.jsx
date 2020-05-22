import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import hotTopicStyles from 'assets/jss/hotTopicStyles';
import { Grid, Card, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import axios from 'axios/instance';
import { parseTextFromHTML } from 'utils/converter';
import Loading from 'components/Loading';

class TopicItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: {},
    };
  }

  componentDidMount() {
    const { topicName } = this.props;
    axios
      .get(`/posts/room/${topicName}/hot`)
      .then(res => {
        console.log(res.data);
        this.setState({
          topic: res.data,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { topic } = this.state;

    return (
      <Grid item sm={6}>
        <Card className={classes.cardBackground}>
          <div className={classes.cardHeader}>
            <img className={classes.img} src={topic.room && topic.room.image} />
            <p className={classes.cardTitle}>{topic.room && topic.room.name}</p>
          </div>
          <div className={classes.content}>
            {topic.posts ? (
              topic.posts.map(post => (
                <Typography
                  component={Link}
                  to={`/posts/${post.id}`}
                  key={post.id}
                  className={classes.link}
                  dangerouslySetInnerHTML={{
                    __html: parseTextFromHTML(post.content),
                  }}
                ></Typography>
              ))
            ) : (
              <Loading />
            )}
          </div>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(hotTopicStyles)(TopicItem);
