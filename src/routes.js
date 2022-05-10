import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import MewsRead from './components/MewsRead';
import Profile from './components/Profile';
import User from './components/User';

import Login from './Pages/Login';
import Register from './Pages/Register';
import About from './Pages/About';
import Faq from './Pages/Faq';

const routes = () => (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path=':mewsId' element={<MewsRead />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/:username' element={<User />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/faq' element={<Faq />} />
    </Routes>
);

export default routes;