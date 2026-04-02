export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('jwt_token');
    const headers = {
        ...options.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
    return fetch(url, { ...options, headers });
};
