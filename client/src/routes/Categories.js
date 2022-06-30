import { useState, useEffect } from 'react'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import { MdDelete, MdEdit } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import CreateCategory from '../bricks/modals/CreateCategory'
import UpdateCategory from '../bricks/modals/UpdateCategory'
import DeleteCategory from '../bricks/modals/DeleteCategory'
import axios from 'axios'

export default function CategoryList() {
    const [categories, setCategories] = useState([])
    const [currentID, setCurrentID] = useState()
    const [showCreateCategory, setShowCreateCategory] = useState(false)
    const [showUpdateCategory, setShowUpdateCategory] = useState(false)
    const [showDeleteCategory, setShowDeleteCategory] = useState(false)

    const ICON_SIZE = 20

    useEffect(() => {
        async function getCategoryList() {
            try {
                const url = 'http://localhost:3000/category/list'
                const data = await axios.get(url)
                setCategories(data.data)
            } catch (e) {
                console.log(e)
            }
        }
        getCategoryList()
    }, [])

    const handleUpdate = (id) => {
        setShowUpdateCategory(true)
        setCurrentID(id)
    }

    const handleDelete = (id) => {
        setShowDeleteCategory(true)
        setCurrentID(id)
    }

    const createCategory = (data) => {
        const body = data
        const url = 'http://localhost:3000/category/create'

        try {
            axios.post(url, body)
            window.location.reload()
            // setCategories((prevCategories) => [...prevCategories, body])
        } catch (e) {
            console.log(e)
        }
        setShowCreateCategory(false)
    }

    const updateCategory = (data) => {
        const body = { id: currentID, name: data.name }
        const url = 'http://localhost:3000/category/update'

        try {
            axios.put(url, body)
            window.location.reload()
            // const newCategories = categories.map((x) =>
            //     x._id === currentID ? { ...x, name: data.name } : x
            // )
            // setCategories(newCategories)
        } catch (e) {
            console.log(e)
        }
        setShowUpdateCategory(false)
    }

    const deleteCategory = () => {
        const body = { id: currentID }
        const url = 'http://localhost:3000/category/delete'

        try {
            axios.delete(url, { data: body })
            window.location.reload()
            // const newCategories = categories.filter((x) => x._id !== currentID)
            // setCategories(newCategories)
        } catch (e) {
            console.log(e)
        }
        setShowDeleteCategory(false)
    }

    const getCategoryElements = () => {
        return categories.map((category) => {
            return (
                <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>
                        <Button
                            variant='primary'
                            size='sm'
                            onClick={() => handleUpdate(category._id)}
                        >
                            <MdEdit size={ICON_SIZE} />
                        </Button>
                    </td>
                    <td>
                        <Button
                            variant='danger'
                            size='sm'
                            onClick={() => handleDelete(category._id)}
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
                                <h2>Categories</h2>
                            </Col>
                            <Col>
                                <Button
                                    variant='success'
                                    onClick={() => setShowCreateCategory(true)}
                                >
                                    <IoAdd size={ICON_SIZE} />
                                </Button>
                            </Col>
                            <hr />
                        </Row>
                        <Table hover>
                            <tbody>{getCategoryElements()}</tbody>
                        </Table>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <UpdateCategory
                id={currentID}
                formShow={showUpdateCategory}
                setFormShow={setShowUpdateCategory}
                handleSubmit={updateCategory}
            />
            <DeleteCategory
                id={currentID}
                formShow={showDeleteCategory}
                setFormShow={setShowDeleteCategory}
                handleDelete={deleteCategory}
            />
            <CreateCategory
                formShow={showCreateCategory}
                setFormShow={setShowCreateCategory}
                handleSubmit={createCategory}
            />
        </div>
    )
}
