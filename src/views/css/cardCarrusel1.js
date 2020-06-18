import {
    css
} from "lit-element"

export const cardCarrusel1 = css`
    #ccar1DivCuerpo{
        width:98%;
        height:9.5rem;
        display: grid;
        background-color:var(--color-blanco);
        grid-template-columns: 75% 10% 15%;
        grid-template-rows: 1.5rem 2rem 2rem 2rem 1rem;
        grid-gap:0rem;
        align-items: center;
        justify-self:center;
        border-radius:.5rem;
        box-shadow: var(--shadow-elevation-6-box);
        font-size: var(--font-label-size);
        font-weight: var(--font-label-weight); 
        border: solid 1px var(--color-gris);
    }
    .ccar1SvgOpciones{
        justify-self: center;
    }
    .ccar1SvgOpciones svg{
        width:1rem;
        height:1rem;          
        cursor:pointer;
    }
    #ccar1DivColor{
        padding-left: .5rem;            
    }
    #ccar1DivTitulo{
        grid-column-start:1;
        grid-column-end:4;
        font-size: var(--font-header-h1-menos-size);
        font-weight: var(--font-header-h1-menos-weight);  
        padding-left: .5rem;            
    }
    #ccar1DivHttp{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
    #ccar1DivImagen{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
    #ccar1DivOrden{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
`