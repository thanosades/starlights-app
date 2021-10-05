import { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts'
import FileBase from 'react-file-base64';
import useStyles from './styles';

export default function Form() {
  const defaultData = {
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  };

  const [postData, setPostData] = useState(defaultData);

  const dispatch = useDispatch();
  const classes = useStyles();

  const clearForm = () => {
    setPostData(defaultData);
    document.querySelector('input[type="file"]').value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
    clearForm();
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