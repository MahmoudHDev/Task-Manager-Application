import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

    const username = "X"       // needs to edit
    const arrTasks = ['Task1', 'Task2', 'Task3', 'Task4']
    const homeURI = 'http://localhost:9000/home'

    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const handleTaps = (index) => {
        setSelectedItemIndex(index)
    }
    useEffect(() => {
        //Runs only on the first render
        const fetchListArr = async () => { 
            console.log("Fetching")
            try{ 
                const response = await axios.get(homeURI)
                console.log(response.data)
            }catch (error){ 
                console.log("Error from server" + error)
            }
            
        }
        fetchListArr()
    }, []);


    return (<>
        <nav className="nav-container d-flex justify-content-between">
            <h1 className="text-center">Hello {username}</h1>
            <Link to={'/logout'}>Logout</Link>
        </nav>
        <div className="container d-flex flex-column justify-content-center align-items-center home-container">
            <div className='card-details'>
                <ul className="tasks-list">

                    {arrTasks.map((item, index) => (
                        <div className='d-flex justify-content-between'>
                            <li
                                style={selectedItemIndex === index ? { color: 'red' } : { color: 'black' }}
                                key={index}
                                class='selected-li'
                                onClick={() => handleTaps(index)}
                            >{item}</li>
                            <button className="btn btn-warning del-btn">-</button>
                        </div>
                    ))}

                    <form action='/home' method='post'>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control note-input" placeholder="Write something" />
                            <button className="btn btn-light add-btn" type="button" id="button-addon2">+</button>
                        </div>
                    </form>
                </ul>
            </div>
        </div>
    </>
    );
}

export default Home;