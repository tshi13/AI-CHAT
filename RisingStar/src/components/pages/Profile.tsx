import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { user } from "../../data";
import { Doughnut, Bar} from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

function Profile() {
  // Registering necessary components for Bar and Doughnut charts
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ArcElement // Needed for the Doughnut chart
  );

  const navigate = useNavigate();

  const chartData = {
    labels: Object.keys(user.techSkills),
    datasets: [
      {
        label: 'Proficiency',
        data: Object.values(user.techSkills),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(user.softSkills),
    datasets: [
      {
        label: 'Proficiency',
        data: Object.values(user.softSkills),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Optionally, define specific options for the Bar chart
  // const barOptions = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       suggestedMax: 100 // Ensuring the scale matches the skill levels
  //     },
  //   },
  // };

const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  

  return (

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // Center vertically
      alignItems: 'center',     // Center horizontally
      height: '100vh'
    }}>
      <div style={{ width: '100%', height: '800vh' }}></div> 
      <h1>Individual analysis</h1>
      <div style={{ width: '100%', height: '800vh' }}></div> 
      <div style={{ width: '100%', height: '40vh' }}></div> 
      <div style={{
        width: '50%',  // Adjust width as needed
        height: '40vh', // Adjust height as needed
        marginBottom: '10vh', // Space between the two charts
      }}>
        <Bar data={chartData} options={options} />
      </div>
      <div style={{
        width: '31%',  // Adjust width as needed
        height: '40vh', // Adjust height as needed
      }}>
        <Doughnut data={pieData} options={options} />
      </div>
      <div style={{ width: '100%', height: '800vh' }}></div> 
      <div style={{ width: '100%', paddingTop: '2vh', textAlign: 'center' }}>
        <button 
          style={{
            padding: '30px 30px',
            fontSize: '1rem',
            cursor: 'pointer',
            backgroundColor: '#a5ecf7', // A nice shade of green
            color: 'white', // White text color
            transition: 'background-color 0.3s',
            borderRadius: '5px',

          }}
          onClick={() => {
            // Add your logic for what should happen when the button is clicked
            navigate('/CumulativeProfile');
          }}
        >
          Cumulative Result
        </button>
      </div>
    </div>
  );
}
  
export default Profile;
