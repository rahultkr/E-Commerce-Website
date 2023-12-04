import React from 'react'
import { Route,Navigate } from 'react-router-dom';

import { isAuthenticated } from './index';

const PrivateRoutes = ({children}) => {
    

    if (isAuthenticated()) {
        return children;
    }
    else {
        return <Navigate to='/signin'/>
    }
}

export default PrivateRoutes