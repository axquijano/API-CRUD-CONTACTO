import React from 'react';
import { useAuth } from '../context/AuthContext';

const ContactPage = () => {

    const {user} = useAuth();
    console.log(user);

    return (

        <div>
            Contact Page
        </div>
    );
}

export default ContactPage;
