import React from 'react';
import '../../css/main.css';

export default function Main() {
    return (
        <div className="feed-wrapper">
            <div className='feed-friends-toggle'>
                <span className='feed-btn'>FEED</span>
                <span className='friends-btn'>FIND FRIENDS</span>
            </div>
        </div>
    );
}
