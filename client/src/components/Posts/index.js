import Post from './Post';
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import useStyles from './styles';

export default function Posts() {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  
  return (
   posts.length === 0 
    ? <CircularProgress /> 
    : (
      <Grid className={classes.container} container aignItems="stretch" spacing={3}>
        {
          posts.map(post => (
            <Grid item xs={12} sm={6} key={post.id}>
              <Post post={post} />
            </Grid>
          ))
        }
      </Grid>
    )
  );
}