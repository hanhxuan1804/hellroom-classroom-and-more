export const registerUser = async (data) => {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if(response.ok) {
        return result;
    }

    let error = '';
    for (var key of Object.keys(result)) {
        error += result[key].message + '. ';
    }
    throw new Error(error);
}

export const loginUser = async (data) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
        ,
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if(response.ok) {
        return result;
    }
    throw new Error(result.message);
}

export const userProfile = async (token) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    });
    const result = await response.json();
    if(response.ok) {
        return result.user;
    }
    throw new Error(result.message);
}
