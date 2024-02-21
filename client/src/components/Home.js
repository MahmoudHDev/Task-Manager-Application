import '../App.css'

const Home = () => {

    const username = "X"       // needs to edit

    return (<>
        <div className="container-fluid">
            <nav className="nav-container">
                <h1 className="text-center">Hello {username}</h1>
            </nav>
        </div>


        <div className='card-details'>

        </div>



    </>
    );
}

export default Home;