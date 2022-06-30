import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'  
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'
import styled from "styled-components"

const GetCategories = () => {
    const [categories, setCategories] = useState([])
    const categoryDropdownData = [] 
    const categoryDropdownDataName = []


 useEffect(() => {
        async function getCategoryList() {
            try {
            
            const cuisine = 'http://localhost:3000/category/list'
            const cuisineData = await axios.get(cuisine)
            setCategories(cuisineData.data)
            } catch (e) {
                console.log(e)
            }
        }
        getCategoryList()
    }, []) 



    function getCategoryName(){
        return categories.map((category) => {
            
            return(
              categoryDropdownData.push(category._id),
              categoryDropdownDataName.push(category.name)

            )
    })  

    }


    const getCategoryElements = () => {
      return categories.map((category) => {
        return (
            <div key={category._id}>
                <NavLink to={"/cuisine/" + category._id}>  
                    <Button style={{ marginRight: "10px" }} variant="outline-primary">{category.name}</Button>
                </NavLink>
            </div>
        )
    })
  }

    return (
        getCategoryName(),
      <Margin>
      <div className="input-group pb-2">
      <h5 className="input-group">Filter Recipes by Cuisine</h5>
      {getCategoryElements()}
        </div>
        </Margin>

    )
  }
  

export default GetCategories

const Margin = styled.div`
margin-left: 20px;



`;