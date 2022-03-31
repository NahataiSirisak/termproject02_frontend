import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CommentSection from './components/CommentSection';

function PostDetails() {
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const [tag, setTag] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/posts/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setTag(data.tags)
        setPost(data)
      });
  }, [path])

  return (
    <>
      <h1 style={{ color: "#1785F8" }}>{post.title}</h1>
      <PostContainer>
        <div className='box'>
          <div className='left-content'>
            <img src={post.image} alt={post.title} />
          </div>
          <div className='right-content'>
            {post.description}<br />
            <br />
            <p>Release Date: </p>{post.release_date}<br />
            <br />
            <p>Developer: </p>{post.developer}<br />
            <p>Publisher: </p>{post.publisher}
            <div className='cont'>
              {tag.slice(0, 4).map((u, i) => {
                return (
                  <div key={i} className='tags'>{u}</div>
                )
              })}
            </div>
          </div>
        </div>
      </PostContainer>
      <CommentSection path={path} />
    </>
  )
}

const PostContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .box{
    max-width: 1140px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    text-align: left;
    background-color: white;
    box-shadow: 10px 10px 20px #ced8f5, -10px -10px 20px #f6f9ff;

    .left-content{
      height: 100%;
      overflow: hidden;

      img{
          width: 100%;
          height: 100%;
          object-fit: cover;
      }
    }

    .right-content{
      padding: 10px 10px;
      font-size: 14px;
      p{
        font-weight: 700;
        display: inline;
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
  }
`

export default PostDetails