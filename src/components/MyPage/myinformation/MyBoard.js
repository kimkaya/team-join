import React, {useState, Component, useEffect} from 'react';
import { Table, Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import axios from 'axios';
import './MyBoard.css'
import HeaderBoard from '../../Common/HeaderBoard';





function MyBoard(props) {

  const [myboardinfo, setMyboardinfo] = useState([]);
  console.log("test2");
  useEffect((e)=> {
    axios.get("http://localhost:8090/myboardinfo")
    .then((response)=> {
      console.log(response.data);
      console.log("test");
      setMyboardinfo(response.data);
    }).catch((error)=> {
      console.log("여기서 오류가 나요ㅠㅠ")
        console.log(error);
    })
  }, []);

  return (
      <div className='myinfo3'>
        <HeaderBoard title="내가 쓴 게시글" />
        {/* <h1 className='title'>내가 쓴 게시글 목록</h1>     */}
        <Table>
          <tbody>
          <tr className='boardhead'>
              <th class='detailnum1'>글번호</th>
              {/* <th>아이디</th> */}
              {/* <th>구인구직타입</th> */}
              {/* <th class='detailboardtype'>게시판</th> */}
              {/* <th class='detailanonymous'>익명성</th> */}
              <th class='detailhead'>글 제목</th>
              {/* <th>글 내용</th> */}
              <th class='detailindustry'>분류</th>
          </tr>
          {myboardinfo.map((acc) => (
              <tr key={acc.id}>
                  <td>{acc.id}</td>
                  {/* <td>{acc.userid}</td> */}
                  {/* <td>{acc.type}</td> */}
                  {/* <td>{acc.type}</td> */}
                  {/* <td>{acc.anonymous}</td> */}
                  <td class='detailbody'><Link to={'/everytimeboard/detail/'+acc.id}>{acc.subject}</Link></td>
                  {/* <td><Link to={'/everytimeboard/detail/'+acc.id}>{acc.content}</Link></td> */}
                  <td>{acc.industry}</td>
              </tr>
          ))}
          </tbody>
        </Table>
      </div>
    );
}

export default MyBoard;
