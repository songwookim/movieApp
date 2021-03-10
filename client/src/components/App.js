import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import Auth from '../hoc/auth'

import MovieDetail from './views/MovieDetail/MovieDetail';

import FavoritePage from './views/FavoritePage/FavoritePage';
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          {/* <Route path="/">
            <LandingPage />
          </Route> */}
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          {/* 로긴 한 사람만 봐야하니까*/}
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
