import React, { useEffect, useRef, useState } from 'react';
import './Status.css';
import optionsimg from './options.png';
import Dropdown from './Dropdown.js';
import './Dropdown.css';
import dropdownimg from './dropdown.png';

// Navbar component that manages dropdown visibility and interactions
function Navbar(props) {
  const [openDrop, setOpenDrop] = useState(false); // State to track if dropdown is open
  const dropdownButtonRef = useRef(null); // Ref to the dropdown button

  // Toggles the dropdown open/close state
  const onClickHandler = () => {
    setOpenDrop(prev => !prev);
  };

  // Closes the dropdown if a click occurs outside of it
  const closeDropdown = (event) => {
    if (openDrop && dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target)) {
      setOpenDrop(false);
    }
  };

  // Effect to add/remove event listener for closing the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, [openDrop]);

  return (
    <div className='randombar'>
      <div className='topBar' onClick={onClickHandler}>
        <img src={optionsimg} className='optionsImg' alt='Options' />
        <button className='button'>Display</button>
        <img src={dropdownimg} className='optionsImg2' alt='Dropdown' />
      </div>

      {openDrop && (
        <div ref={dropdownButtonRef}>
          <Dropdown 
            order={props.order} 
            grouping={props.grouping} 
            setGroupingValue={props.setGroupingValue} 
            setOrderingValue={props.setOrderingValue} 
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
