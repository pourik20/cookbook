import { useEffect, useState } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import cake from "../../images/cake.jpg"
import cake2 from "../../images/cake2.jpg"
import gingerbread from "../../images/gingerbread.jpg"
import propTypes from "prop-types";
import React from 'react'


const IngredientList = (props) => {
    const [ingredients, setIngredients] = useState([])
    const imagesGallery = [cake, cake2, gingerbread]

    useEffect(() => {
        async function getIngredientList() {
            try {
                const url = ('http://localhost:3000/recipe/list');
                let data
                let cuisineName = props.Cuisine
                const body1 = {
                    filter: {
                        categoryList: {
                            "$in": cuisineName

                        }
                    }
                }
                const body2 = { filter: {} }

                if (cuisineName === undefined) {
                    data = await axios.post(url, body2)
                } else {
                    data = await axios.post(url, body1)
                };
                setIngredients(data.data)
            } catch (e) {
                console.log(e)
            }
        }
        getIngredientList()
    }, [props.Cuisine])


    function getIngredientElements() {
        return ingredients.map((ingredient) => {
            let image = imagesGallery[Math.floor(Math.random() * 3)];
            return (
                <Col sm={12} md={4} xl={3} className="my-3" key={ingredient._id} >
                    <Card className="h-100 m-3">
                        <Card.Body className="d-flex justify-content-between flex-column">
                            <Card.Title className="text-center">{ingredient.name}</Card.Title>

                            <Card.Img variant="top" src={image} />
                            <div className="d-flex justify-content-center">
                                <Button style={{ marginTop: "50px" }} variant="outline-primary" href={`/recipe?id=${ingredient._id}&img=${image}`}>Show</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            )
        })
    }

    return (
        <Container fluid>
            <Row>
                {getIngredientElements()}
            </Row>
        </Container>
    )
}


export default IngredientList

IngredientList.propTypes = {
    Cuisine: propTypes.string
};