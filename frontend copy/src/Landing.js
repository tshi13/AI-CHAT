import React, { useState } from 'react';
import TableComponent from './TableComponent';
import CustomQueryInput from './CustomQueryInput';
import PresetQuerySelector from './PresetQuerySelector';
import { Switch, FormControlLabel, Box, Typography } from '@mui/material';
import Chatbox from './ChatBox';

function Landing() {
  const [query, setQuery] = useState('');
  const [isCustomQuery, setIsCustomQuery] = useState(true);
	const [curruser, setUser] = useState({});
	const [message, setMessage] = useState('');

  const handleQuerySubmit = (newQuery) => {
    setQuery(newQuery);
  };

  const toggleQueryType = (event) => {
    setIsCustomQuery(event.target.checked);
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Welcome to Rising Star Demo!
      </Typography>
      
			<Chatbox userID="65f1a50e075c37359e2fdcef" username="Yulun" groupID="65f19f411286acb83d05d2a0" groupName="Rising Start Testing" newHeight="800" />

      {/* <TableComponent query={query} /> */}
    </Box>
  );
}

export default Landing;
