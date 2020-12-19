import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Search from './components/routes/Search/Search';
import Header from './components/Header/Header';
import Auth from './components/routes/Auth/Auth';
import Home from './components/routes/Home/Home';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path={['/login', '/sign_up']} render={() => <Auth />} />
            <Route path="/search" render={() => <Search />} />
            <Route path="/" render={() => <Home />} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
