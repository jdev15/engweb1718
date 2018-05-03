import React from 'react';
import { Link/*, WrappedLink*/ } from 'react-router-dom';
import '../css/SideBarLogedin.css';

function SideBarLogedin(props) {
  return(
    <div className="sbli">
    <Link to='/Watchlist'>
       <a>Watchlist</a>
    </Link>
    <Link to='/Portfolio'>
      <a>Portfolio</a>
    </Link>
    <Link to='/Historico'>
      <a>Histórico</a>
    </Link>
      <a>Gerir Perfil</a>
    </div>
  );
}

export default SideBarLogedin;