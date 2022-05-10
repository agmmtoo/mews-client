// base api url from env
const BASE_URL = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}${process.env.REACT_APP_API_URL}`;

const getProfile = async ({ signal, token }) => {
    try {
        let response = await fetch(`${BASE_URL}/users/profile`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            signal
        });
        return { status: response.status, data: await response.json() };
    } catch (error) {
        console.log(error)
    }
};

const getUser = async ({ signal, username }) => {
    try {
        let response = await fetch(`${BASE_URL}/users/${username}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            signal
        });
        return { status: response.status, data: await response.json() };
    } catch (error) {
        console.log(error)
    }
};


const usersapi = {
    getProfile,
    getUser
};

export default usersapi;