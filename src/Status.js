import React, { useEffect, useState } from 'react';
import todo from './to do.png';
import CardStatus from './CardStatus';
import './Status.css';
import plusmore from './plusmore.png';
import done from './Done.png';
import Cancelled from './canceled.png';
import backlogimg from './backlog.png';
import inprogressimg from './in progress.png';

// Status component for displaying ticket boards based on their statuses
const Status = (props) => {
    const [pref, setPref] = useState(localStorage.getItem('grouping'));
    const [tick, setTick] = useState([]); // State to hold ticket data
    const [users, setUsers] = useState([]); // State to hold user data

    // States for various ticket statuses
    const [todonum, setTodoNum] = useState([]); // Tickets in "Todo" status
    const [backlog, setBacklog] = useState([]); // Tickets in "Backlog" status
    const [inProgressNo, setInProgressNo] = useState([]); // Tickets in "In Progress" status
    const [doneNo, setDoneNo] = useState([]); // Tickets in "Done" status
    const [cancelled, setCancelled] = useState([]); // Tickets in "Cancelled" status
    const [order, setOrder] = useState(localStorage.getItem('order')); // State to track the ordering of tickets

    // Fetch tickets and users from the API on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Update ticket counts whenever tickets or order change
    useEffect(() => {
        updateTicketCounts();
    }, [tick, order]);

    // Fetch ticket and user data from the API
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

    // Update ticket counts based on their statuses
    function updateTicketCounts() {
        const todoTickets = [];
        const doneTickets = [];
        const cancelledTickets = [];
        const backlogTickets = [];
        const inProgressTickets = [];

        // Classify tickets based on their status
        tick.forEach((ticket) => {
            switch (ticket.status) {
                case "Todo":
                    todoTickets.push(ticket);
                    break;
                case "Done":
                    doneTickets.push(ticket);
                    break;
                case "Cancelled":
                    cancelledTickets.push(ticket);
                    break;
                case "Backlog":
                    backlogTickets.push(ticket);
                    break;
                case "In progress":
                    inProgressTickets.push(ticket);
                    break;
                default:
                    break;
            }
        });

        // Sort tickets based on the selected order
        const sortedTodos = sortTickets(todoTickets);
        const sortedInProgress = sortTickets(inProgressTickets);
        const sortedBacklog = sortTickets(backlogTickets);
        const sortedDone = sortTickets(doneTickets);
        const sortedCancelled = sortTickets(cancelledTickets);

        // Update state with sorted tickets
        setTodoNum(sortedTodos);
        setBacklog(sortedBacklog);
        setCancelled(sortedCancelled);
        setDoneNo(sortedDone);
        setInProgressNo(sortedInProgress);
    }

    // Sort tickets based on title or priority
    function sortTickets(tickets) {
        return order === "Title"
            ? tickets.sort((a, b) => a.title.localeCompare(b.title))
            : tickets.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
    }

    // Render each board with tickets based on their status
    const renderBoard = (title, tickets, imgSrc) => (
        <div className='Board'>
            <div className='boardHeading'>
                <img src={imgSrc} className='headingImg' alt={title} />
                <p className='cText'>{title}</p>
                <p className='cText'>{tickets.length}</p>
                <div className='boardHeading' id='pluske'>
                    <img src={plusmore} className='headingImg' alt='Add more' />
                </div>
            </div>
            <div className='Cards'>
                {tickets.map((ticket) => (
                    <CardStatus 
                        key={ticket.id} 
                        ticket={ticket} 
                        available={getUserAvailability(ticket.userId)} 
                    />
                ))}
            </div>
        </div>
    );

    // Get user availability based on user ID
    const getUserAvailability = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.available : false; // Return availability or false if user not found
    };

    return (
        <div className='Boards'>
            {renderBoard('Backlog', backlog, backlogimg)}
            {renderBoard('Todo', todonum, todo)}
            {renderBoard('In-Progress', inProgressNo, inprogressimg)}
            {renderBoard('Done', doneNo, done)}
            {renderBoard('Cancelled', cancelled, Cancelled)}
        </div>
    );
};

export default Status;
