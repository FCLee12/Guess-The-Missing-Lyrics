import * as React from 'react';
import { Box, Button, Card, CardContent, Typography, CardActionArea, Stack, Modal, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  DeleteIcon from '@mui/icons-material/Delete';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function UserSongList() {

    const dispatch = useDispatch();
    const history = useHistory();
    
    // stores the song list that displays on the user dashboard
    const songList = useSelector(store => store.songs);
    console.log('this is songList.songsReducer.data', songList.songsReducer.data);
    
    // Changes a song's status from false to true or true to false
        // true indicates the song can be seen by guest users
        // false indicates the song will not be viewable to guest users
        // issue is: requires refresh to reflect updated status
    const setActive = (boolean, id) => {
        console.log('setActive is running', boolean, id);
        // will need a dispatch to SAGA to do a put request to SERVER which will set the status from active = false to active = true
            // meaning the song will appear when a guest user uses a registered user's gameID
        dispatch({
            type: 'CHANGE_STATUS',
            payload: !boolean,
            id: id
        })
    }
    
    // need a dispatch call to SAGA to do a get request to SERVER/ROUTER who will pull data from DB then store it in a reducer
    useEffect(() => {
        dispatch({
            type: 'FETCH_SONGS'
        });
    }, []);

    // Changes Active Song in reducer
    const changeActiveSong = (object) => {
        console.log('changeActiveSong is running', object);

    }

    // ********** CARD EDIT BUTTON **********
    const handleEdit = (songObj) => {
        console.log('this is the songObj', songObj);
        dispatch({
            type: "SET_ACTIVE_SONG",
            payload: songObj
        })
        history.push(`/edit`);
    }
    // END ********** CARD EDIT BUTTON **********

    // ********** CARD DELETE BUTTON **********
    const handleDelete = (id) => {
        console.log('in handleDelete, see id', id);
        dispatch({
            type: 'DELETE_SONG',
            payload: id
        });
        // this closes the modal and resets the cardId
        handleClose();
    }

    // ----- For the DELETE CONFRIMATION MODAL -----
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 240,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        align: 'center'
    };
    
    const [open, setOpen] = React.useState(false);
    const [cardId, setCardId] = useState('');
    const handleOpen = (id) => {
        setOpen(true);
        setCardId(id);
    };
    const handleClose = () => {
        setOpen(false);
        setCardId('');
    };
    // END ********** CARD DELETE BUTTON **********

    return (
    <>
        {songList.songsReducer.data ?
            songList.songsReducer.data.map((song) => {
                return (<Card sx={{ maxWidth: 300, marginTop: '5px', marginBottom: '5px', border: "solid black 1px"}} key={song.id}>
                    <CardContent>
                        <CardActionArea onClick={() => setActive(song.status, song.id)}>
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
                                size="small"
                                color='success'>
                                Play
                            </Button>
                            <Button
                                variant="contained" 
                                endIcon={<EditNoteIcon />}
                                size="small"
                                onClick={() => handleEdit(song)}>
                                Edit
                            </Button>
                            <Button
                                variant="contained" 
                                endIcon={<DeleteIcon />}
                                size="small"
                                color="error"
                                onClick={() => handleOpen(song.id)}>
                                Delete
                            </Button>
                        </Stack>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Are you sure you want to delete this song?
                                </Typography>
                                <Grid container sx={{justifyContent: 'space-between', maxWidth: 240}}>
                                    <Button
                                        variant="contained" 
                                        endIcon={<DeleteIcon />}
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(cardId)}>
                                        Delete
                                    </Button>
                                    <Button
                                        variant="outlined" 
                                        endIcon={<CancelIcon />}
                                        size="small"
                                        color="info"
                                        onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Box>
                        </Modal>
                    </CardContent>
                </Card>
            )}) : <li><p>Loading</p></li>
        }
    </>
    );
      
}

export default UserSongList;