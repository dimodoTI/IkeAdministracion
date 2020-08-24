import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    store
} from "../../redux/store";
import {
    connect
} from "@brunomon/helpers";
import {
    idiomas
} from "../../redux/datos/idiomas"
import {
    label
} from "../css/label"
import {
    button
} from "../css/button"
import {
    select
} from "../css/select"
import {
    ikeInput
} from "../css/ikeInput"
import {
    cabecera1
} from "../css/cabecera1"

import {
    modoPantalla
} from "../../redux/actions/ui";

import {
    MAS
} from "../../../assets/icons/icons"
import {
    get as getMascotas
} from "../../redux/actions/mascotas"
import {
    get as getNotificaciones
} from "../../redux/actions/notificaciones";


const MODO_PANTALLA = "ui.timeStampPantalla"
const NOTIFICACIONES = "notificaciones.timeStamp"
export class pantallaNotificacionesHistorico extends connect(store, MODO_PANTALLA, NOTIFICACIONES)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.mascotasTipo = []
        this.razas = []
        this.vacuna = []
        this.status = html ``
        this.notificaciones = []
    }

    static get styles() {
        return css `
        ${label}
        ${button}
        ${select}
        ${ikeInput}
        ${cabecera1}

        :host{
            background-color:var(--color-gris-fondo);
            display:grid;
            grid-template-rows:auto 1fr
        } 
        :host([hidden]){
            display: none; 
        } 
        #cuerpo{
            position: relative;
            display: grid;
            grid-template-columns:1fr ;
            background-color: transparent;  
            grid-gap:.5rem
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        label,button {
            position: relative;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }    
       
        h4{
            margin:0;
        }

        select {
            height:2rem;
        }

        #divRegistros{
            display:grid;
            grid-gap: .8rem;
            overflow-y:auto;
            align-content: flex-start;
            height: calc(((100vh * .9) * .82) - 2.5rem);
            padding:.5rem;
        }
        :host(:not([media-size="small"])) #divRegistros{
            height: calc(((100vh * .9)) - 2.5rem);
        }
        #divRegistros::-webkit-scrollbar {
            display: grid;
        }
        .row{
            display:grid;
            grid-template-rows:1fr 3fr 1fr;
            background-color: #FFFFFF;
            box-shadow: var(--shadow-elevation-3-box);
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            gap: .3rem;
            border-radius: 0.5rem;
            padding:.5rem;
            align-items:start;
            align-content:start
        }
       
    `
    }
    render() {
        return html `
            <div id="header">
                <div style="display:grid;grid-template-columns:2fr 3fr;">
                    <div id="bar">
                        <div id="lblTitulo">${idiomas[this.idioma].notificacionesHistorico.tituloCabecera}</div>
                    </div>
                    
                </div>    
                <div id="lblLeyenda">${idiomas[this.idioma].notificacionesHistorico.leyendaCabecera}</div>
            </div>
            <div id="cuerpo">
                <div id="divRegistros">
                    ${this.notificaciones.map((item) => {
                        return html`
                                <div class="row">
                                    <div style="font-size:1rem">${item.Titulo}</div>
                                    <div style="background-color:var(--color-gris-fondo);align-self:stretch">${item.Texto}</div>
                                    <a href=${item.Link}>${item.Link}</a>
                                </div>
                            `
                    })}
                </div>
            </div>        
        `
    }







    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "notificacionesHistorico") {
            store.dispatch(getNotificaciones({
                top: 10,
                orderby: "Id desc"

            }))
            this.update();
        }

        if (name == NOTIFICACIONES) {
            this.notificaciones = state.notificaciones.entities
            this.update()
        }

    }
    firstUpdated() {}

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true
            },
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            }
        }
    }
}

window.customElements.define("pantalla-notificaciones-historico", pantallaNotificacionesHistorico);