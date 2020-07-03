import {
    css
} from "lit-element"

export const cardTramo = css`
#traDivEtiqueta{
    display: grid; 
    height:16vh;
    width:100%;
    background-color:var(--color-blanco);
    grid-template-columns: 30% 30% 30% auto;
    grid-template-rows: 25% auto 30%;
    grid-gap:0rem;
    border-radius:.4rem ;           
    align-items: center;
    box-shadow: var(--shadow-elevation-3-box);
} 
:host(:not([media-size="small"])) #traDivEtiqueta{
    height:12vh;   
    border-radius:.1rem ;           
    box-shadow: var(--shadow-elevation-2-box);
}
.svgOpciones{
    justify-self: center;
}
.SvgOpciones svg{
    width:1rem;
    height:1rem;          
    cursor:pointer;
}
#traDivDia{
    font-size: var(--font-bajada-size);
    font-weight: bold;            
    padding-left: .5rem;
    grid-column-start: 1;
	grid-column-end: 4;
}         
#traDivHoraDesde{
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);            
    color: var(--color-azul-oscuro);
    padding-left:.5rem;
    grid-column-start: 1;
    grid-column-end: 5;
} 
#traDivFecha{
    grid-column-start: 1;
    grid-column-end: 3;
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);  
    background-color: transparent;          
    color: var(--color-azul-oscuro);
    padding:0 0 0 .5rem;
    justify-self:flex-start ;
          
} 
#traDivActivo{
    grid-column-start: 3;
    grid-column-end: 5;
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);            
    background-color: transparent;          
    color: var(--color-azul-oscuro);
    padding:0 1.5rem 0 0;
    justify-self: flex-start;      
} 
`