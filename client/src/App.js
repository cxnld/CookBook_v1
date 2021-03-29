import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home'
import Recipes from './components/Recipes'
import Register from './components/Register'
import Login from './components/Login'
import NewRecipe from './components/NewRecipe';
import RecipeDetails from './components/RecipeDetails';

import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function App() {
    const jwt = sessionStorage.getItem("jwt")
    const onLogout = () => {
        sessionStorage.removeItem("jwt")
        console.log(jwt)
    }

    return (
        <div className="App">
            <Router>
                <Navbar bg="dark" variant="dark" className="navb">
                    <Navbar.Brand>CookBook</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/recipes">My Recipes</Nav.Link>
                    </Nav>
                    <Nav>
                        {jwt ?
                            <Nav.Link href="/home" className="justify-content-end" onClick={onLogout}>Logout</Nav.Link>
                        :
                            <Nav.Link href="/login" className="justify-content-end">Login</Nav.Link>
                        }
                    </Nav>
                   
                </Navbar>
                <div className="Content">
                    <Switch>
                        <Route path='/' exact component={Home}></Route>
                        <Route path='/home' exact component={Home}></Route>
                        <Route path='/login' exact component={Login}></Route>
                        <Route path='/register' exact component={Register}></Route>
                        <Route path='/recipes' exact component={Recipes}></Route>
                        <Route path='/recipes/new-recipe' exact component={NewRecipe}></Route>
                        <Route path='/recipes/:id' exact component={RecipeDetails}></Route>
                    </Switch>
                </div> 
            </Router>
        </div>
    )
}

export default App;