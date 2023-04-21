import * as React from 'react';
import { Box, Button, Card, CardContent, Typography, CardActionArea, Stack, Modal, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  DeleteIcon from '@mui/icons-material/Delete';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CancelIcon from '@mui/icons-material/Cancel';

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

    const handleDelete = (id) => {
        console.log('in handleDelete, see id', id);
        dispatch({
            type: 'DELETE_SONG',
            payload: id
        })
    }

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
    
    // For the DELETE MODAL
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
    <>
        {songList.data ?
            songList.data.map((song) => {
                return (<Card sx={{ maxWidth: 300, marginTop: '5px', marginBottom: '5px', border: "solid black 1px"}} key={song.id}>
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
                                size="small"
                                color='success'>
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
                                size="small"
                                color="error"
                                onClick={handleOpen}>
                                Delete
                            </Button>
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
                                    onClick={() => handleDelete(song.id)}>
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
                        </Stack>
                    </CardContent>
                </Card>
            )}) : <li><p>Loading</p></li>
        }
    </>
    );
      
}

export default UserSongList;