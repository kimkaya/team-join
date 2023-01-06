import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import Header from '../Common/Header';
import AddBoard from './Section/AddBoard';
import AddComment from './Section/AddComment';
import CommentInput from './Section/CommentInput';
import CheckName from './Section/CheckName';
import menu from '../../assets/menu.png';

const CommentForm = styled.form`
  position: relative;
  background-color: #fafafa;
  margin: 0px -1px;
  box-sizing: border-box;
`;
const BackButton = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #c62917;
  border-radius: 4px;
  width: 24%;
  height: 36px;
  margin: 12px 0px;
`;
const BackTitle = styled.span`
  color: #c62917;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
`
const MenuIcon = styled.img`
  width: 12px;
  height: 12px;
  padding: 12px 0px;
  margin-right: 4px;
`

function BoardDetail(props) {
  const BoardId = props.match.params.id;
  const userFrom = localStorage.getItem('userId');
  const writerFrom = localStorage.getItem('userName');
  const [Comments, setComments] = useState([]);
  const [BoardDetail, setBoardDetail] = useState([]);
  const [BoardWriter, setBoardWriter] = useState("익명");
  const [WriterIcon, setWriterIcon] = useState(true);
  const [Value, setValue] = useState("");
  let variables = {
    userFrom: userFrom,
    boardFrom: BoardId,
    commentContent: Value,
    commentWriter: BoardWriter,
  }

  useEffect(() => {
    const variable = { boardId : BoardId };
    axios.post(`${props.match.path}`, variable)
    .then((response) => {
      console.log(response.data);
          setBoardDetail([response.data.board]);
        } 
      ).catch((err)=>{
        console.log(err);
        alert("게시글을 보여줄 수 없습니다.");
      })
    FetchComment();
  }, []);

  const FetchComment = () => {
    axios.post("/comment/getComment", variables)
      .then((response) => {
      console.log(response.data);
          setComments(response.data.comments);
        } 
      ).catch((err)=>{
        console.log(err);
        alert("게시글을 보여줄 수 없습니다.");
      })
    }
  


  const onIconClick = () => {
    if(WriterIcon){
      setWriterIcon(false);
      setBoardWriter(writerFrom);
    } else {
      setWriterIcon(true);
      setBoardWriter("익명");
    };
  }
  const onRemoveBoard = (id) => {
    setBoardDetail(BoardDetail.filter(BoardDetail => BoardDetail._id !== id))
    props.history.push("/")
  } 
  const onRemoveComment = (id) => {
    setComments(Comments.filter(Comments => Comments._id !==id))
  }
  const onChange = (e) => {
    setValue(e.currentTarget.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/comment/upload', variables)
      .then(response => {
        alert("댓글이 등록되었습니다.");
        setValue("");
        FetchComment();
      })
  }
    
  return (
    <div>
      <Header title="자유게시판" link="/board"/>
      { BoardDetail && BoardDetail.map((board, index) => {
        return(
          <React.Fragment key={index}>
            <AddBoard
              id={board._id}
              user={board.userFrom}
              time={board.createdAt}
              writer={board.boardWriter}
              title={board.boardTitle}
              content={board.boardContent}
              history={`${props.history}`}
              onRemove={onRemoveBoard}
            />
          </React.Fragment>
        )})
      }
      <CommentForm onSubmit={onSubmit}>
        <CommentInput
          name="Comment"
          placeholder="댓글을 작성해주세요."
          value={Value}
          onChange={onChange}
        />
        <CheckName 
          left="284px"
          icon={WriterIcon}
          click={onIconClick} 
          submit={onSubmit}
        />
      </CommentForm>
      { Comments && Comments.map((comment, index) => {
        return(
          <React.Fragment key={index}>
            <AddComment
              id={comment._id}
              user={comment.userFrom}
              time={comment.createdAt}
              writer={comment.commentWriter}
              content={comment.commentContent}
              onRemove={onRemoveComment}
            />
          </React.Fragment>
        )})
      }
      <Link to="/board">
        <BackButton> 
          <MenuIcon src={menu} alt="menu"/>
          <BackTitle>글 목록</BackTitle>
        </BackButton>
      </Link>
    </div>
  )
}

export default withRouter(BoardDetail);
