import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography, TextField } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function EditPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const lyricsToEdit = useSelector(store => store.songs)
  console.log('this is lyricsToEdit in EditPage', lyricsToEdit.lyricsToEditReducer.data);

  let songObj = lyricsToEdit.lyricsToEditReducer.data[0];
  const[localEditLyrics, setlocalEditLyrics] = useState(songObj.edited_lyrics);

  // const resetLyrics = () => {
    
  // }

  useEffect(() => {
    console.log('localEditLyrics changed!');
  }, [localEditLyrics])
  
  return (
    <>
      <Grid container sx={{flexDirection: "column", marginLeft: "8px"}}>
        <Typography variant='h5' align='center'>
          {songObj.title} 
        </Typography> 
        <Typography variant='h6' align='center'>
          {songObj.artist}
        </Typography>
        <TextField 
          label="songEditor"
          variant="filled"
          defaultValue={localEditLyrics}
          sx={{width: 300, marginTop: 2}}
          multiline
        />
        <Button 
            variant="contained" 
            endIcon={<SendIcon />}
            sx={{width: 300, marginTop: 2}}
            size="small">
            Submit
        </Button>
        <Button 
            variant="outlined" 
            endIcon={<SendIcon />}
            color="error"
            sx={{width: 300, marginTop: 2}}
            size="small"
            // onClick={resetLyrics}
            >
            Reset Lyrics
        </Button>
      </Grid>
    </>
  );
}

export default EditPage;
