import {
    css
} from "lit-element"

export const cardUsuarios = css`
    #cuDivCuerpo{
        width:100%;
        height:3.5rem;
        display: grid;
        background-color:var(--color-blanco);
        grid-template-columns: 75% 10% 15%;
        grid-template-rows: 1.3rem 1.2rem 1rem;
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
    .cuSvgHidden{
        display:none;
    }
    #cuDivMail{
        padding-left: .5rem;            
    }
    #cuDivNombre{
        grid-column-start:1;
        grid-column-end:2;
        font-size: var(--font-header-h1-menos-size);
        font-weight: var(--font-header-h1-menos-weight);  
        padding-left: .5rem;            
    }
    #cuDivActivo{
        grid-column-start:2;
        grid-column-end:4;
    }
    #cuDivDocumento{
        padding-left: .5rem;            
        grid-column-start:1;
        grid-column-end:4;
    }
    /*
    #cuDivClase{
        grid-column-start:2;
        grid-column-end:4;
        overflow-wrap: break-word;
    }
    */
`