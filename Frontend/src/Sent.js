import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sent.css'; // Ensure this is the path to your new Sent CSS file

class SentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentItems: [], // Assuming the state will hold sent items
        };
    }

    componentDidMount() {
        this.fetchSentItems();
    }

    fetchSentItems = () => {
        // Replace this URL with the appropriate endpoint for fetching sent items
        fetch(`${process.env.REACT_APP_API_URL}/sent`) 
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => this.setState({ sentItems: data }))
            .catch(error => console.error('Error fetching sent items:', error));
    };

    render() {
        const { sentItems } = this.state;
        return (
            <div className="sent-container">
                <aside className="menu-sidebar">
                    <nav>
                        <h1>Welcome!</h1>
                        <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Home</NavLink>
                        <NavLink to="/compose" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Compose</NavLink>
                        <NavLink to="/inbox" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Inbox</NavLink>
                        <NavLink to="/sent" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Sent</NavLink>
                    </nav>
                </aside>
                <main className="sent-content">
                    {/* Sent messages list */}
                    <header className="welcome-header">
                        <h1>Sent</h1>
                        <div className="search-bar">
                            <input type="text" placeholder="Search sent items" />
                        </div>
                    </header>
                    <section className="sent-list">
                        {sentItems.map((item) => (
                            <div key={item.id} className="sent-item">
                                <div className="recipient">{item.recipient}</div>
                                <div className="subject">{item.subject} - {item.summary}</div>
                            </div>
                        ))}
                    </section>
                </main>
            </div>
        );
    }
}

export default SentPage;
