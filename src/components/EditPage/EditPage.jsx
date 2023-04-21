import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography, TextField } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function EditPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const editedSong = `When the visions around you Bring n!&x to your eyes And all that surrounds you Are secrets and lies  I'll be your n!&x I'll give you n!&x Keeping your faith when it's gone The one you should n!&x Was standing here all n!&x  And I will take  you in my arms And hold you right where you n!&x 'Til the day my n!&x is through  this I promise you This I n!&x you`

  return (
    <>
      <Grid container sx={{flexDirection: "column", marginLeft: "8px"}}>
        <Typography variant='h4' align='center'>
          Song Editor  
        </Typography> 
        <TextField 
          label="songEditor"
          variant="filled"
          defaultValue={editedSong}
          sx={{width: 300}}
          multiline
        />
        <Button 
            variant="contained" 
            endIcon={<SendIcon />}
            sx={{width: 300}}
            size="small">
            Submit
        </Button>
      </Grid>
    </>
  );
}

export default EditPage;
