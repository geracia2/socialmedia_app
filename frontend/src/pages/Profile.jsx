import React from 'react';


function Profile() {
  return (
    <div className="container">
      <h2>Profile</h2>
      <div className="profile-info">
        <div className="profile-picture">
          <img src="#" alt="Profile Picture" />
        </div>
        <div className="profile-details">
          <h3>John Doe</h3>
          <p>Email: johndoe@xyz.com</p>
          <p>Location: New York City</p>
          <p>Bio: ###</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;