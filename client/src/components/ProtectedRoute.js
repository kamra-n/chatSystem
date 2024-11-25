import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));

        if (token) {
            const jwtToken = token.split('=')[1];
            const decodedToken = jwtDecode(jwtToken);

            if (decodedToken.exp * 1000 < Date.now()) {
                navigate('/email'); // Redirect to email page if token expired
            }
        } else {
            navigate('/email'); // Redirect if token does not exist
        }
    }, [navigate]);

    return children;
}

export default ProtectedRoute;
