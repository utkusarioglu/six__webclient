import { useState, useEffect } from 'react';
import { SERVER_PORT } from '../../../config';

const AppFeature = () => {
  const [content, setContent] = useState('');
  useEffect(() => {
    fetch(`http://${window.location.host}:8080/api/auth/user`)
      .then((data) => data.json())
      .then((json) => setContent(JSON.stringify(json, null, 2)));
  }, []);

  return (
    <div>
      <span>Server port: {SERVER_PORT}</span>
      <pre>{content}</pre>
    </div>
  );
};

export default AppFeature;
