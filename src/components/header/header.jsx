import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/imgs/logo.png';
import { Icon } from "semantic-ui-react";
import './header.scss';

const Header = (props) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <img className='logo' src={logo}/>
        </Link>
        <div className='options'>
            <Link className='option' to='/'>
                TRANG CHỦ
            </Link>
            <Link className='option' to='about'>
                GIỚI THIỆU
            </Link>
            <Link className='option' to='contact'>
                LIÊN HỆ
            </Link>
            <Link to='cart' className="d-flex">
                <Icon name="cart" className='cart'/> <div className="number">{props.numberOfItems}</div>
            </Link>
        </div>
    </div>
)

export default Header;