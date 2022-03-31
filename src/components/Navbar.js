import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { UserContext } from '../App';
import logo from '../images/ufo.png';
import SearchableDropdown from './dropdown/SearchableDropdown';

function Navbar() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [titleList, setTitleList] = useState([]);
    const { state, dispatch } = useContext(UserContext);

    const renderList = () => {
        if (state) {
            return (
                <>
                    <SearchableDropdown
                        list={titleList}
                        handleOnChange={(e) => console.log(e)}
                    />
                    <NavMenu>
                        <NavLink to='/myreviews'>My reviews</NavLink>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink
                            to="/login"
                            onClick={() => {
                                localStorage.clear()
                                dispatch({ type: 'CLEAR' })
                            }}
                        >
                            Sign Out
                        </NavBtnLink>
                    </NavBtn>
                </>
            )
        } else {
            return (
                <NavBtn>
                    <NavBtnLink to="/login">Sign In</NavBtnLink>
                </NavBtn>
            )
        }
    }

    useEffect(() => {
        fetch(`${API_URL}/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setTitleList(data)
            });
    }, []);
    return (
        <>
            <Nav>
                <div className='container'>
                    <div className='logo'>
                        <img src={logo} alt='' />
                    </div>
                    <NavHomeLink to={state ? '/' : '/login'}>
                        <h2>GAME REVIEWS</h2>
                    </NavHomeLink>
                </div>
                {renderList()}
                {/* <Profile>
                    <div className='img'>
                        <img src={logo} alt='' />
                    </div>
                    <p>User123456</p>
                </Profile> */}
            </Nav>
        </>
    )
}

const Profile = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem;

    .img {
        width: 40px;
        height: 40px;
        overflow: hidden;
        margin-left: 10px;
        margin-right: 10px;
        border: 2px solid #A8E7EF;
        border-radius: 20px;

        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
`

const NavHomeLink = styled(Link)`
    text-decoration: none;
`

const Nav = styled.nav`
    background: #F0F4FF;
    border-radius: 15px;
    box-shadow: 10px 10px 20px #ced8f5, -10px -10px 20px #f6f9ff;
    margin: 30px 0;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* padding: 0.5rem calc((100vw - 1000px) / 2); */
    z-index: 10;

    .container {
        display: flex;
        align-items: center;

        .logo {
            width: 40px;
            height: 40px;
            overflow: hidden;
            margin-left: 15px;

            img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        h2 {
            color: #8A8A8A;
            padding: 5px 10px;
        }
    }
`

const NavLink = styled(Link)`
    font-weight: 600;
    color: #8A8A8A;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    margin: 0 1rem;
    height: 100%;
    cursor: pointer;

    &:hover {
        color: #1785F8;
    }
`

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    border-right: 1.5px solid #CED8F5;
    border-left: 1.5px solid #CED8F5;
    height: 32px;
`

const NavBtn = styled.button`
    display: flex;
    align-items: center;
    margin: 0 1rem;
    border-radius: 10px;
    border: none;
`

const NavBtnLink = styled(Link)`
    display: flex;
    font-weight: 600;
    border-radius: 20px;
    background: #1C96F9;
    padding: .5rem 1rem;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #1785F8;
        color: white;
    }
`

export default Navbar