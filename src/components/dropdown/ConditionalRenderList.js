import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function ConditionalRenderList({ value, list, setSearch, toggle, setToggle }) {
    if (value) {
        const filteredList = list.filter(item => item.title.toString().toLowerCase().startsWith(value.toLowerCase()));

        if (filteredList.length) {
            return (
                toggle &&
                (
                    <StyledList>
                        {
                            filteredList.map((item) =>
                                <StyledLink to={`/posts/${item._id}`}>
                                    <StyledItem
                                        onClick={() => { setToggle(false); setSearch(item.title) }}
                                    >
                                        <StyledImg>
                                            <img src={item.image} alt='img' />
                                        </StyledImg>
                                        <StyledText>
                                            {item.title}
                                        </StyledText>
                                    </StyledItem>
                                </StyledLink>)
                        }
                    </StyledList>
                )
            )
        }
        return (
            <StyledList>
                <StyledItem danger='#FF541E'>Not Found</StyledItem>
            </StyledList>
        )
    }
    return null;
}

const StyledList = styled.div`
    position: absolute;
    margin: .5rem;
    top: 4.5rem;
    left: 16rem;
    width: 20rem;
    border-radius: 0 0 15px 15px;
    background: white;
`

const StyledItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: inherit;
    padding: .5rem;
    border-bottom: 1px solid #ced8f5;

    &:last-child{
        border-radius: 0 0 15px 15px;
    }

    &:hover{
        background: ${({ danger }) => danger ? 'transparent' : '#1C96F9'};
        cursor: ${({ danger }) => danger ? 'initial' : 'pointer'};
    }
`

const StyledText = styled.div`
    color: ${({ danger }) => danger || 'black'};
    font-size: 14px;
    font-weight: 700;
    padding-left: 1rem;
`

const StyledImg = styled.div`
    height: 80px;
    min-width: 160px;
    overflow: hidden;
    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
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

export default ConditionalRenderList