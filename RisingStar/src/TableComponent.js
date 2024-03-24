import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';

export default function TableComponent(props) {
  const [rowData, setRowData] = useState([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    axios.post('http://3.149.254.125:5000/execute_query', {
      // query: "SELECT * FROM SP500_Companies JOIN Internships ON (SP500_Companies.name = Internships.company_name);"
      query: props.query

    })
    .then(response => {
      setRowData(response.data);
    })
    .catch(error => console.error('Error fetching data:', error));
  }, [props.query]);

	  // Generate column definitions from the data keys
		const generateColDefs = (data) => {
			if (data.length === 0) return [];
			return Object.keys(data[0]).map(key => ({ field: key }));
		};
	
		// Column Definitions
		const [colDefs, setColDefs] = useState([]);
	
		// Update column definitions when rowData changes
		useEffect(() => {
			if (rowData.length > 0) {
				setColDefs(generateColDefs(rowData));
			}
		}, [rowData]);
	
		return (
			<div className="ag-theme-quartz" style={{ width: '100%', height: '600px' }}>
				<AgGridReact rowData={rowData} columnDefs={colDefs} />
			</div>
		);
}