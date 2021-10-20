import Post from './Post';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import useStyles from './styles';
import { selectPosts } from './postsSlice';
export default function Posts({ setSelectedId }) {
  const classes = useStyles();
  const posts = useSelector(selectPosts);

  return (
   <>
    {
      posts.length === 0 
      ? <Typography variant="h5" color="white">No posts found. Start adding by using the form.</Typography>
      : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {
            posts.map(post => (
              <Grid item xs={12} sm={6} key={post.id}>
                <Post post={post} setSelectedId={setSelectedId} />
              </Grid>
            ))
          }
        </Grid>
      )
    }
   </>
  );
}