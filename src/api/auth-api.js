// base api url from env
const URL = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}${process.env.REACT_APP_API_URL}/auth`;

// headers
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

// signin
const signin = async ({ signal, username, password }) => {
    try {
        let response = await fetch(`${URL}/signin`, {
            method: 'POST',
            headers,
            signal,
            body: JSON.stringify({username, password})
        });
        return {status: response.status, data: await response.json()};
    } catch (error) {
        console.log(error)
    }
};

// signup
const signup = async ({signal, username, password}) => {
    try {
        let response = await fetch(`${URL}/signup`, {
            method: 'POST',
            headers,
            signal,
            body: JSON.stringify({username, password})
        });
        return {status: response.status, data: await response.json()};
    } catch (error) {
        console.log(error)
    }
}

const authapi = {signin, signup};

export default authapi;