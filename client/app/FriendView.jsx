import React from 'react';
import FriendEntryList from './FriendEntryList.jsx';

let FriendView = props => {
  return (
    <div>
      <h1>Yelp Crawlin Friends</h1>
        {props.friends.map(friend => {
          return <FriendEntryList friend={friend} />
          })
        }
    </div>
  )
}


export default FriendView;
