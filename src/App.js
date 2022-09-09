import './App.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { timeParts } from './utilities/times.js';
import CourseList from './components/CourseList.js';

const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () =>  {
  const [schedule, setSchedule] = useState();
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(addScheduleTimes(json));
    }
    fetchSchedule();
  }, []);

  if (!schedule) return <h1>Loading schedule...</h1>;

  return <div className="container">
    <Banner title={ schedule.title } />
    <CourseList courses={ schedule.courses } />
  </div>
};

export default App;