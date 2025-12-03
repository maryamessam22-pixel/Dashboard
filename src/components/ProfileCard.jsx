import React from "react";
import "./ProfileCard.css";
import userPic from "../assets/my_pic.png"; // your small image

const ProfileCard = () => {
  return (
    <div className="profile-big-box">

      {/* LEFT SIDE */}
      <div className="profile-left">
        <img src={userPic} className="profile-small-img" alt="User" />

        <div className="profile-texts">
          <h3 className="profile-name-text">Mariam Farid</h3>
          <p className="profile-job-text">UI/UX Designer</p>
        </div>
      </div>

      {/* RIGHT SIDE BUTTON */}
      <button className="profile-save-btn">
        Save Changes
      </button>

    </div>
  );
};

export default ProfileCard;
