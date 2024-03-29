import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';



const Home = () => {

    const [FullName, setUserName] = useState('x')   // needs to edit
    const arrTasks = ['Task1', 'Task2', 'Task3', 'Task4']
    const arrObjTasks = [{ title: 'Task1', strikeThrough: false },
    { title: 'Task2', strikeThrough: false },
    { title: 'Task3', strikeThrough: false }]

    const homeURI = 'http://localhost:9000/home';
    const state = useLocation();         // receiving component from use navigator 
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const handleTaps = (index) => {
        setSelectedItemIndex(index)
        console.log(index)
    }

    const handledelete = (index) => {

        console.log("Delete this index from DB" + index)
    }

    useEffect(() => {
        //Runs only on the first render
        console.log(state.state)
        setUserName(state.state.fName);
        const fetchListArr = async () => {
            console.log("Fetching")
            try {
                const response = await axios.get(homeURI)
                console.log(response.data)
            } catch (error) {
                console.log("Error from server" + error)
            }
        }
        fetchListArr()
    }, []);

    return (<>
        <nav className="nav-container d-flex justify-content-between">
            <h1 className="text-center">Hello {FullName}</h1>
            <Link to={'/logout'}>Logout</Link>
        </nav>
        <div className="container d-flex flex-column justify-content-center align-items-center home-container">
            <div className='card-details'>
                <ul className="tasks-list">

                    {arrTasks.map((item, index) => (
                        <div className='d-flex justify-content-between'>
                            <li
                                style={selectedItemIndex === index ? { textDecoration: "line-through" } : { textDecoration: 'none' }}
                                key={index}
                                class='selected-li'
                                onClick={() => handleTaps(index)}
                            >{item}</li>
                            <button className="btn btn-outline del-btn" onClick={() => handledelete(index)}><i class="fa-solid fa-trash"></i></button>
                        </div>
                    ))}
                    <form action='/home' method='post'>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control note-input" placeholder="Write something" />
                            <button className="btn add-btn" type="button" id="button-addon2"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </form>
                </ul>
            </div>
        </div>
    </>
    );
}

export default Home;