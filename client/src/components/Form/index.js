import { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';

export default function Form() {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });

  const classes = useStyles();

  const clearForm = () => {
    // TO BE IMPLEMENTED
  };

  const handleSubmit = () => {
    // TO BE IMPLEMENTED
  };

  const handleCreatorChange = (e) => {
    setPostData({ ...postData, creator: e.target.value });
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
          value={postData.creator}
          onChange={handleCreatorChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.creator}
          onChange={handleCreatorChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.creator}
          onChange={handleCreatorChange}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64) => setPostData({ ...postData, selectedFile: base64 })}
          />
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