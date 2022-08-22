import React from 'react'
import logo from '../logo.svg';

function Header() {
    return(
        <div className="App">
        <header className="App-header" style={{textAlign: 'center'}}>
          <img src={logo} className="App-logo" alt="logo" width="240" height="192" />
            <p style={{"fontFamily": 'Times New Roman'}}>News Page using React</p>
        </header>
      </div>
    )
}
export default Header