import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import NavBar from './views/NavBar/NavBar'
import Footer from './views/Footer/Footer'
import Auth from '../hoc/auth'

import MovieDetail from './views/MovieDetail/MovieDetail';
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
    <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
        </Switch>
      </div>
      <Footer />
      </Suspense>
  );
}

export default App;
