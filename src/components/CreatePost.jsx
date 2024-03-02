import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function CreatePost(props) {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const dynamodb = props.dynamodb;

        const params = {
            TableName: 'PostTable',
            Item: {
            'PostID': Date.now(),
            'Author': author,
            'Title': title,
            'Content': body,
            'Timestamp': new Date().toISOString(),
            }
        };

        dynamodb.put(params, (err, data) => {
            if (err) {
                console.error('Error', err);
            } else {
                console.log('Success', data);
                setAuthor('');
                setTitle('');
                setBody('');
                props.loadingHandler(true);
                props.reloadHandler(true);
            }
        });
    };

    return (
        <Card sx={{margin: 3, mb: 4}}>
            <CardContent component='form' onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Typography variant='h6'>Create a new post</Typography>
                <Box sx={{display: 'flex', gap: 2}}>
                    <TextField
                        id="author-input"
                        label="Author"
                        variant="outlined"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        size="small"
                        required
                    />
                    <TextField 
                        id="title-input" 
                        label="Title" 
                        variant="outlined" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        size="small"
                        required
                    />
                </Box>
                <TextField 
                    id="content-input" 
                    label="Body" 
                    variant="outlined" 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
                <Button variant="contained" color='success' type="submit">Create</Button>
            </CardContent>
        </Card>
    )
}