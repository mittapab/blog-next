import React from 'react'
import Header from './Header.component';

const Layout = ({children}) => {

    return (
        <React.Fragment>
           <Header />
                {children}
            <h2>Footer</h2>
        </React.Fragment>
    )

}

export default Layout;