import React from 'react';
import ReactWordcloud from 'react-wordcloud';
// import words from './data/words'
import languages from './data/languages'

function WordCloud() {
  return (
    <div style={{ height: 400, width: 600 }}>
        <h1>Word Cloud</h1>
      <ReactWordcloud words={languages} />
    </div>
  );
}
export default WordCloud;
