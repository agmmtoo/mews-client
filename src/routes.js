import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Mews from './components/Mews';
import MewsRead from './components/MewsRead';
import MewsUpdate from './components/MewsUpdate';
import MewsDelete from './components/MewsDelete';
import MewsCreate from './components/MewsCreate';

import Login from './Pages/Login';
import Register from './Pages/Register';

const routes = () => (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='mews' element={<Mews />} />
        <Route path='mews/submit' element={<MewsCreate />} />
        <Route path=':mewsId' element={<MewsRead />} />
        <Route path='mews/:mewsId/edit' element={<MewsUpdate />} />
        <Route path='mews/:mewsId/delete' element={<MewsDelete />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
    </Routes>
);

export default routes;