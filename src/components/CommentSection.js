import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function CommentSection({ path }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const [text, setText] = useState('');
  const [review, setReview] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/comments/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setReview(data)
      });
  }, [path])

  const postData = (e) => {
    e.preventDefault()
    fetch(`${API_URL}/comments/createcomment`, {
      method: 'POST',
      mode: "cors",
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        gameId: path,
        text,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.error) {
          alert(data.error)
        } else {
          // created comment successfully
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <ContainerStyled>
      <div className='left-content'>
        {Object.entries(review).map(([key, value], index) => {
          return (
            <CommentBox>
              <div className='img'>
                <img src='https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' alt='' />
              </div>
              <div className='review'>
                <div className='head'>
                  <p>{value.text}</p>
                  <p></p>
                </div>
                <div className='sub'>
                  <p></p>
                </div>
              </div>
            </CommentBox>
          )
        })}
      </div>
      <div className='right-content'>
        <div className='textfield'>
          <textarea
            placeholder='Write review...'
            value={text}
            onChange={(e) => { setText(e.target.value) }}
          />
        </div>
        <button className='btn' onClick={(e) => postData(e)}>POST</button>
      </div>
    </ContainerStyled>
  )
}

const CommentBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 80%;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  .img{
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 30px;
    border: 3px solid #1C96F9;
    box-shadow: 4px 4px 10px #CED8F5;

    img{
      width: 100%;
      height: 100%;
    }
  }

  .review{
    display: flex;
    
    .head{

    }

    .sub{
      
    }
  }
`

const ContainerStyled = styled.div`
  display: grid;
  /* grid-template-columns: repeat(2, 1fr); */
  grid-template-columns: 2fr 40%;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;

  .left-content{
    box-shadow: 5px 5px 10px #CED8F5;
    margin-right: 1rem;
  }

  .right-content{
    padding: .5rem;
    box-shadow: 10px 10px 20px #ced8f5, -10px -10px 20px #f6f9ff;

    .textfield{
      height: 200px;
      width: 100%;
      border-radius: 15px;
      margin: 1rem 0;

      textarea{
        height: 200px;
        width: 100%;
        outline: none;
        border: none;
        border-radius: 10px;
        line-height: 1.4;
        padding: .5rem;
        background: #F0F4FF;
        box-shadow: inset 3px 3px 10px 2px #ced8f5;
        font-family: 'Open Sans', sans-serif;
      }
    }

    .btn{
      width: 80px;
      padding: .25rem .25rem;
      background-color: #1C96F9;
      cursor: pointer;
      outline: none;
      border: none;
      border-radius: 20px;
      color: white;
      transition: .3s;
    }

    .btn:hover{
        background-color: #1785F8;
    }
  }
`

export default CommentSection