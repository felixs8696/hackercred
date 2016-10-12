import React from 'react';

export const Dashboard = ({dash_navbar, dash_content}) => (
  <div>
    {dash_navbar}
    <div className="container">
      {dash_content}
    </div>
  </div>
);
