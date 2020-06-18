import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { label } from "../css/label"
import { button } from "../css/button"
import { media02 } from "../css/media02"
import { modoPantalla } from "../../redux/actions/ui";
export class pantallaCrearClaveMsg extends connect(store)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
    }

    static get styles() {
        return css`
        ${label}
        ${button}
        ${media02}
        :host{
            position: absolute;
            display:grid;
            grid-template-columns: auto;
            grid-template-rows: auto auto auto;
            grid-gap:0.5rem;
            top: 35%;
            left: 0rem;  
            height:auto;
            width: 100vw;
            background-color:var(--color-gris-claro);
            justify-content:center;
            align-items:center; 
        }
        :host([hidden]){
            display: none; 
        }
        #x{
            position: fixed;
            top: .5rem;
            right: .5rem;
            width: 1.5rem;
            height: 1.5rem;
            background-color: transparent;
            background-image:var(--icon-cerrar);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            cursor: pointer;
            z-index:10;
        }
        #titulo{
            position:relative;
            display:flex;
            width:90%;
            align-items: flex-end;
            justify-content:center;
            text-align:center;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
        }
        #leyenda{
            position:relative;
            display:flex;
            width:90%;
            align-items: flex-start;
            justify-content:center;
            text-align:center;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
        }
        button, label {
            width:80vw;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }
    `
    }
    render() {
        return html`
            <div id="x" @click=${this.clickBoton1}>
            </div>               
            <div id="titulo">
            ${idiomas[this.idioma].crearclavemsg.titulo}
            </div>
            <label id="leyenda">
            ${idiomas[this.idioma].crearclavemsg.leyenda}
            </label>
            <button id="btn-ingresar" btn1 @click=${this.clickBoton1}>
            ${idiomas[this.idioma].crearclavemsg.btn1}
            </button>


        `
    }

    clickBoton1() {
        store.dispatch(modoPantalla("iniciosesion", "crearclavemsg"))
    }
    stateChanged(state, name) {

    }
    firstUpdated() {
    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true
            }
        }
    }
}

window.customElements.define("pantalla-crearclavemsg", pantallaCrearClaveMsg);