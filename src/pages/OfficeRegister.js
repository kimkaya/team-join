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
import { registerOffice } from "../_actions/user_actions";
import { withRouter } from "react-router-dom";

const industry = [
'IT',
'경제',
'디자인',
].sort();

const entranceYearArray = [];
for (let i = 1962; i < 2004; i++) {
  entranceYearArray.push(i);
}

function OfficeRegister({ history ,rpost}) {
  const dispatch = useDispatch();
  const [inputs, setInput] = useState({
    userId: "",
    userPw: "",
    userEmail: "",
    userName: "",
    usableId: false,
    UserCareer: "",
  });

  const { userId, userPw, userEmail, userName, usableId, UserCareer} = inputs;
  const [option, setOption] = useState("2021");
  const [officeInput, setOfficeInput] = useState("");
  const [searchResult, setSearchResult] = useState(industry);
  const [showCompanyList, setShowCompanyList] = useState(true);
  const [overIdLength, setOverIdLength] = useState(false);
  const [overPwLength, setOverPwLength] = useState(false);

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
  //   let data = {
  //     id: String(userId)
  //   };
  
  //   let api = `/officeregister/checkId/${userId}`
  
  
    const checkId = (e) => {
      e.preventDefault();
      if (overIdLength) {
        return;
      }
      axios
        .post(`http://localhost:8090/officeregister/checkId`, null, {params:{ id: userId }})
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
    setOfficeInput(e.target.value);
    const result = industry.filter((company) => {
      return company.includes(e.target.value);
    });
    setSearchResult(result);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setOfficeInput(e.target.textContent);
    setShowCompanyList(false);
  };

  const SignUp = (e) => {
    e.preventDefault();
    let body = {
      id: userId,
      password: userPw,
      email: userEmail,
      name: userName,
      entranceYear: option,
      office: officeInput,
    };
    if (overIdLength || overPwLength) {
      return;
    } else if (!userId || !userPw || !userEmail || !userName) {
      alert("필수 항목을 작성해주세요");
      return;
    } else if (!industry.includes(officeInput)) {
      alert("분야");
      return;
    } else if (usableId === false) {
      alert("아이디 중복확인을 해주세요");
      return;
    } else {
      dispatch(registerOffice(body))
      .then((response) => {
        if (response.payload.success) {
          alert("회원가입을 완료했습니다.");
          history.push("./");
        } else {
          alert("회원가입에 실패했습니다.");
        }
      })
      .catch((error) => console.log(error));
    }
  };
  return (
    <StyledContainer>
      <div>
        <Header link={"./"} title="회원가입" backbutton={true} />
        <StyledBox padding="18px 16px" lineHeight="20px">
          <form onSubmit={checkId}>
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
            <CheckIdButton onClick={checkId}>중복체크</CheckIdButton>
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
              dataArr={entranceYearArray}
            />
            <RegisterInput
              labelName="산업분야"
              name="userCompany"
              type="text"
              placeholder="내가 지원하는 산업분야"
              onChange={handleSearch}
              value={officeInput}
            />
            <RegisterInput
            labelName='경력'
            name="career"
            type='text'
            placeholder="나의 경력"
            onChange={onChange}
            value={UserCareer}/>

            {officeInput && showCompanyList && (
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

export default withRouter(OfficeRegister)