import Post from './Post';
import { useSelector } from 'react-redux';
import useStyles from './styles';

export default function Posts() {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  console.log(posts);
  
  return (
    <>
      <h1>Posts</h1>
      <Post />
      <Post />
    </>
  );
}