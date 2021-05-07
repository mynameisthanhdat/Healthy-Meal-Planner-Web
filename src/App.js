import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/header/header";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import CartList from "./pages/cart/cart";
import { useSelector } from 'react-redux';
import {NotFoundPage, FoodPage, SpecialPage, MenuDetail, FoodInfo} from './pages'

function App() {
  const count = useSelector(state => state.homeReducer?.count)
  return (
      <BrowserRouter>
        <Header numberOfItems={count} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/special' component={SpecialPage} />
          <Route exact path='/food' component={FoodPage} />
          <Route path='/contact' component={Contact} />
          <Route path='/about' component={About} />
          <Route path='/cart' component={CartList} />
          <Route path='/menu/:id' component={MenuDetail} />
          <Route path='/cook/:id' component={FoodInfo} />
          <Route component={NotFoundPage}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;