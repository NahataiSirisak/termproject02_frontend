import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import bg from './images/16.jpg';
import { UserContext } from './App'

function Login() {
  const API_URL = process.env.REACT_APP_API_URL;

  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const postData = (e) => {
    e.preventDefault()
    fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      mode: "cors",
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.error) {
          alert(data.error)
        } else {
          localStorage.setItem('jwt', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          dispatch({ type: 'USER', payload: data.user })
          navigate('/posts')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <ContainerStyled>
      <div className='login-box'>
        <div className='left-content'>
          <img src={bg} alt='bg' />
        </div>
        <form className='right-content'>
          <h2>WELCOME!</h2>
          <div className='field'>
            <div className='icon'>
              <FaUser />
            </div>
            <input
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='field'>
            <div className='icon'>
              <FaLock />
            </div>
            <input
              type='text'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='btn' onClick={(e) => postData(e)}>Sign In</button>
          <div className='signup'>
            <p>Don't have an account yet? </p>
            <NavLink to='/signup'>Sign Up</NavLink>
          </div>
        </form>
      </div>
    </ContainerStyled>
  )
}

const NavLink = styled(Link)`
  text-decoration: none;
  color: #BCEA73;
  font-size: small;
  
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    font-weight: 700;
  }
`

const ContainerStyled = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70vh;
    padding: 20px 100px;

    .login-box{
        max-width: 850px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: white;
        border-radius: 20px;
        box-shadow: 0px 0px 20px 5px #CED8F5;

        .left-content{
            height: 100%;
            border-radius: 20px 0px 0px 20px;
            overflow: hidden;

            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .right-content{
            padding: 25px 40px;

            h2{
                position: relative;
                padding-bottom: 10px;
                margin-bottom: 10px;
            }

            h2:after{
                content: '';
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                height: 4px;
                width: 50px;
                border-radius: 2px;
                background-color: #BCEA73;
            }

            .field{
                min-width: 380px;
                width: 100%;
                height: 55px;
                background-color: #f0f0f0;
                margin: 10px 0;
                border-radius: 30px;
                display: grid;
                grid-template-columns: 15% 85%;
                padding: 0.5rem 1rem;

                .icon{
                    text-align: center;
                    line-height: 45px;
                    color: #acacac;
                    font-size: 1.1rem;
                }

                input{
                    background: none;
                    outline: none;
                    border: none;
                    line-height: 1.6;
                    font-size: 1.1rem;
                    color: black;
                }
            }

            .btn{
                width: 150px;
                height: 40px;
                padding: 0.5rem 1rem;
                font-size: 1.1rem;
                background-color: #BCEA73;
                cursor: pointer;
                outline: none;
                border: none;
                border-radius: 30px;
                color: white;
                transition: .3s;
            }

            .btn:hover{
                background-color: #B1DC6D;
            }

            .signup{
              margin-top: 1rem;

              p{
                font-size: small;
                display: inline;
              }
            }
        }
    }
`

export default Login