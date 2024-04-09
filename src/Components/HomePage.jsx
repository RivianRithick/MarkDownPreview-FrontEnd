import React from 'react';
import './Style/Home.css'
import { useNavigate } from 'react-router-dom';


const HomePage = ({ username, email }) => {
    const navigate = useNavigate()


    const handleCLick = () => {
        navigate(`/urlshortener/${email}`)
    }
    return (
        <div className=' box-container d-flex justify-content-center'>
            <div class="card" style={{width:"50rem"}}>
                <div class="card-body">
                    <h1 class="card-title text-center">Hello {username} !</h1>
                    <p class="card-text text-center">Welcome to MarkDown Preview Application</p>
                    {/* <div className='d-flex justify-content-center'>
                    <button className='btn btn-success' onClick={handleCLick}>Url Shortener</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
 