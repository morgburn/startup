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
      
      <main>App components go here</main>
      
      <footer>
              <p>Morgan Burnside</p>
              <a href="https://github.com/morgburn/startup">GitHub</a>
          </footer></>
    </BrowserRouter>
  )
}