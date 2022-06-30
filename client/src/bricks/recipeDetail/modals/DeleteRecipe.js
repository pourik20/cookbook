import { Route, Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteRecipe = (props) => {
    function deleteRecipe() {
        fetch("recipe/delete", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "id": props.recipeId
            })
        }).then(response => {
            if (response.ok) {
                props.onHide();
                window.location.href = "/";
            }
        })


    }

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete this recipe?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteRecipe}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={props.onHide}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteRecipe;