import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../assets/images/notFound.png';

const PageNotFound = () => {

    return (
        <div className='container'>
            <img src={notFound} alt=''/>
            <p style={{textAlign:"center"}}>
                <button className='buy__btn mb-4'>
                    <Link to="/">Go to Home </Link>
                </button>
            </p>
        </div >
    )
}
export default PageNotFound
