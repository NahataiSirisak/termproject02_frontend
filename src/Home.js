import React from 'react';
import Post from './components/Post';
import styled from 'styled-components';

function Home() {
    return (
        <PostsStyled>
            <Post />
        </PostsStyled>
    )
}

const PostsStyled = styled.div`
  
`

export default Home