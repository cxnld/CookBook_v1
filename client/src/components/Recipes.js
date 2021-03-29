import { useState, useEffect } from 'react'
import axios from 'axios'

import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import RecipeCard from './RecipeCard'
import { Link } from 'react-router-dom'

const Home = () => {
    const jwt = sessionStorage.getItem("jwt")
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3001/recipes', {
            headers: {
                'auth-token': jwt
            }})
        .then((res) => {
            setRecipes(res.data.recipes)
            setLoading(false)
        })
    }, [jwt])

    return (
        <div className="contentContainer">
            {!loading ?
                <div className="recipeGrid">
                    {recipes.map((recipe, index) => {
                        return (
                            <RecipeCard key={index} recipe={recipe}></RecipeCard>
                        )
                    })}
                </div>
                :
                <h1>Not Logged In</h1>
            }

            <div className="buttonContainer">
                <Link to="/recipes/new-recipe">
                    <Button variant="info" >Create a new recipe</Button>
                </Link>
            </div>

        </div>
    )
}

export default Home