import React, { useEffect, useState } from 'react';
import './Card.css';
import logo from './logo.svg';
import priority from './priority.svg';
import tag from './tag.png';
import img0 from './nopriority.png';
import img4 from './urgent.png';
import img3 from './high.png';
import img2 from './medium.png';
import img1 from './low.png';
import done from './Done.png';
import cancelled from './canceled.png';
import backlogimg from './backlog.png';
import inprogressimg from './in progress.png';
import todo from './to do.png';
import usr1 from './usr-1.png';
import usr2 from './usr-2.png';
import usr3 from './usr-3.png';
import usr4 from './usr-4.png';
import usr5 from './usr-5.png';
import usr6 from './usr-6.png';
import usr7 from './usr-7.png';

const CardStatus = (props) => {
    const [available, setAvailable] = useState(false); // State to track user availability
    const [users, setUsers] = useState([]); // State to store user data
    const [tick, setTick] = useState([]); // State to store ticket data

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    // Fetch data from the API
    async function fetchData() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setTick(result.tickets);
            setUsers(result.users);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Maps for priority, status, and user images
    const priorityImageMap = {
        0: img0,
        1: img1,
        2: img2,
        3: img3,
        4: img4,
    };
    const statusImageMap = {
        "Todo": todo,
        "In progress": inprogressimg,
        "Backlog": backlogimg,
        "Done": done,
        "Cancelled": cancelled,
    };
    const usrImageMap = {
        "usr-1": usr1,
        "usr-2": usr2,
        "usr-3": usr3,
        "usr-4": usr4,
        "usr-5": usr5,
        "usr-6": usr6,
        "usr-7": usr7,
    };

    // Check user availability and update the state
    useEffect(() => {
        users.forEach((user) => {
            if (props.ticket && user.id === props.ticket.userId) {
                setAvailable(user.available);
            }
        });
    }, [users, props.ticket]);

    // Select the correct images for priority, status, and user
    const usrImage = usrImageMap[props.ticket.userId] || usr1;
    const imgSrc = priorityImageMap[props.ticket.priority] || img0;
    const statusImgSrc = statusImageMap[props.ticket.status] || todo;

    // User availability indicator
    const userStatus = available 
        ? <div className='availableUser' /> 
        : <div className='notavailableUser' />;

    return (
        <div className='cardBox'>
            <div className='cardBoxrow'>
                <div className='cardBoxin'>
                    <span className='cardId'>{props.ticket.id}</span>
                    <span className='cardTitle'>
                        {/* Status image can be displayed if needed */}
                        {/* <img src={statusImgSrc} alt='status' /> */}
                        {props.ticket.title}
                    </span>
                </div>
                <div style={{ height: "38px" }}>
                    <img className='userImg' src={usrImage} alt='user' />
                    {userStatus}
                </div>
            </div>

            <div className='lowerBox'>
                <div className='priorityBox'>
                    <img className='priorityImg' src={imgSrc} alt='priority' />
                </div>

                <div className='tagBox'>
                    <img className='tagImg' src={tag} alt='tag' />
                    <span className='tagText'>{props.ticket.tag}</span>
                </div>
            </div>
        </div>
    );
};

export default CardStatus;
