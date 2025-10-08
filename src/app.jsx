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
                  <li><a href="index.html">Home</a></li>
                  <li><a href="suggest.html">Make a Song Suggestion</a></li>
                  <li><a href="vote.html">Vote</a></li>
                  <li><a href="scores.html">View Top Suggestions</a></li>
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