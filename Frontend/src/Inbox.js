import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Inbox.css'; // Ensure the CSS file path is correct

class InboxPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inboxItems: [],
        };
    }

    componentDidMount() {
        this.fetchInboxItems();
    }

    fetchInboxItems = () => {
        fetch(`${process.env.REACT_APP_API_URL}/inbox`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => this.setState({ inboxItems: data }))
            .catch(error => console.error('Error fetching inbox items:', error));
    };

    render() {
        const { inboxItems } = this.state;
        return (
            <div className="inbox-container">
                <aside className="menu-sidebar">
                    <nav>
                        <h1>Welcome!</h1>
                        <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Home</NavLink>
                        <NavLink to="/compose" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Compose</NavLink>
                        <NavLink to="/inbox" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Inbox</NavLink>
                        <NavLink to="/sent" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Sent</NavLink>
                    </nav>
                </aside>
                <main className="inbox-content">
                    <header className="welcome-header">
                        <h1>Inbox</h1>
                        <div className="search-bar">
                            <input type="text" placeholder="Search file" />
                        </div>
                    </header>
                    <section className="inbox-list">
                        {inboxItems.map((item) => (
                            <Link to={`/inbox/${item.id}`} key={item.id} className="inbox-item">
                                <div className="sender">{item.sender}</div>
                                <div className="subject">{item.subject} - {item.summary}</div>
                            </Link>
                        ))}
                    </section>
                </main>
            </div>
        );
    }
}

export default InboxPage;
