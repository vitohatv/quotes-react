import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
    return <>
        <header className='header'>
            <div className='container'>
                <div className='header-links'>
                    <div className='header-links-wrapper'>
                        <div className='logo'>
                            <NavLink to='/' className='header-logo'>Quotes App</NavLink>
                        </div>
                        <NavLink to='/quotes' className='header-link'>Quotes</NavLink>
                        <NavLink to='/add-quote' className='header-link'>Submit new quote</NavLink>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <Outlet />
        </main>
    </>
};

export default Layout;