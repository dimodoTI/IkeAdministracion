import {
    css
} from "lit-element"

export const media01 = css`
        :host([media-size="small"]){
            padding:0;
            width:100%;
        }
        :host([media-size="medium"]){
            width:100%;
            justify-items: center;
        }
        :host([media-size="large"]){
            width:100%;
            justify-items: center;
        }
        :host([media-size="medium"]) #header{
            background-color: transparent;
            grid-gap:0.5rem;
        }
        :host([media-size="large"]) #header{
            background-color: transparent;
            grid-gap:0.5rem;
        }
        :host([media-size="small"]) #cuerpo{
            padding:2rem;
        }
        :host([media-size="medium"]) #cuerpo{
            width:13rem;
            background-color: var(--color-blanco);
            grid-gap:.3rem;
            padding: 1rem 1rem 2rem 1rem;
            align-self:start;
            box-shadow: 0 1px 2px 0 var(--color-gris);
            border-radius: .5rem;
        }
        :host([media-size="large"]) #cuerpo{
            width:16rem;
            background-color: var(--color-blanco);
            grid-gap:.3rem;
            padding: 1rem 1rem 2rem 1rem;
            align-self:start;
            box-shadow: 0 1px 2px 0 var(--color-gris);
            border-radius: .5rem;
        }
        :host([media-size="medium"]) #header #bar{
            justify-self: center;
        }
        :host([media-size="large"]) #header #bar{
            justify-self: center;
        }

`