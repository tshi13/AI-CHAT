import React, { useState } from 'react';
import TableComponent from './TableComponent';
import CustomQueryInput from './CustomQueryInput';
import PresetQuerySelector from './PresetQuerySelector';
import { Switch, FormControlLabel, Box, Typography } from '@mui/material';
import Chatbox from './ChatBox';

function Landing() {
  // const [query, setQuery] = useState('');
	const [yulunScore, setYulunscore] = useState(0);
	const [taimingScore, setTaimingscore] = useState(0);

 

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Welcome to Rising Star Demo!
      </Typography>
      
			<Chatbox 
				userID="63716c0a1e71f4f594736570" 
				username="Taiming" 
				groupID="65f19f411286acb83d05d2a0" 
				groupName="Rising Start Testing" 
				newHeight="800"
				setYulunscore = {setYulunscore}
				setTaimingscore = {setTaimingscore} />

      {/* <TableComponent user={query} /> */}
			<Typography
				variant="h6"
				gutterBottom
				sx={{ fontWeight: 'bold', color: '#1976d2' }}>
				Yulun's latest score: {yulunScore}
			</Typography>

			<Typography
				variant="h6"
				gutterBottom
				sx={{ fontWeight: 'bold', color: '#1976d2' }}>
				Taiming's latest score: {taimingScore}
			</Typography>
    </Box>
  );
}

export default Landing;
