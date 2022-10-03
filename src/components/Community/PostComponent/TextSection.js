import React from 'react';
import parse from 'html-react-parser';

import './TextSection.scss';

function TextSection({ post }) {
  return (
    <>
      <div className="postTextSection_main">
        <div className="article_section">{parse(post[0].content)}</div>
      </div>
    </>
  );
}

export default TextSection;
