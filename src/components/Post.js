import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Post() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [gameList, setGameList] = useState([]);

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
        console.log(data)
        setGameList(data)
      });
  }, []);

  return (
    <PostStyled>
      {gameList.map((v, i) => {
        return (
          <div key={i} className='box'>
            <StyledLink to={`/posts/${v._id}`}>
              <div className='image'>
                <img src={v.image} alt={v.title} />
              </div>
              <h3>{v.title}</h3>
              <div className='cont'>
                {v.tags.slice(0, 4).map((u, i) => {
                  return (
                    <div key={i} className='tags'>{u}</div>
                  )
                })}
              </div>
            </StyledLink>
          </div>
        )
      })}
    </PostStyled>
  )
}

const PostStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding-top: 2rem;
  .box{
    /* background-color: palevioletred; */
    border-radius: 20px;
    box-shadow: 10px 10px 20px #ced8f5, -10px -10px 20px #f6f9ff;
    .image{
      height: 200px;
      width: 100%;
      overflow: hidden;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      transition: all .4s ease-in-out;
      img{
        height: 100%;
        width: 100%;
        transition: all .4s ease-in-out;
        object-fit: cover;
        &:hover{
          transform: scale(1.2);
        }
      }
    }
    h3{
      padding: .5rem;
    }
    .cont{
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #ced8f5;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      justify-content: space-between;
      .tags{
        border-radius: 10px;
        box-shadow: 5px 5px 10px #ced8f5, -5px -5px 10px #f6f9ff;
        font-size: 12px;
        padding: 4px;
        margin: .5rem;;
        background-color: #BCEA73;
        color: white;
        text-align: center;
      }
    }
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color: inherit;
  }
`

export default Post