import {
    css
} from "lit-element"

export const cardCalendario = css`
#ccDivEtiqueta{
    display: grid; 
    height:16vh;
    width:100%;
    background-color:var(--color-blanco);
    grid-template-columns: 30% 50% 20%;
    grid-template-rows: 25% auto 30%;
    grid-gap:0rem;
    border-radius:.4rem ;           
    align-items: center;
    box-shadow: var(--shadow-elevation-4-box);
} 
:host(:not([media-size="small"])) #ccDivEtiqueta{
    height:12vh;   
    border-radius:.1rem ;           
    box-shadow: var(--shadow-elevation-2-box);
}
.SvgOpciones svg{
    height:1rem;          
    cursor:pointer;
}
#ccDivVacuna{
    font-size: var(--font-bajada-size);
    font-weight: bold;            
    padding-left: .5rem;
    grid-column-start: 1;
	grid-column-end: 3;
}         
#ccDivPara{
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);            
    color: var(--color-azul-oscuro);
    padding-left:.5rem;
    grid-column-start: 1;
    grid-column-end: 4;
} 
#ccDivCachorro{
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);  
    background-color: var(--color-celeste-claro);          
    color: var(--color-azul-oscuro);
    padding:0 .5rem 0 .5rem;
    justify-self: center;
    border-radius:1rem ;           
} 
#ccDivPeriodo{
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);  
    background-color: var(--color-celeste-claro);          
    color: var(--color-azul-oscuro);
    padding:0 .5rem 0 .5rem;
    justify-self: center;
    border-radius:1rem ;           
} 
#ccDivObligatorio{
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);            
    background-color: var(--color-celeste-claro);          
    color: var(--color-azul-oscuro);
    padding:0 .5rem 0 .5rem;
    justify-self: center;
    border-radius:1rem ;           
} 
`