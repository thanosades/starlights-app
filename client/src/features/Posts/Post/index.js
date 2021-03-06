import { useDispatch } from 'react-redux';
import { removePost, likePost } from '../postsSlice';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useStyles from './styles';

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function Post({ post, setSelectedId }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const confirmPostDeletion = () => {
    const userResponse = window.confirm('Would you like to delete this?');
    if (userResponse) {
      dispatch(removePost(post.id))
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {dayjs(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size="small"
          onClick={() => setSelectedId(post.id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map(tag => ` #${tag}`)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post.id))}>
          <ThumbUpAltIcon fontSize="small" />Likes {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={confirmPostDeletion}
        >
          <DeleteIcon fontSize="small" />Delete</Button>
      </CardActions>
    </Card>
  );
}
