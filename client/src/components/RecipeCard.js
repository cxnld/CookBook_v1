import './styles.css'
import Card from 'react-bootstrap/Card'
import { useHistory } from 'react-router-dom'


const RecipeCard = ({ recipe }) => {
    const history = useHistory()
    console.log(recipe)

    const goToRecipe = () => {
        history.push({
            pathname: `/recipes/${recipe._id}`,
            details: recipe
        })
    }

    return (
        <Card className="recipeCard" onClick={goToRecipe} style={{ cursor: "pointer" }}>
            <Card.Img className="image" variant="top" src={recipe.image} />
            <Card.Body>
            <Card.Title>{recipe.title}</Card.Title>
            <Card.Text>{recipe.description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard