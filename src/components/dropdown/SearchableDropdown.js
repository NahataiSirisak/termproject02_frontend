import React, { useState } from 'react';
import ConditionalRenderList from './ConditionalRenderList';
import Input from './Input';

function SearchableDropdown({ list, handleOnChange }) {
    const [search, setSearch] = useState('');
    const [toggle, setToggle] = useState(true);

    return (
        <>
            <Input
                onChange={(inputValue) => { setSearch(inputValue); setToggle(true); handleOnChange(inputValue) }}
                value={search}
            />
            <ConditionalRenderList 
                value={search}
                list={list}
                setValue={(v) => { setSearch(v); handleOnChange(v) }}
                toggle={toggle}
                setToggle={setToggle}
            />
        </>
    )
}

export default SearchableDropdown