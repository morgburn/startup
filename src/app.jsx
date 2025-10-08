import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Suggest } from './suggest/suggest';
import { Scores } from './scores/scores';
import { Vote } from './vote/vote';

export default function App() {
  return (
    <BrowserRouter>
        <><header>
          <h1>Bop Ballot</h1>
          <nav>
              <menu>
                  <li><NavLink to="">Login</NavLink></li>
                  <li><NavLink to="suggest">Make a Song Suggestion</NavLink></li>
                  <li><NavLink to="vote">Vote</NavLink></li>
                  <li><NavLink to="scores">View Top Suggestions</NavLink></li>
              </menu>
          </nav>
      </header>
      
      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/suggest' element={<Suggest />} />
        <Route path='/scores' element={<Scores />} />
        <Route path='/vote' element={<Vote />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      
      <footer>
              <p>Morgan Burnside</p>
              <a href="https://github.com/morgburn/startup">GitHub</a>
          </footer></>
    </BrowserRouter>
  )
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}