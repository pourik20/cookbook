import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Ratio from 'react-bootstrap/Ratio';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

const RecipeBasicInfo = (props) => {
    const [recipeCategories, setRecipeCategories] = useState(null);
    const [dateOfCreation, setDateOfCreation] = useState(new Date());
    
    useEffect(() => {
        //date of creation
        setDateOfCreation(new Date(props.recipe.createdAt));

        //recipe categories
        setRecipeCategories(getRecipeCategories());
    }, [props.recipe]);

    //load categories of recipe
    function getRecipeCategories() {
        const result = [];

        props.recipe.categoryList.forEach(category => {
            result.push(<Card.Link key={category._id} className="pb-1 text-secondary">{category.name}</Card.Link>);
        });

        return result;
    };

    return (
        <>
            <Container>
                <Row>
                    <Col md={12} lg={4}>
                        <Ratio aspectRatio="4x3" className="h-100">
                            <Image src={props.image} alt="" rounded />
                        </Ratio>
                    </Col>
                    <Col md={12} lg={8}>
                        <Card border="secondary" className="h-100">
                            <Card.Body>
                                <Stack direction="horizontal" gap={2}>
                                    <Card.Title>Author:</Card.Title>
                                    <Card.Text className="pb-1">User123</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                    <Card.Title>Date of creation:</Card.Title>
                                    <Card.Text className="pb-1">{`${dateOfCreation.getDate()}. ${dateOfCreation.getMonth() + 1}. ${dateOfCreation.getFullYear()}`}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                    <Card.Title>Preparation length:</Card.Title>
                                    <Card.Text className="pb-1">{props.recipe.prepLength} min</Card.Text>
                                </Stack>
                                <Stack>
                                    <Card.Title>Category:</Card.Title>
                                    <Stack direction="horizontal" className="ps-3">
                                        {recipeCategories}
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <Card.Title>Description:</Card.Title>
                                    <Card.Text className="ps-3 text-dark overflow-auto">{props.recipe.description}</Card.Text>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default RecipeBasicInfo;