import { useEffect, useState } from 'react'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import { MdDelete, MdEdit } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import CreateIngredient from '../bricks/modals/CreateIngredientModal'
import UpdateIngredient from '../bricks/modals/UpdateIngredient'
import DeleteIngredient from '../bricks/modals/DeleteIngredient'
import axios from 'axios'
import units from '../storage/units'

const IngredientList = () => {
    const [ingredients, setIngredients] = useState([])
    const [currentID, setCurrentID] = useState()
    const [showCreateIngredient, setShowCreateIngredient] = useState(false)
    const [showUpdateIngredient, setShowUpdateIngredient] = useState(false)
    const [showDeleteIngredient, setShowDeleteIngredient] = useState(false)

    const ICON_SIZE = 20

    useEffect(() => {
        async function getIngredientList() {
            try {
                const url = 'http://localhost:3000/ingredient/list'
                const data = await axios.get(url)
                setIngredients(data.data)
            } catch (e) {
                console.log(e)
            }
        }
        getIngredientList()
    }, [])

    const createIngredient = (data) => {
        const body = data
        const url = 'http://localhost:3000/ingredient/create'

        try {
            axios.post(url, body)
            window.location.reload()
            // setIngredients((prevIngredients) => [...prevIngredients, body])
        } catch (e) {
            console.log(e)
        }
        setShowCreateIngredient(false)
    }

    const updateIngredient = (data) => {
        const body = {
            id: currentID,
            name: data.name,
            units: data.units,
        }
        const url = 'http://localhost:3000/ingredient/update'

        try {
            axios.put(url, body)
            window.location.reload()
            // const newIngredients = ingredients.map((x) =>
            //     x._id === currentID
            //         ? { ...x, name: data.name, units: data.units }
            //         : x
            // )
            // setIngredients(newIngredients)
        } catch (e) {
            console.log(e)
        }
        setShowUpdateIngredient(false)
    }

    const deleteIngredient = () => {
        const body = { id: currentID }
        const url = 'http://localhost:3000/ingredient/delete'

        try {
            axios.delete(url, { data: body })
            window.location.reload()
            // const newIngredients = ingredients.filter(
            //     (x) => x._id !== currentID
            // )
            // setIngredients(newIngredients)
        } catch (e) {
            console.log(e)
        }
        setShowDeleteIngredient(false)
    }

    const handleDelete = (id) => {
        setShowDeleteIngredient(true)
        setCurrentID(id)
    }

    const handleUpdate = (id) => {
        setShowUpdateIngredient(true)
        setCurrentID(id)
    }

    function getIngredientElements() {
        return ingredients.map((ingredient) => {
            return (
                <tr key={ingredient._id}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.units}</td>
                    <td>
                        <Button
                            variant='primary'
                            size='sm'
                            onClick={() => handleUpdate(ingredient._id)}
                        >
                            <MdEdit size={ICON_SIZE} />
                        </Button>
                    </td>
                    <td>
                        <Button
                            variant='danger'
                            size='sm'
                            onClick={() => handleDelete(ingredient._id)}
                        >
                            <MdDelete size={ICON_SIZE} />
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Row>
                            <Col xs={10}>
                                <h2>Ingredients</h2>
                            </Col>
                            <Col>
                                <Button
                                    variant='success'
                                    onClick={() =>
                                        setShowCreateIngredient(true)
                                    }
                                >
                                    <IoAdd size={ICON_SIZE} />
                                </Button>
                            </Col>
                            <hr />
                        </Row>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Unit</th>
                                </tr>
                            </thead>
                            <tbody>{getIngredientElements()}</tbody>
                        </Table>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <UpdateIngredient
                id={currentID}
                formShow={showUpdateIngredient}
                units={units}
                setFormShow={setShowUpdateIngredient}
                handleSubmit={updateIngredient}
            />
            <DeleteIngredient
                id={currentID}
                formShow={showDeleteIngredient}
                setFormShow={setShowDeleteIngredient}
                handleDelete={deleteIngredient}
            />
            <CreateIngredient
                formShow={showCreateIngredient}
                units={units}
                setFormShow={setShowCreateIngredient}
                handleSubmit={createIngredient}
            />
        </div>
    )
}

export default IngredientList
