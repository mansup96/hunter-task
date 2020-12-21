import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './components/Header/Header';
import Search from './components/routes/Search/Search';
import Auth from './components/routes/Auth/Auth';
import Vacancy from './components/routes/Vacancy/Vacancy';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <main className="mainContainer">
          <div className="mainWrapper">
            <Switch>
              <Route path={['/login', '/sign_up']} render={() => <Auth />} />
              <Route path="/search/:searchFor" render={() => <Search />} />
              <Route path={'/vacancy/:id'} render={() => <Vacancy />} />
              <Route
                path="/"
                render={() => <Redirect to={'/search/vacancies'} />}
              />
            </Switch>
          </div>
        </main>
      </Router>
    </div>
  );
};

export default App;
