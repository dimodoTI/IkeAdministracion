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

import { modoPantalla, dispararTimer, cancelarTimer } from "../../redux/actions/ui";
const MODO_PANTALLA = "ui.timeStampPantalla"
export class pantallaSplash extends connect(store, MODO_PANTALLA)(LitElement) {
    constructor() {
        super();
        this.hidden = false
    }

    static get styles() {
        return css`
        :host{
            display: grid;
            justify-items:center;
            align-items: center;  
            background-color: trasparent;
            height: 100vh;
            width: 100vw;   
            background-color:var(--color-celeste);
            background-image:var(--imagen-logo-splash);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 80%;
        }
        :host([media-size="medium"]){
            background-size: 50%;
        }
        :host([media-size="large"]){
            background-size: 40%;
        }
        :host([hidden]){
            display: none; 
        }
        #fondo{
            height: 100%;
            width: 100%;
            background-color:transparent;            
        }
        `
    }
    render() {
        return html`
        <div id="fondo" @click="${this.pasar}">
        </div>
        `
    }
    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "splash") {
            store.dispatch(cancelarTimer())
            //store.dispatch(dispararTimer(3, "usuariosabm", "splash"))
        }
    }
    pasar(e) {
        store.dispatch(modoPantalla("iniciosesion", "splash"))
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
window.customElements.define("pantalla-splash", pantallaSplash);