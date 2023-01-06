import styled from "styled-components";
// Content = MyPage
import React from "react";
import { BrowserRouter , Routes, Route, Router, withRouter } from "react-router-dom";

import SideNav from "./SideNav"
import MyAllInfo from "./myinformation/MyAllInfo";
import SjobBoard from "./myinformation/SjobBoard";
import CjobBoard from "./myinformation/CjobBoard";
import MyBoard from "./myinformation/MyBoard";
import MyLike from "./myinformation/MyLike";

import WithDrawal from "./Section/WithDrawal";
import Nickname from './Section/Nickname'
import Email from './Section/Email'
import Password from './Section/Password'
import Comment from "./Section/Comment";
import Favorite from "./Section/Favorite";

const Main = styled.main`
  display: block;
  // display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  
  width: 100%;
  max-width: 600px;
  height: 700px auto;
  min-height: 200px;
  padding: 10px 10px 50px 10px;

  background: #fffffe;
  color: #0f0e17;
  border-radius: 10px;
  // border: 1px solid rgb(234, 234, 234);
  border: 1px solid rgb(205, 139, 33);
  text-align: center;
`;

function Content({ match }) {
  return (
    <BrowserRouter>
    <Main>
    
      {/* <h1>{window.location.pathname}</h1>   // 내가 입력한 path주소 표시 */}
      <>
        <Route exact path={match.path} component={MyAllInfo} />
        <Route path={`${match.path}/cjobinfo`} component={CjobBoard} />
        <Route path={`${match.path}/sjobinfo`} component={SjobBoard} />
        <Route path={`${match.path}/myboardinfo`} component={MyBoard} />
        <Route path={`${match.path}/mylikeinfo`} component={MyLike} />
        <Route path={`${match.path}/withdrawal`} component={WithDrawal} />
        <Route path={`${match.path}/nickname`} component={Nickname} />
        <Route path={`${match.path}/email`} component={Email} />
        <Route path={`${match.path}/password`} component={Password} />
        <Route path={`${match.path}/comment`} component={Comment} />
        <Route path={`${match.path}/favorite`} component={Favorite} />
        
        {/* <Route exact path='/myboardinfo' element={<MyBoard/>}/>
        <Route exact path='/mylikeinfo' element={<MyLike/>}/>
        <Route exact path='/unregister' element={<Unregister/>}/> */}
      </>
      
    </Main>
    </BrowserRouter>
  );
}

export default withRouter(Content);
