import { Modal, Button } from 'react-bootstrap'

export default function DeleteCategory(props) {
    return (
        <Modal show={props.formShow} onHide={() => props.setFormShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='text-center'>
                    Do you really want to delete this category?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={props.handleDelete}>
                    Delete
                </Button>
                <Button
                    variant='secondary'
                    onClick={() => props.setFormShow(false)}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
