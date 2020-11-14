import {
    css
} from "lit-element"

export const cardOnboarding = css`
    #cobDivCuerpo{
        width:98%;
        height:6.5rem;
        display: grid;
        background-color:var(--color-blanco);
        grid-template-columns: 75% 10% 15%;
        grid-template-rows: 1.3rem 1.2rem 2rem 1rem;
        grid-gap:0rem;
        align-items: center;
        justify-self:center;
        border-radius:.5rem;
        box-shadow: var(--shadow-elevation-3-box);
        font-size: var(--font-label-size);
        font-weight: var(--font-label-weight); 
    }
    .cobSvgOpciones{
        justify-self: center;
    }
    .cobSvgOpciones svg{
        width:1rem;
        height:1rem;          
        cursor:pointer;
    }
    #cobDivTitulo{
        grid-column-start:1;
        grid-column-end:4;
        font-size: var(--font-bajada-size);
        font-weight: var(--font-header-h1-menos-weight);  
        padding-left: .5rem;            
    }
    #cobDivLeyenda{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
    #cobDivImagen{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
    #cobDivOrden{
        grid-column-start:1;
        grid-column-end:4;
        padding-left: .5rem;            
    }
`