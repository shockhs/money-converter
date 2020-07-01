import WebpackLogo from '@/assets/images/webpack.png';
import '@/styles/styles.scss';
import React from 'react';
import { render } from 'react-dom';

const App = () => {
    return <div className="container">
        <h1>Hello world</h1>
        <img src={WebpackLogo} alt="Logotype"/>
    </div>
}


render(<App />, document.getElementById('app'))