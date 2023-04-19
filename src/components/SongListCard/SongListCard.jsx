import * as React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

function SongListCard() {

  const setActive = (event) => {
    console.log('setActive is running');
  }

  return (
    <Card sx={{ maxWidth: 300 }}>
        <CardContent>
            <CardActionArea onClick={setActive}>
                <Typography gutterBottom variant="h5" component="div">
                    Song
                </Typography>
            </CardActionArea>
            <Typography variant="body2" color="text.secondary">
                There will be some song lyrics that go here
            </Typography>
        </CardContent>
    </Card>
  );
}

export default SongListCard;