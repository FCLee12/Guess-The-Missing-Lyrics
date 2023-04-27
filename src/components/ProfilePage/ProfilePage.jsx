import { useSelector } from "react-redux";
import { Box, Button, Card, FormControl, Grid, Input, InputLabel, List, ListItem, ListItemText, Modal, Paper, TextField, Typography } from '@mui/material/';


function ProfilePage() {

    const user = useSelector((store) => store.user);

    // Card style
    const cardStyle = {
        flexDirection:"column",
        marginLeft: 1.2,
        textAlign:"center",
        width: 300,
        border: 'solid black 1px'
    }

    // img style
    const imgStyle = {
        width: '270px',
        height: '260px',
        border: 'solid black 3px'
    }

    return(
        <>
            <Card sx={cardStyle}>
                <Typography variant="h5" sx={{mt: 1}}>Hello,</Typography>
                <Typography variant="h5">{user.username}</Typography>
                <Grid sx={{mt: 1, mb: 1}}>
                    <img src='./images/Avatar.png' alt='user avatar' style={imgStyle}/>
                </Grid>
                <Paper>
                    <Typography sx={{fontWeight: 600}}>Your GameID:</Typography>
                    <Typography>{user.game_id}</Typography>
                    <Typography sx={{fontWeight: 600}}>Username:</Typography>
                    <Typography>{user.username}</Typography>
                    <Button>Edit Username</Button>
                    <Typography sx={{fontWeight: 600}}>Password:</Typography>
                    <Button>Edit Password</Button>
                    <Typography sx={{fontWeight: 600}}>Email Address:</Typography>
                    <Typography>{user.email_address}</Typography>
                    <Button sx={{mb: 1}}>Edit Email Address</Button>
                </Paper>
            </Card>
        </>
    )
}

export default ProfilePage;