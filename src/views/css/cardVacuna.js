import {
    css
} from "lit-element"

export const cardVacuna = css`
    #cvacDivCuerpo{
        width:100%;
        height:3.2rem;
        display: grid;
        background-color:var(--color-blanco);
        grid-template-columns: 75% 10% 15%;
        grid-template-rows: 1.3rem .7rem 1.2rem;
        grid-gap:0rem;
        align-items: center;
        border-radius:.5rem;
        box-shadow: var(--shadow-elevation-3-box);
        font-size: var(--font-label-size);
        font-weight: var(--font-label-weight); 
    }
    .svgOpciones{
        justify-self: center;
    }
    .svgOpciones svg{
        width:1rem;
        height:1rem;          
        cursor:pointer;
    }
    .cvacSvgHidden{
        display:none;
    }
    #cvacDivNombre{
        grid-column-start:1;
        grid-column-end:4;
        font-size: var(--font-header-h1-menos-size);
        font-weight: var(--font-header-h1-menos-weight);  
        padding-left: .5rem;            
    }
    #cvacDivActivo{
        grid-column-start:1;
        grid-column-end:3;
        padding-left: .5rem;            
    }
    #cvacDivTipo{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
`