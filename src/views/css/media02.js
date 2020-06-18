import {
    css
} from "lit-element"

export const media02 = css`
        :host([media-size="medium"]) #titulo{
            width:16rem;
            justify-self:center;
        }
        :host([media-size="large"]) #titulo{
            width:22rem;
            justify-self:center;
        }
        :host([media-size="medium"]) #leyenda{
            width:16rem;
            justify-self:center;
        }
        :host([media-size="large"]) #leyenda{
            width:22rem;
            justify-self:center;
        }
        :host([media-size="medium"]) button, label{
            width:16rem !important;
            justify-self:center;
        }
        :host([media-size="large"]) button, label{
            width:18rem !important;
            justify-self:center;
        }
`