import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Nav from './Nav';

const App = () => {
    return (
        <BrowserRouter>
            <Nav />
            <Routes />
        </BrowserRouter>
    );
}

export default App;