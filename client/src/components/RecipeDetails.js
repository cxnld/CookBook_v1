import {useState, useEffect } from 'react'
import axios from 'axios'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const RecipeDetails = ({ match }) => {
    const jwt = sessionStorage.getItem("jwt")
    const [recipeDetails, setRecipeDetails] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3001/recipes', {
            headers: {  
                'auth-token': jwt
            }})
        .then((res) => {
            const x = res.data.recipes.find(x => x._id === match.params.id)
            console.log(x)
            setRecipeDetails(x)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [jwt, match.params.id])

    return (
        <div className="contentContainer">
                {loading?
                    <h1>Cannot find JWT</h1>
                    :
                    <div className="recipeContainer">
                        <img className="image" alt="recipe_image" src={recipeDetails.image} />
                        <h1>{recipeDetails.title}</h1>
                        <br/>
                        <h4>{recipeDetails.description}</h4>
                        <br/>
                        <h3>Instructions</h3>
                        <br/>
                        {recipeDetails.instructions.map((step, index) => {
                            return (
                                <div key={index}>
                                    <h6>Step {index+1}</h6>
                                    <h5>{step}</h5>
                                </div>
                            )
                        })}
                    </div>
                }
        </div>
    )
}

export default RecipeDetails    
/*

*/