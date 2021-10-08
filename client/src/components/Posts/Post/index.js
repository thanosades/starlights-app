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
        <Typography variant="subtitle1" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAltIcon fontSize="small" />Like {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => {}}>
          <DeleteIcon fontSize="small" />Delete</Button>
      </CardActions>
    </Card>
  );
}