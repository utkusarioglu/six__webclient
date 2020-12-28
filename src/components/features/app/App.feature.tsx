import { useState } from 'react';

const AppFeature = () => {
  const [content, setContent] = useState('');

  fetch(`http://${window.location.host}:8080`)
    .then((data) => data.text())
    .then(setContent);

  return (
    <div>
      <p>{content}</p>
    </div>
  );
};

export default AppFeature;
