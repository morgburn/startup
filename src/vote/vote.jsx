import React from 'react';
import './vote.css';
import {voteList } from './voteList';

export function Vote() {
  return (
        <main>
            <h2>Vote on Song Suggestions</h2>
            <div className="song-list">
                <div className="song-suggestion">
                    <img src="/images/album_cover.png" alt="Album Cover Placeholder" width="60" />
                    <span className="song-text">Golden - Huntrix</span>
                    <button>❤</button>
                </div>

                <div className="song-suggestion">
                    <img src="/images/album_cover_2.png" alt="Album Cover Placeholder" width="60" />
                    <span className="song-text">I Hear A Symphony - Cody Fry</span>
                    <button>❤</button>
                </div>
            </div>
        </main>
  );
}