// base api url from env
const BASE_URL = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}${process.env.REACT_APP_API_URL}/mews`;

// headers
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

// list
const list = async ({ signal }) => {
    try {
        let response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers,
            signal
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
};

// list by points
const boostedmews = async ({ signal, daysago = 10 }) => {
    try {
        let response = await fetch(`${BASE_URL}?rank=true&daysago=${daysago}`, {
            method: 'GET',
            headers,
            signal
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

// list by createdAt
const newestmews = async ({ signal, daysago = 7 }) => {
    try {
        let response = await fetch(`${BASE_URL}?daysago=${daysago}`, {
            method: 'GET',
            headers,
            signal
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

// list by submitter
const submittersmews = async ({ signal, submitter}) => {
    try {
        let response = await fetch(`${BASE_URL}?submitter=${submitter}`, {
            method: 'GET',
            headers,
            signal
        });
        return { status: response.status, data: await response.json() };
    } catch (error) {
        console.log(error)
    }
}

// children list by points
const boostedchildren = async ({ signal, parent }) => {
    try {
        let response = await fetch(`${BASE_URL}?parent=${parent}&rank=true`, {
            method: 'GET',
            headers,
            signal
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

// children list by default, createdAt
const newestchildren = async ({ signal, parent }) => {
    try {
        let response = await fetch(`${BASE_URL}?parent=${parent}`, {
            method: 'GET',
            headers,
            signal
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

// create
// submit mews
const submitmews = async ({ title, link, body, signal }) => {
    try {
        let response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers,
            signal,
            body: JSON.stringify({ title, link, body })
        });
        return { status: response.status, data: await response.json() };
    } catch (error) {
        console.log(error);
    }
};

// submit children
const submitchildren = async ({ parent, body, token, signal }) => {
    try {
        let response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
            signal,
            body: JSON.stringify({ parent, body })
        });
        return { status: response.status, data: await response.json() };
    } catch (error) {
        console.log(error);
    }
};

// read
const read = async ({ signal, mewsId }) => {
    try {
        let response = await fetch(`${BASE_URL}/${mewsId}`, {
            method: 'GET',
            headers,
            signal,
        });
        return { status: response.status, data: await response.json() };
    } catch (error) {
        console.log(error);
    }
};

// update
const updatemews = async ({ signal, token, mewsId, title, link, body }) => {
    try {
        let response = await fetch(`${BASE_URL}/${mewsId}`, {
            method: 'PUT',
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
            signal,
            body: JSON.stringify({ title, link, body })
        });
        return { status: response.status, data: await response.json() };
    } catch (error) {
        console.log(error);
    }
}
// +++++++ merge these two ++++++++++++++
// updatechild
const updatechild = async ({ signal, token, mewsId, body }) => {
    try {
        let response = await fetch(`${BASE_URL}/${mewsId}`, {
            method: 'PUT',
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
            signal,
            body: JSON.stringify({ body })
        });
        return { status: response.status, data: await response.json() };
    } catch (error) {
        console.log(error);
    }
}

const destroy = async ({ signal, token, mewsId }) => {
    try {
        let response = await fetch(`${BASE_URL}/${mewsId}`, {
            method: 'DELETE',
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
            signal
        });
        return { status: response.status, data: await response.json() };
    } catch (error) {
        console.log(error)
    }
}

const boost = async ({ signal, mewsId, token }) => {
    try {
        let response = await fetch(`${BASE_URL}/${mewsId}/boost`, {
            method: 'PUT',
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            },
            signal,
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const unboost = async ({ signal, mewsId, token }) => {
    try {
        let response = await fetch(`${BASE_URL}/${mewsId}/unboost`, {
            method: 'PUT',
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            },
            signal,
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const auth = () => {
    try {
        const credentials = JSON.parse(localStorage.getItem('credentials'))
        return credentials
            && credentials.token
            && credentials.user.username
            && credentials.user._id
            ? credentials
            : false
    } catch (error) {
        console.log(error)
    }
}

const mewsapi = {
    list,
    boostedmews,
    newestmews,
    submittersmews,
    boostedchildren,
    newestchildren,
    submitmews,
    submitchildren,
    read,
    updatemews,
    updatechild,
    destroy,
    boost,
    unboost,
    auth
};

export default mewsapi;