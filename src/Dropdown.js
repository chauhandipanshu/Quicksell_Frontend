import React, { useState } from 'react';
import './Status.css';
import './Dropdown.css';
import optionsimg from './options.png';
import dropdownimg from './dropdown.png';

function Dropdown(props) {
  // Retrieve initial state values from localStorage for grouping and ordering
  const [selectedValue, setSelectedValue] = useState(localStorage.getItem('grouping'));
  const [selectedValueOrder, setSelectedValueOrder] = useState(localStorage.getItem('order'));

  // Handle changes to the "Grouping" dropdown
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value); // Update local state
    props.setGroupingValue(value); // Update parent component's state
    localStorage.setItem('grouping', value); // Save to localStorage
  };

  // Handle changes to the "Ordering" dropdown
  const handleSelectChangeOrder = (event) => {
    const value = event.target.value;
    setSelectedValueOrder(value); // Update local state
    props.setOrderingValue(value); // Update parent component's state
    localStorage.setItem('order', value); // Save to localStorage
  };

  return (
    <>
      <div className='dropdown'>
        {/* Grouping Dropdown */}
        <ul>
          Grouping
          <div>
            <select name="grouping" value={selectedValue} onChange={handleSelectChange}>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="user">User</option>
            </select>
          </div>
        </ul>

        {/* Ordering Dropdown */}
        <ul>
          Ordering
          <div>
            <select name="ordering" value={selectedValueOrder} onChange={handleSelectChangeOrder}>
              <option value="Priority">Priority</option>
              <option value="Title">Title</option>
            </select>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Dropdown;
