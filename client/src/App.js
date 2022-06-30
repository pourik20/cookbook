import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./core/layout";
import 'bootstrap/dist/css/bootstrap.min.css';

import Ingredients from "./routes/Ingredients";
import Categories from "./routes/Categories";
import RecipeDetail from "./routes/RecipeDetail";
import NoPage from "./routes/NoPage";
import Recipes from "./routes/Recipes";
import Cuisine from "./bricks/homepage/Cuisine";
import ReverseOrderPage from "./bricks/homepage/ReverseOrderPage";


function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Recipes />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="cuisine/:type" element={<Cuisine />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="categories" element={<Categories />} />
          <Route path="recipe" element={<RecipeDetail />} />
          <Route path="/reverse_order" element={<ReverseOrderPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
