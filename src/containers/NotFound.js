import React from 'react';
import { Link } from 'react-router';

const NotFound = () => (
  <div
    style={{ position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)' }}
  >
    Page not found. Back to <Link to="/">homepage</Link>?
  </div>
);

export default NotFound;