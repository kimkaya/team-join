import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Common/Header";
import StyledBox from "../components/Style/styledBox";
import StyledContainer from "../components/Style/styledContainer";
import CheckIdButton from "../components/Register/ChcekIdButton";
import RegisterInput from "../components/Register/RegisterInput";
import LimitOnLength from "../components/Register/LimitOnLength";
import RegisterButton from "../components/Register/RegisterButton";
import RegisterSelect from "../components/Register/RegisterSelect";
import CompanySearchResult from "../components/Register/CompanySearchResult";
import { useDispatch } from "react-redux";
import { registerUser } from "../_actions/user_actions";
import { withRouter } from "react-router-dom";
import { Button } from "@mui/material";
// import rpost from '../post';
// import rpost from '../'
// import rpost from '../util/post.jsx';


const COMPANY_ARR = [
  '카카오',
  '현대',
  '삼성',
].sort();

const birthArray = [];
for (let i = 1962; i < 2004; i++) {
  birthArray.push(i);
}

function Register({ history, rpost }) {
  const dispatch = useDispatch();
  const [inputs, setInput] = useState({
    userId: "",
    userPw: "",
    userEmail: "",
    userName: "",
    usableId: false,
  });

  const { userId, userPw, userEmail, userName, usableId } = inputs;
  const [option, setOption] = useState("2021");
  const [companyInput, setCompanyInput] = useState("");
  const [searchResult, setSearchResult] = useState(COMPANY_ARR);
  const [showCompanyList, setShowCompanyList] = useState(true);
  const [overIdLength, setOverIdLength] = useState(false);
  const [overPwLength, setOverPwLength] = useState(false);


  const signpost = () => {

  let data = {
    id: userId
  };

  let api = `/register/checkId/${userId}`


  //   rpost({ api: api, data: data }, (err, response) => {
  //     console.log("2", api);
  //     console.log("2", data);
  //     if (err) {
  //       console.log(response.state===200);
  //       setInput({
  //         ...inputs,
  //         usableId: true,
  //       });
  //       alert("사용가능한 아이디입니다.");
  //     }
  //     else {
  //       console.log(err);
  //       alert("다른 아이디를 입력해주세요");
  //     }
  //   })
  // }

  

  // setRegisterpost(RegisterObject) {
  // this.RegisterpostStr = RegisterpostObject.Str ;
  // }

  const onChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...inputs,
      [name]: value,
      usableId: usableId,
    });

    if (inputs.userId.length > 8) {
      setOverIdLength(true);
    } else {
      setOverIdLength(false);
    }

    if (inputs.userPw.length > 12) {
      setOverPwLength(true);
    } else {
      setOverPwLength(false);
    }
  };

  // const checkId = (e) => {
  //   e.preventDefault();
  //   if (overIdLength) {
  //     return;
  //   }

  //     let data = {
  //       id: String(userId)
  //     };
    
  //     let api = `/register/checkId/${userId}`
    
    
  //       rpost({ api: api, data: data }, (err, response) => {
  //         console.log("2", api);
  //         console.log("2", data);
  //         if (err) {
  //           console.log(response.state===200);
  //           setInput({
  //             ...inputs,
  //             usableId: true,
  //           });
  //           alert("사용가능한 아이디입니다.");
  //         }
  //         else {
  //           console.log(err);
  //           alert("다른 아이디를 입력해주세요");
  //         }
  //       })
      

  //   // let api = '/rpost';

  //   // let data = {
  //   //   id:1,
  //   //   name:"무열",
  //   //   age:29
  //   // };

  //   // let testtt;

  //   // rpost.post({api: api, data: data},(err, response) => {
  //   //   if(err) {
  //   //     console.log(err);
  //   //     // asaaa(null);
  //   //     // testtt = null;
  //   //   }
  //   //   else {
  //   //     console.log(response);
  //   //     // asaaa(response);
  //   //     // testtt = response;

  //   //   }
  //   // }) 
    axios
      .post(`/register/checkId/${userId}`, { id: userId })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setInput({
            ...inputs,
            usableId: true,
          });
          alert("사용가능한 아이디입니다.");
        }
        else{
          console.log(error);
          alert("다른 아이디를 입력해주세요");}
      })
  };

  const checkId = (e) => {
    e.preventDefault();
    if (overIdLength) {
      return;
    }
    axios
      .post(`http://localhost:8090/register/checkId`, null, {params:{ id: userId }})
      .then((response) => {
        console.log(response);
        
        setInput({
            ...inputs,
            usableId: true,
        });
        alert("사용가능한 아이디입니다.");
        
      })
      .catch((error) => {
        console.log(error);
        alert("다른 아이디를 입력해주세요");
      });
  };

  const handleOption = (e) => {
    setOption(e.target.value);
  };

  const handleSearch = (e) => {
    setShowCompanyList(true);
    setCompanyInput(e.target.value);
    const result = COMPANY_ARR.filter((company) => {
      return company.includes(e.target.value);
    });
    setSearchResult(result);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setCompanyInput(e.target.textContent);
    setShowCompanyList(false);
  };

  const SignUp = (e) => {
    e.preventDefault();
    let body = {
      id: userId,
      password: userPw,
      email: userEmail,
      name: userName,
      birth: option,
      company: companyInput,
    };
    if (overIdLength || overPwLength) {
      return;
    } else if (!userId || !userPw || !userEmail || !userName) {
      alert("필수 항목을 작성해주세요");
      return;
    } else if (!COMPANY_ARR.includes(companyInput)) {
      alert("기업을 선택해주세요.");
      return;
    } else if (usableId === false) {
      alert("아이디 중복확인을 해주세요");
      return;
    } else {
      dispatch(registerUser(body))
        .then((response) => {
          if (response.payload.success) {
            alert("회원가입을 완료했습니다.");
            history.push("./");
          } else {
            alert("회원가입에 실패했습니다.");
            // ((error) => console.log(error));
          }
        })
    }
  };

  return (
    <StyledContainer>
      <div>
        <Header link={"./"} title="회원가입" backbutton={true} />
        <StyledBox padding="18px 16px" lineHeight="20px">
          <form onSubmit={checkId}>
            <Button onClick={e => {signpost(e)}}>버튼</Button>
            <RegisterInput
              labelName="아이디"
              name="userId"
              type="text"
              placeholder="아이디"
              onChange={onChange}
              value={userId}
            />
            {overIdLength && (
              <LimitOnLength>아이디를 8자 이내로 입력해주세요</LimitOnLength>
            )}
            <CheckIdButton onClick={(e) => { checkId(e) }}>중복체크</CheckIdButton>
          </form>
          <form onSubmit={SignUp}>
            <RegisterInput
              labelName="비밀번호"
              name="userPw"
              type="password"
              placeholder="비밀번호"
              onChange={onChange}
              value={userPw}
            />
            {overPwLength && (
              <LimitOnLength>비밀번호를 12자 이내로 입력해주세요</LimitOnLength>
            )}
            <RegisterInput
              labelName="이메일"
              name="userEmail"
              type="email"
              placeholder="이메일"
              onChange={onChange}
              value={userEmail}
            />
            <RegisterInput
              labelName="닉네임"
              name="userName"
              type="text"
              placeholder="닉네임"
              onChange={onChange}
              value={userName}
            />
            <RegisterSelect
              labelName="출생년도"
              handleOption={handleOption}
              option={option}
              dataArr={birthArray}
            />
            <RegisterInput
              labelName="기업선택"
              name="userCompany"
              type="text"
              placeholder="다니고있는 회사를 입력해주세요"
              onChange={handleSearch}
              value={companyInput}
            />

            {companyInput && showCompanyList && (
              <CompanySearchResult
                datas={searchResult}
                handleSearchClick={handleSearchClick}
              />
            )}
            <RegisterButton type="submit">회원가입</RegisterButton>
          </form>
        </StyledBox>
      </div>
    </StyledContainer>
  );
}

export default withRouter(Register);
