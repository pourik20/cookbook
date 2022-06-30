import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const ShareRecipe = (props) => {

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Share Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Url:</InputGroup.Text>
                            <Form.Control
                                type="text"
                                id="Url"
                                defaultValue={window.location.href}
                                title="Url"
                                arial-label="Url"
                            />
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {navigator.clipboard.writeText(window.location.href)}}>
                        Copy
                    </Button>
                    <Button variant="secondary" onClick={props.onHide}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ShareRecipe;