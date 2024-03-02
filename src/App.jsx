import './App.css'

import { useState, useEffect } from 'react'
import { Container, Typography } from '@mui/material';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import CircularProgress from '@mui/material/CircularProgress';  

import AWS from 'aws-sdk';

function App() {

  // Set up AWS DynamoDB client
  const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1',
    accessKeyId: 'AKIAVRUVRVDUGGNOJOPY',
    secretAccessKey: '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',
  });

  // Parameters for DynamoDB query
  const params = {
    TableName: 'PostTable',
  };

  const [posts, setPosts] = useState([])
  const [reload, setReload] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch data from DynamoDB
  useEffect(() => {
    dynamodb.scan(params, (err, data) => {
      if (err) {
        console.error('Error fetching data:', err);
      } else {
        // Handle the response data
        console.log('Data:', data);
        setPosts(data.Items);
        setReload(false);
        setIsLoading(false);
      }
    });
  }, [reload]);

  return (
    <>
      <Typography variant="h3">Basic Blogging Website</Typography>
      <CreatePost dynamodb={dynamodb} reloadHandler={setReload} loadingHandler={setIsLoading} />
      <Container sx={{width: '70vw', maxHeight: '90vh', border: '4px solid white', borderRadius: '12px', padding: 2, overflowY: 'scroll'}}>
        <Typography variant="h4">Posts</Typography>
        {
          !isLoading ? posts.map((post, index) => (
            <Post key={index} postData={post} dynamodb={dynamodb} reloadHandler={setReload} loadingHandler={setIsLoading} />
          )) : <CircularProgress />
        }
      </Container>
    </>
  )
}

export default App
