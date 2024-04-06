import React from 'react';
import { Card } from 'react-bootstrap';

const Pokemon = ({ id, name, imageUrl }) => {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}> {/* Add margin here */}
      <Card.Img variant="top" src={imageUrl} style={{ margin: 'auto', width: '50%', paddingTop: '10px' }} />
      <Card.Body className="text-center">
        <Card.Text>[{id}] {name}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Pokemon;
