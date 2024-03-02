import Card from '@mui/material/Card';
import PostHeader from './PostHeader';
import { Button, CardContent, Divider, Typography } from '@mui/material';

export default function Post(props) {

  const handleDelete = () => {
    const dynamodb = props.dynamodb;
    const params = {
      TableName: 'PostTable',
      Key: {
        'PostID': props.postData.PostID
      }
    };

    dynamodb.delete(params, (err, data) => {
      if (err) {
        console.error('Error deleting item:', JSON.stringify(err, null, 2));
      } else {
        console.log('Deleted item successfully!');
        props.loadingHandler(true)
        props.reloadHandler(true)
      }
    });
  }

  return (
    <Card sx={{mt: 2}}>
        <CardContent>
            <PostHeader postHeaderData={props.postData} />
            <Divider/>
            <Typography align='left'>
                {props.postData.Content}
            </Typography>
            <Button variant="contained" color='warning' onClick={handleDelete}>Delete</Button>
        </CardContent>
    </Card>
  );
}