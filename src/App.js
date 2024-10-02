import './App.css';
import Navbar from './Navbar.js';
import Status from './Status.js';
import Priority from './Priority.js';
import Byuser from './Byuser.js';
import { useState } from 'react';

function App() {
  // Manage the grouping state, initialized from localStorage
  const [Grouping, setGrouping] = useState(localStorage.getItem('grouping'));
  // Manage the ordering state, initialized from localStorage
  const [Order, setOrder] = useState(localStorage.getItem('order'));

  // Update grouping state with valid values only
  const setGroupingValue = (newValue) => {
    if (newValue === 'status' || newValue === 'priority' || newValue === 'user') {
      setGrouping(newValue);
    } else {
      console.error('Invalid grouping value provided:', newValue);
    }
  };

  // Update ordering state with valid values only
  const setOrderingValue = (newValue) => {
    if (newValue === 'Priority' || newValue === 'Title') {
      setOrder(newValue);
    } else {
      console.error('Invalid ordering value provided:', newValue);
    }
  };

  // Determine which content to render based on the grouping state
  let content;
  if (Grouping === 'status') {
    content = <Status order={Order} />;
  } else if (Grouping === 'priority') {
    content = <Priority order={Order} />;
  } else {
    content = <Byuser order={Order} />;
  }

  return (
    <div className='fullBody'>
      {/* Render Navbar with grouping and ordering controls */}
      <Navbar 
        order={Order} 
        grouping={Grouping} 
        setGroupingValue={setGroupingValue} 
        setOrderingValue={setOrderingValue} 
      />
      {content}
    </div>
  );
}

export default App;
