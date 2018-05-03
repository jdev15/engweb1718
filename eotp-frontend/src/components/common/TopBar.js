import React from 'react';
import '../../css/topbar.css'

class TopBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  render () {
    return (
<nav className="tb">
				<div className="navWide">
				<div className="icon">
      <i class="fas fa-power-off"></i>
      </div>
					<div className="wideDiv">
					</div>
				</div>
				<div className="navNarrow">
					<div className="narrowLinks">
					</div>
				</div>
			</nav>
    );
  }
}

export default TopBar;