import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function CustomQueryInput({ onQuerySubmit }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = () => {
    // Process query (remove new lines and tabs)
    const processedQuery = query.replace(/\n|\t/g, ' ');
    onQuerySubmit(processedQuery);
  };

  return (
    <div>
      <TextField
        label="Write your custom SQL query here"
        multiline
        rows={4}
        value={query}
        onChange={handleQueryChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Execute Query
      </Button>
    </div>
  );
}
