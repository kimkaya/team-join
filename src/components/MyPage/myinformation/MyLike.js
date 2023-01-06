import React, {useState, Component, useEffect} from 'react';
import { Table, Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import axios from 'axios';
import './MyLike.css'
import HeaderInfo from '../../Common/HeaderInfo';




function MyLike(props) {
  const [mylikeinfo, setMylikeinfo] = useState([]);

  useEffect((e)=> {
    axios.get("http://localhost:8090/mylikeinfo")
    .then((response)=> {
      console.log(response.data);
      setMylikeinfo(response.data);
    }).catch((error)=> {
      console.log("여기서 오류가 나요ㅠㅠ")
        console.log(error);
    })
  }, []);

  return (
      <div className='myinfo4'>
        <HeaderInfo title="내가 누른 좋아요" />
        {/* <h1 className='title'>내가 누른 좋아요 목록</h1>           */}
        <Table>
            <tbody>
            <tr className='likehead'>
                <th class='detailnum3'>글번호</th>
                <th class='detailhead3'>글제목</th>
                <th class='detailboardtype3'>게시판</th>
            </tr>
            </tbody>
        </Table>
      </div>
    );
}

export default MyLike;
