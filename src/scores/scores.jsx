import React from 'react';
import './scores.css';

export function Scores() {
  return (
        <main>
            <h2>Top Suggestions</h2>
            <table>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Votes</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Golden</td>
                    <td>Huntrix</td>
                    <td>❤12</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>I Hear A Symphony</td>
                    <td>Cody Fry</td>
                    <td>❤7</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Butter</td>
                    <td>BTS</td>
                    <td>❤5</td>
                </tr>
                </tbody>
            </table>
        </main>
  );
}