import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthProvider from "./component/AuthProvider";
import AuthRequired from "./component/AuthRequired";
import Layout from "./component/Layout";
import Feed from "./component/Feed";
import ArticleView from "./component/ArticleView";
import Comments from "./component/Comments";
import Search from "./component/Search";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Profile from "./component/Profile";
import FollowerList from "./component/FollowerList";
import FollowingList from "./component/FollowingList";
import Accounts from "./component/Accounts";
import NotFound from "./component/NotFound";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 인증이 필요한 라우트 */}
          <Route path="/" element={<AuthRequired><Layout /></AuthRequired>} >
            <Route index element={<Feed />} />
            <Route path="search" element={<Search />} />
          

            <Route path="p/:id">
              <Route index element={<ArticleView />} />
              <Route path="comments" element={<Comments />} />
            </Route>
            <Route path="profiles/:username">
              <Route index element={<Profile/>} />
              <Route path="followers" element={<FollowerList />} />
              <Route path="following" element={<FollowingList />} />
            </Route>

            <Route path="accounts/edit" element={<Accounts />} />
          </Route>

          {/* 인증이 필요하지 않은 라우트 */}
          <Route path="accounts/login" element={<Login />} />
          <Route path="accounts/signUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
