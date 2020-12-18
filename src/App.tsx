import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/" exact render={() => <Search />} />
            <Route path={['/login', '/sign_up']} render={() => <Auth />} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
