import * as React from 'react';
import { Card, CardContent, Typography, CardActionArea, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  DeleteIcon from '@mui/icons-material/Delete';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { Button, Stack } from '@mui/material/';

function UserSongList() {

    const dispatch = useDispatch();
    const songList = useSelector(store => store.songsReducer);
    console.log('this is songList.data', songList.data);
    
    const setActive = (event) => {
        console.log('setActive is running');
        // will need a dispatch to SAGA to do a put request to SERVER which will set the status from active = false to active = true
            // meaning the song will appear when a guest user uses a registered user's gameID
      }
    
      // need a dispatch call to SAGA to do a get request to SERVER/ROUTER who will pull data from DB then store it in a reducer
      useEffect(() => {
        dispatch({
            type: 'FETCH_SONGS'
        });
      }, []);
    
      return (
        <>
            {songList.data ?
                songList.data.map((song) => {
                    return (<Card sx={{ maxWidth: 315 }} key={song.id}>
                        <CardContent>
                            <CardActionArea onClick={setActive}>
                                <Typography variant='h6'>
                                    Song Title: {song.title}
                                </Typography>
                                <Typography>
                                    Song Artist: {song.artist}
                                </Typography>
                            </CardActionArea>
                            <Stack direction="row" spacing={1}>
                                <Button 
                                    variant="contained" 
                                    endIcon={<SportsEsportsIcon />}
                                    size="small">
                                    Play
                                </Button>
                                <Button
                                    variant="contained" 
                                    endIcon={<EditNoteIcon />}
                                    size="small">
                                    Edit
                                </Button>
                                <Button
                                    variant="contained" 
                                    endIcon={<DeleteIcon />}
                                    size="small">
                                    Delete
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card> 
                )}) : <li><p>Loading</p></li>
            }
        </>
      );
      
}

export default UserSongList;