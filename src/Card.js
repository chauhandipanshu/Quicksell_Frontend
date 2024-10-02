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

const Card = ({ ticket }) => {
    const [available, setAvailable] = useState(false); // Tracks user availability
    const [users, setUsers] = useState([]); // Stores fetched users

    useEffect(() => {
        fetchUsers(); // Fetch users data on component mount
    }, []);

    // Function to fetch users data from the API
    const fetchUsers = async () => {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setUsers(result.users); // Store fetched users
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Mapping priority levels to corresponding images
    const priorityImageMap = {
        0: img0,
        1: img1,
        2: img2,
        3: img3,
        4: img4,
    };

    // Mapping ticket statuses to corresponding images
    const statusImageMap = {
        "Todo": todo,
        "In progress": inprogressimg,
        "Backlog": backlogimg,
        "Done": done,
        "Cancelled": Cancelled,
    };

    // Mapping user IDs to corresponding images
    const usrImageMap = {
        "usr-1": usr1,
        "usr-2": usr2,
        "usr-3": usr3,
        "usr-4": usr4,
        "usr-5": usr5,
        "usr-6": usr6,
        "usr-7": usr7,
    };

    // Effect to set user availability based on the assigned user of the ticket
    useEffect(() => {
        const user = users.find(user => user.id === ticket.userId);
        if (user) setAvailable(user.available);
    }, [users, ticket]);

    // Get the correct images for user, priority, and ticket status
    const usrImage = usrImageMap[ticket.userId] || usr1;
    const priorityImg = priorityImageMap[ticket.priority] || img0;
    const statusImg = statusImageMap[ticket.status] || todo;

    // Availability indicator (dot)
    const availabilityIndicator = available ? (
        <div className='availableUser' />
    ) : (
        <div className='notavailableUser' />
    );

    return (
        <div className='cardBox'>
            <div className='cardBoxrow'>
                <div className='cardBoxin'>
                    <span className='cardId'>{ticket.id}</span>
                    <span className='cardTitle'>
                        <img src={statusImg} alt={ticket.status} />
                        {ticket.title}
                    </span>
                </div>
                <div style={{ height: "38px" }}>
                    <img className='userImg' src={usrImage} alt='User' />
                    {availabilityIndicator}
                </div>
            </div>

            <div className='lowerBox'>
                <div className='priorityBox'>
                    <img className='priorityImg' src={priorityImg} alt='Priority' />
                </div>
                <div className='tagBox'>
                    <img className='tagImg' src={tag} alt='Tag' />
                    <span className='tagText'>{ticket.tag}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
