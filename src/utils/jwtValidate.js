import jwt from 'jsonwebtoken';

// Function to verify the JWT token
export const verifyToken = (token) => {
    const publicKey = process.env.REACT_APP_PUBLIC_KEY;

    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        return decoded;
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return null;
    }
};

