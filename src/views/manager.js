import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    connect
} from "@brunomon/helpers"
import {
    store
} from "../redux/store";

import { cabecera3Componente } from "../views/componentes/cabecera3Componente";
import { marquesinaComponente } from "../views/componentes/marquesina";
import { pieComponente } from "../views/componentes/pie";

import { pantallaSplash } from "../views/formularios/splash";
import { pantallaInicioSesion } from "../views/formularios/iniciosesion";
import { pantallaRecuperaClave } from "../views/formularios/recuperaclave";
import { pantallaRecuperaClaveMesg } from "../views/formularios/recuperaclavemsg";
import { pantallaCrearClave } from "../views/formularios/crearclave";
import { pantallaCrearClaveMsg } from "../views/formularios/crearclavemsg";
import { pantallaPrincipal } from "../views/formularios/principal";
import { pantallaUsuariosAbm } from "../views/formularios/usuariosAbm";
import { pantallaPublicacionesAbm } from "./formularios/publicacionesAbm";
import { pantallaRazasAbm } from "./formularios/razasAbm";

const MEDIA_CHANGE = "ui.media.timeStamp"
const QUEPANTALLA = "ui.timeStampPantalla";
export class viewManager extends connect(store, MEDIA_CHANGE, QUEPANTALLA)(LitElement) {
    constructor() {
        super();
        this.current = "IKE-Mascotas";
    }

    static get styles() {
        return css`
        :host{
            display: grid;                 
            grid-gap:1rem;
            height:100vh;
            width: 100vw;
            padding:0;
            background-color:var(--color-gris-claro);
        }
        #splash{
            align-self: top;
            height: 100%;
            width: 100%;
        }
        `
    }
    render() {
        return html`
        <pantalla-splash id="splash" media-size="${this.mediaSize}"></pantalla-splash>
        <pantalla-iniciosesion id="iniciosesion" media-size="${this.mediaSize}"></pantalla-iniciosesion>
        <pantalla-recuperaclave id="recuperaclave" media-size="${this.mediaSize}"></pantalla-recuperaclave>
        <pantalla-recuperaclavemsg id="recuperaclavemsg" media-size="${this.mediaSize}"></pantalla-recuperaclavemsg>
        <pantalla-crearclave id="crearclave" media-size="${this.mediaSize}"></pantalla-crearclave>
        <pantalla-crearclavemsg id="crearclavemsg" media-size="${this.mediaSize}"></pantalla-crearclavemsg>
        <pantalla-principal id="principal" media-size="${this.mediaSize}"></pantalla-principal>
        <pantalla-usuariosabm id="usuariosabm" media-size="${this.mediaSize}"></pantalla-usuariosabm>
        <pantalla-publicacionesabm id="publicacionesabm" media-size="${this.mediaSize}"></pantalla-publicacionesabm>
        <pantalla-razasabm id="razasabm" media-size="${this.mediaSize}"></pantalla-razasabm>
        `
    }

    stateChanged(state, name) {
        if (name == QUEPANTALLA || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size
            if (this.shadowRoot.children.length > 0) {
                this.shadowRoot.querySelector("#splash").hidden = state.ui.quePantalla != "splash";
                this.shadowRoot.querySelector("#iniciosesion").hidden = state.ui.quePantalla != "iniciosesion";
                this.shadowRoot.querySelector("#recuperaclave").hidden = state.ui.quePantalla != "recuperaclave";
                this.shadowRoot.querySelector("#recuperaclavemsg").hidden = state.ui.quePantalla != "recuperaclavemsg";
                this.shadowRoot.querySelector("#crearclave").hidden = state.ui.quePantalla != "crearclave";
                this.shadowRoot.querySelector("#crearclavemsg").hidden = state.ui.quePantalla != "crearclavemsg";
                this.shadowRoot.querySelector("#principal").hidden = state.ui.quePantalla != "principal";
                this.shadowRoot.querySelector("#usuariosabm").hidden = state.ui.quePantalla != "usuariosabm";
                this.shadowRoot.querySelector("#publicacionesabm").hidden = state.ui.quePantalla != "publicacionesabm";
                this.shadowRoot.querySelector("#razasabm").hidden = state.ui.quePantalla != "razasabm";
            }
        }
        this.update();
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            }
        }
    }
}

window.customElements.define("view-manager", viewManager);