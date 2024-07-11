// src/pages/Callback.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { oauth2 as SMART } from 'fhirclient';

const Callback: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        SMART.ready()
            .then(client => {
                console.log('FHIR client ready:', client);
                // Save the client state to localStorage
                localStorage.setItem('fhirClient', JSON.stringify(client.state));
                console.log('Token stored in localStorage:', client.state);
                navigate('/'); // Redirect to the homepage after successful authorization
            })
            .catch(error => {
                console.error('Authorization error:', error);
                navigate('/'); // Redirect to the homepage or an error page
            });
    }, [location, navigate]);

    return <p>Loading...</p>;
};

export default Callback;
