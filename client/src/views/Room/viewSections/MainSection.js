import React, { Component } from 'react';
import {
  Paper,
  Card,
  CardContent,
  Avatar,
  CardHeader,
  IconButton,
  Divider,
  Typography,
  CardActions,
  Grid,
  CardMedia,
  Button,
  InputBase,
  FormControl,
  TextField,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Container,
  Input,
  Box,
  ListItemText,
  List,
  ListItem,
  ListItemAvatar,
  Collapse,
  Tooltip,
  Chip,
  Icon,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import {
  MoreHoriz,
  More,
  MoreVert,
  ThumbUp,
  ChatBubble,
  Image,
  Share,
  Chat,
  Send,
  Timer,
  AccessTimeTwoTone,
  Telegram,
  ImageOutlined,
  Report,
} from '@material-ui/icons';
import UserComment from './Main/UserComment';

class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isExpanded: false,
      isExpanded: true,
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.postWrapper}>
        <Card className={classes.bgPrimary}>
          <CardHeader
            avatar={<Avatar className={classes.avatarLg}>Ex</Avatar>}
            action={
              <IconButton className={classes.text}>
                <MoreVert />
              </IconButton>
            }
            title={
              <Box verticalAlign='middle'>
                <strong className={classes.userName}>Display name</strong>
                <span className={classes.secondaryText}>@example25</span>
              </Box>
            }
            subheader={
              <Box display='flex' className={classes.text}>
                <AccessTimeTwoTone className={classes.headerIcon} />
                <Typography component='span' className={classes.timeText}>
                  10 minutes ago
                </Typography>
              </Box>
            }
          />
          <Divider />
          {/* CONTENT SECTION */}
          <CardContent>
            <CardMedia component='img' image='https://placehold.it/400x200' />
            <Typography className={classes.postContent}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              consequuntur dicta non cum voluptate rerum, sed dolor aut debitis
              dolore ut incidunt dolorum? aliquid aliquam nesciunt quisquam
              aspernatur ipsam doloribus
            </Typography>
          </CardContent>
          <Divider />
          {/* REACT SECTION */}
          <CardActions>
            <Grid container className={classes.container}>
              <Grid item container justify='flex-start' sm={3}>
                <Button className={classes.btnLink} startIcon={<ThumbUp />}>
                  2 Likes
                </Button>
              </Grid>
              <Grid item container justify='center' sm={4}>
                <Button
                  className={classes.btnLink}
                  startIcon={<Chat />}
                  onClick={() =>
                    this.setState({ isExpanded: !this.state.isExpanded })
                  }
                >
                  3 Comments
                </Button>
              </Grid>
              <Grid item container justify='center' sm={4}>
                <Button className={classes.btnLink} startIcon={<Share />}>
                  5 Shares
                </Button>
              </Grid>
              <Grid item container justify='flex-end' sm={1}>
                <IconButton className={classes.btnLink}>
                  <Tooltip title='Report this post' arrow placement='top'>
                    <Report />
                  </Tooltip>
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
        {/* COLLAPSE SECTION */}
        <Collapse in={this.state.isExpanded} timeout='auto' unmountOnExit>
          <Divider />
          {/* COMMENT INPUT SECTION */}
          <Box py={1} className={classes.bgPrimary}>
            <Grid container className={classes.container} alignItems='center'>
              <Grid item sm={1}>
                <Avatar>P</Avatar>
              </Grid>
              <Grid item sm={11} container alignItems='center'>
                <FormControl fullWidth>
                  <TextField
                    className={classes.commentInput}
                    variant='outlined'
                    label='Enter your comment...'
                    size='small'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            color='primary'
                            style={{ marginRight: '-0.4em' }}
                          >
                            <Telegram />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          {/* COMMENT SECTION */}

          <UserComment />
          <UserComment />
        </Collapse>
      </div>
    );
  }
}

export default MainSection;
