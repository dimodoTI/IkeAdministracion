import {
    css
} from "lit-element"

export const cardCarrusel2 = css`
    #ccar2DivCuerpo{
        width:98%;
        height:7.5rem;
        display: grid;
        background-color:var(--color-blanco);
        grid-template-columns: 75% 10% 15%;
        grid-template-rows: 1.5rem 2rem 2rem 1rem;
        grid-gap:0rem;
        align-items: center;
        justify-self:center;
        border-radius:.5rem;
        box-shadow: var(--shadow-elevation-6-box);
        font-size: var(--font-label-size);
        font-weight: var(--font-label-weight); 
        border: solid 1px var(--color-gris);
    }
    .ccar2SvgOpciones{
        justify-self: center;
    }
    .ccar2SvgOpciones svg{
        width:1rem;
        height:1rem;          
        cursor:pointer;
    }
    #ccar2DivColor{
        padding-left: .5rem;            
    }
    #ccar2DivHttp{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
    #ccar2DivImagen{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
    #ccar2DivOrden{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
`