import '../App.css'

const Home = () => {

    const username = "X"       // needs to edit





    return (<>
        <nav className="nav-container">
            <h1 className="text-center">Hello {username}</h1>
        </nav>
        <div className="container d-flex flex-column justify-content-center align-items-center home-container">
            <div className='card-details'>
                <ul className="tasks-list">
                    <li onClick={(e)=>console.log(e.target.innerText)}>Hello World <button className="btn btn-warning">-</button></li>
                    <li onClick={(e)=>console.log(e.target.innerText)}>Hello WorldHello World</li>
                    <li onClick={(e)=>console.log(e.target.innerText)}>Hello WorldHello WorldWorldHello World </li>
                    <form action='/home' method='post'>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Write something" />
                                <button class="btn btn-light" type="button" id="button-addon2">+</button>
                        </div>
                    </form>
                </ul>



            </div>
        </div>

    </>
    );
}

export default Home;