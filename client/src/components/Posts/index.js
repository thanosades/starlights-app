import Post from './Post';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import useStyles from './styles';

export default function Posts() {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  
  return (
   <>
    {
      posts.length === 0 
      ? <Typography variant="h6">No posts found. Start adding by using the form.</Typography>
      : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {
            posts.map(post => (
              <Grid item xs={12} sm={6} key={post.id}>
                <Post post={post} />
              </Grid>
            ))
          }
        </Grid>
      )
    }
   </>
  );
}