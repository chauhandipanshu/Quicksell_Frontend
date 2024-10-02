import React, { useEffect, useState } from 'react';
import todo from './to do.png';
import Card from '../../Card.js';
import './Status.css';
import plusmore from './plusmore.png';
import done from './Done.png';
import Cancelled from './canceled.png';
import backlogimg from './backlog.png';
import inprogressimg from './in progress.png';
import nopriorityimg from './nopriority.png';
import urgentimg from './urgent.png';
import highimg from './high.png';
import mediumimg from './medium.png';
import lowimg from './low.png';

const Board = (props) => {
    const [todono, settodono] = useState(0); // State for counting Todo items
    const [tick, setTick] = useState([]); // State to store fetched tickets
    const [inProgressno, setinProgressno] = useState(0); // State for counting In Progress items
    const [doneno, setdoneno] = useState(0); // State for counting Done items
    const [cancelled, setcancelled] = useState(0); // State for counting Cancelled items
    const [backlog, setbacklog] = useState(0); // State for counting Backlog items

    useEffect(() => {
        fetchTickets(); // Fetch tickets on component mount
        count(); // Update counts for ticket statuses
    }, []);

    // Function to fetch ticket data from API
    async function fetchTickets() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setTick(result.tickets); // Set tickets in state
        } catch (error) {
            console.error("Error:", error); // Log error if the fetch fails
        }
    }

    // Function to count tickets based on their status
    function count() {
        tick.forEach((ticket) => {
            if (ticket.status === "Todo") settodono(prev => prev + 1);
            if (ticket.status === "In Progress") setinProgressno(prev => prev + 1);
            if (ticket.status === "Done") setdoneno(prev => prev + 1);
            if (ticket.status === "cancelled") setcancelled(prev => prev + 1);
            if (ticket.status === "backlog") setbacklog(prev => prev + 1);
        });
    }

    return (
        <div className='Board'>
            <div className='boardHeading'>
                <img src={nopriorityimg} className='headingImg' alt='' />
                <p className='cText' style={{ width: "190px" }}>No-Priority</p>
                <p className='cText'>{backlog}</p>
                <div className='boardHeading' id='pluske'>
                    <img src={plusmore} className='headingImg' alt='' />
                </div>
            </div>

            <div className='Cards'>
                {tick.length > 0 && tick.map((ticket) => (
                    ticket.priority === 0 && <Card ticket={ticket} key={ticket.id} /> // Only show tickets with priority 0 (No-Priority)
                ))}
            </div>
        </div>
    );
}

export default Board;
