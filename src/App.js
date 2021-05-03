import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NewCard from './pages/NewCard'
import UserCard from './pages/UserCard'
import UserCardAdmin from './pages/UserCardAdmin'

import CTX from './util/store'
import './App.css';

function App() {
  

  
  const [cardData, updateCard] = useState({
    user: {name: '',
    imageURL: '',
    jobtitle: '',
    phonenumber: '',
    site: '',
    businessname: '',
    urlname: '',}
})
  return (
    <CTX.Provider value={[cardData, updateCard]}>
      <Router>
        <Switch>
          <Route exact path='/' component={NewCard}/>
          <Route exact path='/:cardName' component={UserCard}/>
          <Route exact path='/:cardName/admin' component={UserCardAdmin}/>
        </Switch>
      </Router>
    </CTX.Provider>
  );
}

export default App;
