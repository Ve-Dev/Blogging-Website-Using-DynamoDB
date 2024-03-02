import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';    

export default function PostHeader(props) {
    return (
        <Stack 
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
        >
            <Typography>#{props.postHeaderData.PostID}</Typography>
            <Typography>{props.postHeaderData.Title}</Typography>
            <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'flex-end'}}>
                <Box
                    display="flex"
                    flexDirection="column"
                    mr={2}
                >
                    <Typography>{props.postHeaderData.Author}</Typography>
                    <Typography>{props.postHeaderData.Timestamp}</Typography>
                </Box>
                <Avatar/>
            </Box>
        </Stack>
    );
}
