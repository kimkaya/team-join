import React, {useState, Component, useEffect} from 'react';
import { Table, Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import axios from 'axios';
import './CjobBoard.css'
import HeaderBoard from '../../Common/HeaderBoard';



function CjobBoard(props) {
  const [cjobinfo, setCjobinfo] = useState([]);

  const userId = localStorage.getItem("userId");
  useEffect((e)=> {
    axios.get("http://localhost:8090/cjobinfo", {params:{id:userId, type:2}})
    .then((response)=> {
      console.log(response.data)
      setCjobinfo(response.data);
    }).catch((error)=> {
      console.log("여기서 오류가 나요ㅠㅠ")
        console.log(error);
    })
  }, []);

  return (
      <div className='myinfo2'>
        <HeaderBoard title="내가 쓴 구인글" />
        {/* <h1 className='title'>내가 쓴 구인글 목록</h1>       */}
        <Table>
          <thead>
          <tr className='cjobhead'>
              <th class='detailnum'>글번호</th>
              {/* <th class='detailid'>아이디</th> */}
              {/* <th>구직타입</th> */}
              {/* <th>게시판타입</th> */}
              <th class='detailhead1'>글 제목</th>
              {/* <th>글 내용</th> */}
              <th class='detailindustry1'>분류</th>
          </tr>
          </thead>
          <tbody>
          {cjobinfo.map((acc) => (
              <tr key={acc.id}>
                  <td>{acc.id}</td>
                  {/* <td>{acc.id}</td> */}
                  {/* <td>{acc.type}</td> */}
                  {/* <td>{acc.boardtype}</td> */}
                  <td class='detailcbody'><Link to={'/cjobboard/detail/'+acc.id}>{acc.subject}</Link></td>
                  {/* <td><Link to={'/cjobboard/detail/'+acc.id}>{acc.content}</Link></td> */}
                  <td>{acc.industry}</td>
              </tr>
          ))}
          </tbody>
        </Table>
      </div>
    );
}

export default CjobBoard;
