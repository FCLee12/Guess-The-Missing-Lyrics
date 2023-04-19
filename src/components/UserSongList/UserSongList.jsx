import * as React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
        <ul>
            {songList.data ?
                songList.data.map((song) => {
                    return (<Card sx={{ maxWidth: 300 }}>
                        <CardContent>
                            <CardActionArea onClick={setActive}>
                                <Typography>
                                    Song Title: {song.title}
                                </Typography>
                                <Typography>
                                    Song Artist: {song.artist}
                                </Typography>
                            </CardActionArea>
                            <Typography variant="body2" color="text.secondary">
                                There will be some song lyrics that go here
                            </Typography>
                        </CardContent>
                    </Card> 
                )}) : <li><p>Loading</p></li>
            }
        </ul>
      );
      
}

export default UserSongList;