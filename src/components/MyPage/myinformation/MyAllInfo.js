import React, {useState, Component, useEffect} from 'react';
import {BrowserRouter as Route, Link} from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import './MyAllInfo.css'
import HeaderInfo from '../../Common/HeaderInfo';
import MyPageButton from '../../Style/MyPageButton';
// import MyChangeButton from '../../Style/MyChangeButton';



function MyAllInfo(props, match) {
  const [myinfo, setMyinfo] = useState({});
  const id = "cbk112";

  useEffect((e)=> {
    axios.get("http://localhost:8090/myinfo/"+id)
    .then((response)=> {
      console.log(response.data)
      setMyinfo(response.data);
    }).catch((error)=> {
      console.log("err")
        console.log(error);
    })
  }, []);

  return (
      <div className='myinfo'>
        <HeaderInfo title="내 정보 세부보기" />
        {/* <h1 className='title'>내 정보 세부보기</h1> */}
        <Table className='#'>
          <thead>
            <tr key={myinfo.userid} className='allinfohead'>
              <th className='detailhead0'>목차</th>
              <th class='detail'>세부정보</th>
            </tr>
          </thead>
          <tbody className='allinfobody'>
            <tr>
              <th scope="row">아이디</th>
              <td class='detail'>{myinfo.id}</td>
            </tr>
            <tr>
              <th scope="row">닉네임</th>
              <td class='detail'>{myinfo.name}<br/>
                <Link to="/mypage/nickname">
                  <MyPageButton type="submit" width="80%">닉네임 설정</MyPageButton>
                </Link> 
              </td>
            </tr>
            <tr>
              <th scope="row">출생년도</th>
              <td class='detail'>{myinfo.birth}</td>
            </tr>
            <tr>
              <th scope="row">이메일</th>
              <td class='detail'>{myinfo.email}<br/>
                <Link to="/mypage/email">
                  <MyPageButton type="submit" width="80%">이메일 변경</MyPageButton>
                </Link> 
              </td>
            </tr>
            <tr>
              <th scope="row">산업분야</th>
              <td class='detail'>{myinfo.industry}</td>
            </tr>
            <tr>
              <th scope="row">회사명</th>
              <td class='detail'>{myinfo.company}</td>
            </tr>
            <tr>
              <th scope="row">직책</th>
              <td class='detail'>{myinfo.position}</td>
            </tr>
          </tbody>
        </Table>
        <Link to="/mypage/password">
          <MyPageButton type="submit" width="90%">비밀번호 변경</MyPageButton>
        </Link>
      </div>
    );
}

export default MyAllInfo;
