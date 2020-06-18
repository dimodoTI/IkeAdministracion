import {
    css
} from "lit-element"

export const label = css `
label{
    position:absolute;
    color:var(--color-negro);
    border:none;
    background-color:transparent;
    outline:none;
    padding:.1rem;
    border-radius:0;
    pointer-events:none;
    font-family:inherit;
    font-size:inherit;
    font-weight:inherit;
}
label[oculto] {
    display: none;
}
label[error]{
    position: relative;
    transform: translateY(-80%);
    color:var(--color-rojo);
}
`