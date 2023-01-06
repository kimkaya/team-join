import React, {useState, Component, useEffect} from 'react';
import { Table, Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import axios from 'axios';
import './SjobBoard.css'
import HeaderBoard from '../../Common/HeaderBoard';



function SjobBoard(props) {
  const [sjobinfo, setSjobinfo] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect((e)=> {
    axios.get("http://localhost:8090/sjobinfo", {params:{id:userId, type:1}})
    .then((response)=> {
      console.log(response.data)
      setSjobinfo(response.data);
    }).catch((error)=> {
      console.log("여기서 오류가 나요ㅠㅠ")
        console.log(error);
    })
  }, []);

  return (
      <div className='myinfo1'>
        <HeaderBoard title="내가 쓴 구직글" />
        {/* <h1 className='title'>내가 쓴 구직글 목록</h1>    */}
        <Table>
            <tbody>
            <tr className='sjobhead'>
                <th class='detailnum'>글번호</th>
                {/* <th class='detailid'>아이디</th> */}
                {/* <th>구인타입</th> */}
                {/* <th>게시판타입</th> */}
                <th class='detailhead2'>글 제목</th>
                {/* <th>글 내용</th> */}
                <th class='detailindustry2'>분류</th>
            </tr>
            {sjobinfo.map((acc) => (
                <tr key={acc.id}>
                    <td>{acc.id}</td>
                    {/* <td>{acc.id}</td> */}
                    {/* <td>{acc.type}</td> */}
                    {/* <td>{acc.boardtype}</td> */}
                    {/* <td class='detailsbody'><Link to={'/sjobboard/detail/'+acc.id}>{acc.title}</Link></td> */}
                    {/* <td><Link to={'/sjobboard/detail/'+acc.id}>{acc.content}</Link></td> */}
                    <td>{acc.industry}</td>
                    {/* <td>{type='2' && {acc.industry}}</td> */}
                </tr>
            ))}
            </tbody>
        </Table>
      </div>
    );
}

export default SjobBoard;
