import React, { useEffect, useState } from 'react';
import './Card.css';
import tag from './tag.png';
import img0 from './nopriority.png';
import img4 from './urgent.png';
import img3 from './high.png';
import img2 from './medium.png';
import img1 from './low.png';
import done from './Done.png';
import Cancelled from './canceled.png';
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

// CardPriority component displays information about a ticket, including its status, priority, and assigned user.
const CardPriority = (props) => {
    const [available, setAvailable] = useState(false); // State to track user availability
    const [users, setUsers] = useState([]); // State to store fetched users

    // Effect to fetch user data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch tickets and users from the API
    const fetchData = async () => {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setUsers(result.users); // Store fetched users
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Maps priority levels to corresponding images
    const priorityImageMap = {
        0: img0,
        1: img1,
        2: img2,
        3: img3,
        4: img4,
    };

    // Maps ticket statuses to corresponding images
    const statusImageMap = {
        "Todo": todo,
        "In progress": inprogressimg,
        "Backlog": backlogimg,
        "Done": done,
        "Cancelled": Cancelled,
    };

    // Maps user IDs to corresponding images
    const usrImageMap = {
        "usr-1": usr1,
        "usr-2": usr2,
        "usr-3": usr3,
        "usr-4": usr4,
        "usr-5": usr5,
        "usr-6": usr6,
        "usr-7": usr7,
    };

    // Effect to check user availability based on the assigned user of the ticket
    useEffect(() => {
        if (props.ticket) {
            const user = users.find(user => user.id === props.ticket.userId);
            if (user) {
                setAvailable(user.available);
            }
        }
    }, [users, props.ticket]);

    // Get the correct images for user, priority, and ticket status
    const usrImage = usrImageMap[props.ticket.userId] || usr1;
    const imgSrc = priorityImageMap[props.ticket.priority] || img0;
    const statusImgSrc = statusImageMap[props.ticket.status] || todo;

    // Availability indicator (dot)
    const dotUser = available ? (
        <div className='availableUser' />
    ) : (
        <div className='notavailableUser' />
    );

    return (
        <div className='cardBox'>
            <div className='cardBoxrow'>
                <div className='cardBoxin'>
                    <span className='cardId'>{props.ticket.id}</span>
                    <span className='cardTitle'>
                        <img src={statusImgSrc} alt={props.ticket.status} />
                        {props.ticket.title}
                    </span>
                </div>
                <div style={{ height: "38px" }}>
                    <img className='userImg' src={usrImage} alt='User' />
                    {dotUser}
                </div>
            </div>

            <div className='lowerBox'>
                <div className='tagBox'>
                    <img className='tagImg' src={tag} alt='Tag' />
                    <span className='tagText'>{props.ticket.tag}</span>
                </div>
            </div>
        </div>
    );
};

export default CardPriority;
