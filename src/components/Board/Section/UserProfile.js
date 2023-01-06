import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import profile from "../../../assets/profile.png";
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

const ProfileImage = styled.img`
  width: 76px;
  height: 76px;
  margin: 24px 0px 4px 0px;
  border-radius: 6px;
  pointer: cursor;
`
const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`
const ProfileID = styled.div`
  color: #999;
  font-size: 13px;
  line-height: 20px;
`

const UserProfile = function(props) {
  const [User, setUser] = useState({
    userId: "",
    userName: "",
    userCompany: "",
  })
  const { userId, userName, userCompany } = User;

  useEffect(() => {
    const userFrom = localStorage.getItem('userId');
    axios.get('/user/profile', {_id: userFrom})
      .then((response) => {
        setUser({
          userId : response.data.id,
          userName: response.data.name,
          userCompany: response.data.company
        })
        window.localStorage.setItem('userName', response.data.name);
      })
  },[])

  if (props.boardPage) {
    return (
      <div>
        <Link to="/MyPage">
          <ProfileImage src= {profile} alt="profile"></ProfileImage>
        </Link>
        <Name>{userName}</Name>
        <ProfileID>{userId}</ProfileID>
        <ProfileID>{userCompany}</ProfileID>
      </div>
    )
  }
}

export default withRouter(UserProfile);
  