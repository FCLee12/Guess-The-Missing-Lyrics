import { useSelector } from "react-redux";
import { Box, Button, Card, createTheme, Grid, Input, InputLabel, List, ListItem, ListItemText, Modal, Paper, TextField, ThemeProvider, Typography } from '@mui/material/';


function ProfilePage() {

    const user = useSelector((store) => store.user);

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
      })

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
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </>
    )
}

export default ProfilePage;