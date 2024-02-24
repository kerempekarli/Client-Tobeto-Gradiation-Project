import React, { useState, useEffect } from 'react';
import Courses, { Course } from '../../components/catalog/courses';
import SearchSection from '../../components/catalog/searchSection';
import FilterCourse from '../../components/catalog/filterCourse';
import Navbar from '../../components/navbar/Navi2';
import Footer2 from '../../components/footer/Footer2';

export default function Catalog() {
  const [filteredData, setFilteredData] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:6280/api/Courses/GetList?PageSize=1000');
        const data = await response.json();
        setAllCourses(data.items);
        setFilteredData(data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredData(allCourses);
      return;
    }

    const results = allCourses.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  };

  const handleFilterChange = (filteredCourses: Course[]) => {
    setFilteredData(filteredCourses);
  };

  return (
    <div className="bg-front-dark">
      <Navbar />
      <div className="margin-top: 70px; padding-top: 70px">
      <SearchSection onSearch={handleSearch} />
      <div className="container mt-5 pb-20">
        <div className="row">
          <FilterCourse theme="dark" courses={allCourses} onFilterChange={handleFilterChange} />
          <Courses courses={filteredData} />
        </div>
      </div>
      </div>
      <Footer2 />
    </div>
  );
}

