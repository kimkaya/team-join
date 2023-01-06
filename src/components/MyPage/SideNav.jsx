import Nav from "./Nav";

import LogoutButton from '../Common/LogoutButton';
import Header from '../Common/Header';
// SideNav = PageList

function isActive(path) {
  return window.location.pathname.startsWith(path);
}

function SideNav() {
  return (
    <>
    <Nav className='navbar'>
    <Header title='마이페이지' link="/board"/>
      <Nav.List>
        <Nav.Item>
          <Nav.Link to="/mypage" active={isActive("/mypage")}>
            계정
          </Nav.Link>
        </Nav.Item>
        <Nav.Separator />
        <br/>
        내가 쓴 글
        <Nav.Item>
          <Nav.Link to="/mypage/cjobinfo" active={isActive("/cjobinfo")}>
            구인글
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/mypage/sjobinfo" active={isActive("/sjobinfo")}>
            구직글
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/mypage/myboardinfo" active={isActive("/myboardinfo")}>
            자유글
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/mypage/mylikeinfo" active={isActive("/mylikeinfo")}>
          좋아요
          </Nav.Link>
        </Nav.Item>

        <Nav.Separator /> 
        <br/>
        기타
        <Nav.Item>
          <Nav.Link to="/about" active={isActive("/about")}>
            <LogoutButton/>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/mypage/withdrawal" active={isActive("/withdrawal")}>
            회원탈퇴
          </Nav.Link>
        </Nav.Item>
        <Nav.Item disabled>
          <Nav.Link>Coming Soon</Nav.Link>
        </Nav.Item>
      </Nav.List>
    </Nav>
    </>
  );
}

export default SideNav;
