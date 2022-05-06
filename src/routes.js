import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import MewsRead from './components/MewsRead';

import Login from './Pages/Login';
import Register from './Pages/Register';

const routes = () => (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path=':mewsId' element={<MewsRead />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
    </Routes>
);

export default routes;