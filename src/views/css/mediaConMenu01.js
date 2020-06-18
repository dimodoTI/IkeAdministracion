import {
    css
} from "lit-element"

export const mediaConMenu01 = css`
    :host([media-size="small"]){
        grid-template-areas:
            'Contenedor'
            'Pie';   
        grid-template-rows: 90% 10%;      
    }
    :host(:not([media-size="small"])){
        grid-template-areas:
            'Pie Contenedor';   
            grid-template-columns: 20% 80%;      
    }
    #gridContenedor{
        grid-area: Contenedor; 
        grid-template-rows:18% 82%;
        display:grid;
        overflow-y: hidden;
        overflow-x: hidden; 
    } 
`