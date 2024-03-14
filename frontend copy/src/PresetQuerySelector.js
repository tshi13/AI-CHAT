import React, { useState } from 'react';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';

export default function PresetQuerySelector({ onQuerySelect }) {
  const [presetQuery, setPresetQuery] = useState('');

  const presetQueries = {
    "1. List the internships with highest monthly salaries by industry": "SELECT F.industry, MAX(ISal.monthly_salary) AS max_monthly_salary FROM InternshipSalary AS ISal JOIN Fortune500 AS F ON ISal.company_name = F.company_name GROUP BY F.industry;",
    "2. List the internships in companies with highest profits in each US geographical region": "SELECT R.region, F.company_name, MAX(F.profit) AS max_profit FROM Fortune500 AS F JOIN Internships AS I ON F.company_name = I.company_name JOIN Region AS R ON F.state = R.state GROUP BY R.region;",
    "3. List the average internship salary in locations with top 100 universities": "SELECT UR.location, AVG(Isal.hourly_salary) AS avg_hourly_salary FROM InternshipSalary AS Isal JOIN UniversityRanking AS UR ON Isal.location = UR.location WHERE UR.ranking <= 100 GROUP BY UR.location;",
    "4. List the cost of living and average internship salaaries of each location": "SELECT ISal.location, AVG(ISal.hourly_salary) AS avg_hourly_salary, COL.COLIndex FROM InternshipSalary AS ISal JOIN USCity AS UC ON ISal.location = CONCAT (UC.city, ', ', UC.state_id) JOIN CostOfLiving AS COL ON UC.state_name = COL.state GROUP BY ISal.location;",
    "5. List the internships available in the 10 lowest cost of living states": "WITH LowCOL AS ( SELECT COL.state FROM CostOfLiving AS COL ORDER BY COL.COLIndex ASC LIMIT 10 ) SELECT ISal.company_name, ISal.location FROM InternshipSalary ISal JOIN USCity UC ON ISal.location = CONCAT (UC.city, ', ', UC.state_id) WHERE UC.state_name IN ( SELECT LC.state FROM LowCOL AS LC );",
    "6. List the Tech Companies that provide sponsorship and are in Tech-HQ locations in the US": "SELECT DISTINCT ISal.company_name FROM InternshipSalary AS ISal JOIN Internships AS I ON ISal.company_name = I.company_name JOIN USCity AS UC ON ISal.location = location WHERE I.provide_sponsorship = 1 AND CONCAT (UC.city, ', ', UC.state_name) IN ( SELECT headquarters FROM SP500_Companies WHERE sector LIKE '%Technology%' );",
    "7. List the Fortune 500 Companies with valuation greater than 1 billion USD that have internships with an hourly salary of at least 50 USD": "SELECT F.company_name, (F.valuation / 1000) AS valuation_billions, ISal.hourly_salary FROM Fortune500 AS F JOIN InternshipSalary AS ISal ON F.company_name = ISal.company_name WHERE F.valuation > 1000 AND ISal.hourly_salary >= 50;",
    "8. List the top paying internship for each season (we only have data for Summer 2024 internships)": "SELECT ISal.season, MAX(ISal.monthly_salary) AS max_monthly_salary FROM InternshipSalary AS ISal GROUP BY ISal.season;",
    "9. List monthly salaries for internships at S&P 500 companies in the Health Care sector " : "SELECT ISal.company_name, ISal.monthly_salary FROM InternshipSalary AS ISal JOIN SP500_Companies AS S ON ISal.company_name = S.name WHERE S.sector = 'Health Care';",
    "10. Find the top 10 locations in number of internships": "SELECT I.location, COUNT(*) AS number_of_internships FROM InternshipSalary AS I GROUP BY I.location ORDER BY number_of_internships DESC LIMIT 10;",
    "11. List the name and revenue of Fortune 500 Companies that offer interships": "SELECT F.company_name, F.revenue FROM Fortune500 AS F JOIN Internships AS I ON F.company_name = I.company_name GROUP BY F.company_name ORDER BY F.revenue DESC LIMIT 10;",
    "12. On average, how much more does an intern in New England make compared to an intern in the Pacific Region?": "SELECT ( SELECT AVG(ISal.hourly_salary) FROM InternshipSalary AS ISal JOIN USCity AS UC ON ISal.location = CONCAT (UC.city, ', ', UC.state_id) JOIN Region AS R ON UC.state_name = R.state WHERE R.region = 'New England' ) - ( SELECT AVG(ISal.hourly_salary) FROM InternshipSalary AS ISal JOIN USCity AS UC ON ISal.location = CONCAT (UC.city, ', ', UC.state_id) JOIN Region AS R ON UC.state_name = R.state WHERE R.region = 'Pacific' ) AS average_hourly_salary_difference;",
    "13. What is the population of each city outside the US that has at least one internship?": "SELECT DISTINCT WC.city, WC.country, WC.population FROM WorldCity AS WC JOIN InternshipSalary AS ISal ON ISal.location = CONCAT (WC.city, ', ', WC.country);",
    "14. What are the companies and industries (listed by Fortune 500) of the internships that have the 5 earliest application dates?": "SELECT F.company_name, F.industry FROM Fortune500 AS F JOIN Internships AS I ON F.company_name = I.company_name ORDER BY I.application_date ASC LIMIT 5;",
    "15. List the sectors of the S&P 500 Companies by average application date ascending (i.e. what sector opens applications the earliest?)": "SELECT S.sector, AVG(I.application_date) AS avg_application_date FROM SP500_Companies AS S JOIN Internships AS I ON S.name = I.company_name GROUP BY S.sector ORDER BY avg_application_date ASC;",
  };

  const handlePresetChange = (event) => {
    const selectedQuery = presetQueries[event.target.value];
    setPresetQuery(event.target.value);
    onQuerySelect(selectedQuery);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="preset-query-label">Select a query from the dropdown to get data</InputLabel>
      <Select
        labelId="preset-query-label"
        value={presetQuery}
        label="Preset Queries"
        onChange={handlePresetChange}
      >
        {Object.keys(presetQueries).map((key) => (
          <MenuItem key={key} value={key}>{`${key}`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
