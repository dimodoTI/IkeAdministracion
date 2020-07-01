import {
    css
} from "lit-element"

export const cabecera1 = css`
#header{
    display:grid;
    align-content: center;
    justify-items: left;
    padding: 0 1.5rem 0 1.5rem;
    border-radius:0 0 20px 20px;
    background-color: var(--color-blanco);
    height: calc(100vh * .18)
 }
 #header div{
     display:grid
 }
 #header #bar{
    grid-gap:.3rem;
    align-items:center;
    grid-template-columns:auto 1fr;
}
 
#lblTitulo{
    font-size: var(--font-header-h1-size);
    font-weight: var(--font-header-h1-weight);
}
#lblLeyenda{
    background-color: transparent;
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);
}
`