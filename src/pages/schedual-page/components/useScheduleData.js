import { useState, useEffect } from 'react';
import { getStaffApi } from '../../../api/staff';
import { getSectionsApi } from '../../../api/sections';

export const useScheduleData = () => {
  const [teachers, setTeachers] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch teachers and sections in parallel
        const [teachersData, sectionsData] = await Promise.all([
          getStaffApi(),
          getSectionsApi()
        ]);

        // Filter teachers - include all employees for now
        // You can adjust this filter based on your specific requirements
        const filteredTeachers = teachersData.filter(teacher => 
          teacher.subjects?.length > 0 || 
          teacher.role === 'teacher' || 
          teacher.user?.username // Include all employees for now
        );

        console.log('Fetched teachers:', filteredTeachers);
        console.log('Fetched sections:', sectionsData);
        setTeachers(filteredTeachers);
        setSections(sectionsData);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { teachers, sections, loading, error };
}; 