import { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts'
import FileBase from 'react-file-base64';
import useStyles from './styles';

const defaultData = {
  creator: '',
  title: '',
  message: '',
  tags: '',
  selectedFile: ''
};

export default function Form({ selectedId, setSelectedId }) {  
  const [postData, setPostData] = useState(defaultData);
  const post = useSelector(state => 
    selectedId !== null ? state.posts.find(post => post.id === selectedId) : null);
  const dispatch = useDispatch();
  const classes = useStyles();

  const clearForm = useCallback(() => {
    setPostData(defaultData);
    setSelectedId(null);
    document.querySelector('input[type="file"]').value = '';
  }, [setSelectedId]);

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post, clearForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedId) {
      dispatch(updatePost(selectedId, postData));
    } else {
      dispatch(createPost(postData));
    }
  };

  const handleCreatorChange = (e) => {
    setPostData({ ...postData, creator: e.target.value });
  };

  const handleTitleChange = (e) => {
    setPostData({ ...postData, title: e.target.value });
  };

  const handleMessageChange = (e) => {
    setPostData({ ...postData, message: e.target.value });
  };

  const handleTagsChange = (e) => {
    setPostData({ ...postData, tags: e.target.value });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Add A Highlight</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={handleCreatorChange}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleTitleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={handleMessageChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={handleTagsChange}
        />
        <div className={classes.fileInput}>
          <FileBase 
            type="file"
            multiple={false}
            onDone={({ base64 }) => 
              setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >Submit</Button>
        <Button 
          variant="contained" 
          color="secondary"
          size="small"
          onClick={clearForm}
          fullWidth
        >Clear</Button>
      </form>
    </Paper>
  );
}