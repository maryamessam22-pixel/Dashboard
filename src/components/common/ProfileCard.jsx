import React from "react";
import "./ProfileCard.css";
import userPic from "../../assets/my_pic.png"; // Updated path: needs to go up two levels from common

const ProfileCard = () => {
  return (
    <div className="profile-big-box">

     
      <div className="profile-left">
        <img src={userPic} className="profile-small-img" alt="User" />

        <div className="profile-texts">
          <h3 className="profile-name-text">Mariam Farid</h3>
          <p className="profile-job-text">UI/UX Designer</p>
        </div>
      </div>

    
      <button className="profile-save-btn">
        Save Changes
      </button>

    </div>
  );
};

export default ProfileCard;