import {
    css
} from "lit-element"

export const input = css `
input{
    position:absolute;
    color:var(--color-negro);
    border:none;
    background-color:transparent;
    outline:none;
    padding-top:.1rem;
    padding-botton:.1rem;
    padding-left:.3rem;
    padding-right:.3rem;
    border-radius:0;
    border-bottom:1px solid var(--color-negro);
    font-family:inherit;
    font-size:inherit;
    font-weight:inherit;
}

input:focus{
    border-bottom:2px solid var(--color-celeste);
    background-color: var(--color-gris-claro);
    border-top-left-radius:.3rem;
    border-top-right-radius:.3rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance:textfield;
}

::-webkit-input-placeholder { /* Edge */
    color: rgba(255,255,255,.6)
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255,255,255,.6);
}

::placeholder {
    color: rgba(255,255,255,.6);
}
`