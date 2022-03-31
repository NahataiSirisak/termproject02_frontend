import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root{
        --neutral-light: hsl(222, 100%, 97%);
    }
    
    *{
        margin: 0;
        padding: 0;
        list-style: none;
        box-sizing: border-box;
    }

    body{
        background-color: var(--neutral-light);
        font-family: 'Open Sans', sans-serif;
    }

`

export default GlobalStyles;