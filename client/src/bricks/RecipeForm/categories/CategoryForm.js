import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


const CategoryForm = (props) => {
    const [categoryId, setCategoryId] = useState("1");
    const [categoryOptions, setCategoryOptions] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(categoryId);
    };

    useEffect(() => {
        let isFirstOption = true;
        const recipeCategoriesId = props.recipeCategories.map((recipeCategory) => { return recipeCategory._id });

        setCategoryOptions(props.categoryList.map((category) => {
            if (!recipeCategoriesId.includes(category._id)) {

                if(isFirstOption){
                    setCategoryId(category._id);
                    isFirstOption = false;
                }

                return <option key={category._id} value={category._id}>{category.name}</option>;
            }
        }));
    }, [props.recipeCategories]);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Category:</InputGroup.Text>
                    <Form.Control
                        as="select"
                        id="Category"
                        defaultValue=""
                        title="Category"
                        arial-label="Category"
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        {categoryOptions}
                    </Form.Control>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </InputGroup>
            </Form>
        </>
    );
};

export default CategoryForm;