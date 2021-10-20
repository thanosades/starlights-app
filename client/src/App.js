import { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import Posts from './features/Posts';
import { getPosts } from './features/Posts/postsSlice';
import Form from './components/Form';
import useStyles from './styles';

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [selectedId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Starlights</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container
            className={classes.mainContainer}
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setSelectedId={setSelectedId} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Form selectedId={selectedId} setSelectedId={setSelectedId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
