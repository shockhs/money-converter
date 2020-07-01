import React, { FC } from 'react';
import { render } from 'react-dom';
import WebpackLogo from '../assets/images/webpack.png';
import '../styles/styles.scss';

const App:FC = () => {
    return <div className="container">
        <h1>Hello world</h1>
        <img src={WebpackLogo} alt="Logotype" />
    </div>
}


render(<App />, document.getElementById('app') as HTMLElement)


