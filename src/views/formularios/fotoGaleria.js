import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { label } from "../css/label"
import { cabecera1 } from "../css/cabecera1"
import { btnFlotanteRedondo } from "../css/btnFlotanteRedondo"
import { modoPantalla } from "../../redux/actions/ui";
import { CAMARA, MAS } from "../../../assets/icons/icons"
import { mediaConMenu01 } from "../css/mediaConMenu01"

const MODO_PANTALLA = "ui.timeStampPantalla"
export class pantallaFotoGaleria extends connect(store, MODO_PANTALLA)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.item = [{ img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" },
        { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" },
        { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" },
        { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" },
        { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" },
        { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" },
        { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" },
        { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" }, { img: "--imagen-perro1" }
        ]
    }

    static get styles() {
        return css`
        ${label}
        ${cabecera1}
        ${btnFlotanteRedondo}
        ${mediaConMenu01}
        :host{
            position: absolute;
            top: 0rem;
            left: 0rem;  
            height:100%;
            width: 100%;
            background-color:var(--color-gris-fondo);
            display:grid;
         }
        :host([hidden]){
            display: none; 
        } 
        #campana{
            position:relative;
            background-image: var(--icon-campana-con-marca);
            background-color: transparent;
            background-repeat: no-repeat;
            background-position: right center;
            background-size: 1rem 1rem;
        }
        #cuerpo{
            background-color: transparent;
            display: grid;
            width: 100%;
            grid-template-columns: repeat(auto-fit,minmax(3rem,1fr));
            justify-items: center;
            align-content: start;
            overflow-y: auto; 
            overflow-x: hidden; 
            padding-top: .5rem;
            grid-gap: .4rem;
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        :host(:not([media-size="small"])) #cuerpo{
            grid-template-columns: repeat(auto-fit,minmax(9rem,1fr));        
            width: 90%;
            justify-self:center;
        }
        label{
            position: relative;
            width: 95%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }      
        #pie{
            position:relative;
            grid-area: Pie; 
            display:grid;
            overflow-x: none; 
        }
        #divFoto{
            display:block;
            width: 3rem;
            height: 3rem;
            background-color: var(--color-gris);
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 3rem 3rem;
        }
        :host(:not([media-size="small"])) #divFoto{
            width: 9rem;
            height: 9rem;
            background-size: 9rem 9rem;
        }
    `
    }
    render() {
        return html`
        <div id="gridContenedor">
            <div id="header">
                <div style="display:grid;width:100%;grid-template-columns:90% 10%;">
                    <div id="bar">
                        <div id="lblTitulo">${idiomas[this.idioma].fotogaleria.titulo}</div>
                    </div>
                    <div id="campana"  @click=${this.clickBotonNotificacion}></div>
                </div>    
                <div id="lblLeyenda">${idiomas[this.idioma].fotogaleria.leyenda}</div>
            </div>
            <div id="cuerpo">
                ${this.item.map(dato => html`
                    <div id="divFoto" style="background-image:var(${dato.img})" @click="${this.verFoto}"></div>              
                `)}
            </div>         
        </div>

        <pie-componente id="pie" opcion="cinco" media-size="${this.mediaSize}">
        </pie-componente>
        <div id="bfrDivMas">
            ${CAMARA}
        </div>
    `
    }

    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "fotogaleria") {
        }
    }
    firstUpdated() {
    }
    clickBotonNotificacion() {
        store.dispatch(modoPantalla("notificacion", "fotogaleria"))
    }
    verFoto() {
        store.dispatch(modoPantalla("fotover", "fotogaleria"))
    }
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

window.customElements.define("pantalla-fotogaleria", pantallaFotoGaleria);