import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Home from './Home';
import PostDetails from './PostDetails';
import Login from './Login';
import Signup from './Signup';
import { userReducer, initialState } from './reducer/userReducer';
import MyReviews from './MyReviews';

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    // console.log(typeof(user), user)
    if (user) {
      dispatch({ type: 'USER', payload: user })
      navigate('/')
    }else {
      navigate('/login')
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/posts' />} />
      <Route path='/posts' element={<Home />} />
      <Route path='/posts/:id' element={<PostDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/myreviews' element={<MyReviews />} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <MainContentStyled>
          <Navbar />
          <Routing />
        </MainContentStyled>
      </Router>
    </UserContext.Provider>
  );
}

const MainContentStyled = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 80%;
  height: 100vh;
  transform: translateX(-50%);
  /* background-color: palevioletred; */
`

export default App;
