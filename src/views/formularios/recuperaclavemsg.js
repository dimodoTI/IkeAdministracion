import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { label } from "../css/label"
import { media02 } from "../css/media02"
import { modoPantalla } from "../../redux/actions/ui";
export class pantallaRecuperaClaveMsg extends connect(store)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
    }

    static get styles() {
        return css`
        ${label}
        ${media02}
        :host{
            position: absolute;
            display:grid;
            top: 0rem;
            left: 0rem;  
            height:100vh;
            width: 100vw;
            background-color:var(--color-gris-fondo);
            grid-template-rows:5fr 5fr;
            grid-gap:.4rem;
            justify-items:center;
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
        `
    }
    render() {
        return html`
            <div id="x" @click=${this.clickBoton1}>
            </div>               
            <div id="titulo">
            ${idiomas[this.idioma].recuperaclavemsg.titulo}
            </div>
            <label id="leyenda">
            ${idiomas[this.idioma].recuperaclavemsg.leyenda}
            </label>
        `
    }

    clickBoton1() {
        //        store.dispatch(modoPantalla("iniciosesion"))
        store.dispatch(modoPantalla("crearclave", "crearclavemsg"))
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

window.customElements.define("pantalla-recuperaclavemsg", pantallaRecuperaClaveMsg);