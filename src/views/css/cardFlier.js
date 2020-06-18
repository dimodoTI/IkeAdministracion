import {
    css
} from "lit-element"

export const cardFlier = css`
    #cflierDivCuerpo{
        width:98%;
        height:10rem;
        display: grid;
        background-color:var(--color-blanco);
        grid-template-columns: 75% 10% 15%;
        grid-template-rows: 1.5rem 2rem 2rem 2rem 2rem;
        grid-gap:0rem;
        align-items: center;
        justify-self:center;
        border-radius:.5rem;
        box-shadow: var(--shadow-elevation-6-box);
        font-size: var(--font-label-size);
        font-weight: var(--font-label-weight); 
        border: solid 1px var(--color-gris);
    }
    .cflierSvgOpciones{
        justify-self: center;
    }
    .cflierSvgOpciones svg{
        width:1rem;
        height:1rem;          
        cursor:pointer;
    }
    #cflierDivColor{
        padding-left: .5rem;            
    }
    #cflierDivTitulo{
        grid-column-start:1;
        grid-column-end:4;
        font-size: var(--font-header-h1-menos-size);
        font-weight: var(--font-header-h1-menos-weight);  
        padding-left: .5rem;            
    }
    #cflierDivBoton{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
    #cflierDivHttp{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
    #cflierDivImagen{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
`