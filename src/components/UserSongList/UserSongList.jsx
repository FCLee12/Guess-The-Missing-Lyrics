import * as React from 'react';
import { Box, Button, Card, CardContent, createTheme, Typography, CardActionArea, Stack, Modal, Grid, ThemeProvider } from '@mui/material';
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

    const user = useSelector((store) => store.user);
    
    // stores the song list that displays on the user dashboard
    const songList = useSelector(store => store.songs);
    // console.log('this is songList.songsReducer.data', songList.songsReducer.data);

    const theme = createTheme({
        palette: {
          type: 'dark',
          primary: {
            main: '#ffb300',
            contrastText: 'rgba(0, 0, 0, 0.87)'
          },
          secondary: {
            main: '#619bb9',
            light: 'rgb(128, 175, 199)',
            dark: 'rgb(67, 108, 129)',
            contrastText: '#fff'
          },
          background: {
            default: '#252525',
            paper: '#424242'
          },
          text: {
            primary: '#fbf7f7',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
            hint: 'rgba(255, 255, 255, 0.5)'
          },
        }
    });
    
    // ********** PLAY BUTTON **********

    const handlePlay = (songObj) => {
        console.log('this is the songObj in handlePlay', songObj);
        dispatch({
            type: "SET_ACTIVE_SONG",
            payload: songObj
        })
        history.push(`/play`);
    }

    // END ********** PLAY BUTTON **********

    // ***** Changes if song is active *****
    // Changes a song's status from false to true or true to false
        // true indicates the song can be seen by guest users
        // false indicates the song will not be viewable to guest users
        // issue is: requires refresh to reflect updated status
    const setActive = (boolean, id) => {
        console.log('setActive is running', boolean, id);
        if(user.id) {
        // will need a dispatch to SAGA to do a put request to SERVER which will set the status from active = false to active = true
            // meaning the song will appear when a guest user uses a registered user's gameID
        dispatch({
            type: 'CHANGE_STATUS',
            payload: !boolean,
            id: id
        })
        setIsActive(!isActive);
        }
    }

    const [isActive, setIsActive] = useState(false);

    // END ***** Changes if song is active ***** 
    
    // need a dispatch call to SAGA to do a get request to SERVER/ROUTER who will pull data from DB then store it in a reducer
    useEffect(() => {
        if(user.id) {
            dispatch({
                type: 'FETCH_SONGS'
            });
        }
    }, [isActive]);

    // ********** CARD EDIT BUTTON **********
    const handleEdit = (songObj) => {
        console.log('this is the songObj in handleEdit', songObj);
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
        <ThemeProvider theme={theme}>
        {songList.songsReducer.length ?
            songList.songsReducer.map((song) => {
                return (
                <Card sx={{maxWidth: 300, marginTop: '5px', marginBottom: '5px', border: `solid ${song.status ? "limegreen" : "lightgrey"} 4px`}} key={song.id}>
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
                                color='success'
                                onClick={() => handlePlay(song)}>
                                Play
                            </Button>
                            {user.id ? 
                            <>
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
                            </> : <>
                                <Button
                                    disabled
                                    variant="contained" 
                                    endIcon={<EditNoteIcon />}
                                    size="small"
                                    onClick={() => handleEdit(song)}>
                                    Edit
                                </Button> 
                                <Button
                                    disabled
                                    variant="contained" 
                                    endIcon={<DeleteIcon />}
                                    size="small"
                                    color="error"
                                    onClick={() => handleOpen(song.id)}>
                                    Delete
                                </Button> 
                            </>}
                        </Stack>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" color='white'>
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
                                        color="primary"
                                        onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Box>
                        </Modal>
                    </CardContent>
                </Card>
            )}): <p>Loading</p>
        }
        </ThemeProvider> 
    </>
    );
      
}

export default UserSongList;