import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { button } from "../css/button"
import { ikeInput } from "../css/ikeInput"
import { cabecera1 } from "../css/cabecera1"
import { media01 } from "../css/media01"
import { modoPantalla } from "../../redux/actions/ui";
import { ATRAS } from "../../../assets/icons/icons"
export class pantallarClaveModificar extends connect(store)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.item = { mail: "", clave: "", recordar: "" }
        this.label = ""
    }

    static get styles() {
        return css`
        ${ikeInput}
        ${button}
        ${cabecera1}
        ${media01}
        :host{
            position: absolute;
            top: 0rem;
            left: 0rem;  
            height:100%;
            width: 100%;
            background-color:var(--color-gris-claro);
            display:grid;
            grid-template-rows:2fr 8fr
        }
        :host([hidden]){
            display: none; 
        } 
        #cuerpo{
            background-color: transparent;
            display:grid;
            padding:2rem;
            grid-auto-flow:row;
            grid-gap:.8rem;
            align-content:start
        }
        label {
            position: relative;
            width: 80%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }
        `
    }
    render() {
        return html`
        <div id="header">        
            <div id="bar">
                <div @click=${this.clickBoton1}>${ATRAS}</div>
                <div id="lblTitulo">${idiomas[this.idioma].clavemodificar.titulo}</div>
            </div>
            <div id="lblLeyenda">${idiomas[this.idioma].clavemodificar.leyenda}</div>
        </div>
        <div id="cuerpo">
            <div class="ikeInput">
                <label id="lblClave1">${idiomas[this.idioma].clavemodificar.clave1}</label>
                <input id="txtClave1"  @input=${this.activar} type="password"}>
                <label id="lblErrorClave1" error oculto>${idiomas[this.idioma].clavemodificar.errorClave1.err1}</label>
            </div>

            <div class="ikeInput">
                <label id="lblClave2">${idiomas[this.idioma].clavemodificar.clave2}</label>
                <input id="txtClave2" @input=${this.activar} type="password"}>
                <label id="lblErrorClave2" error oculto>${idiomas[this.idioma].clavemodificar.errorClave2.err1}</label>
            </div>
            <button id="btn-recuperar" btn1 apagado @click=${this.clickBoton2}>
            ${idiomas[this.idioma].clavemodificar.btn1}
            </button>
        </div>
        `
    }
    activar() {
        this.activo = true
        const clave1 = this.shadowRoot.querySelector("#txtClave1")
        const clave2 = this.shadowRoot.querySelector("#txtClave2")
        if (clave1.value.length < 4) {
            this.activo = false
        }
        if (clave2.value.length < 4) {
            this.activo = false
        }
        if (this.activo) {
            this.shadowRoot.querySelector("#btn-recuperar").removeAttribute("apagado")
        } else {
            this.shadowRoot.querySelector("#btn-recuperar").setAttribute("apagado", "")
        }
        this.update()
    }
    valido() {
        [].forEach.call(this.shadowRoot.querySelectorAll("[error]"), element => {
            element.setAttribute("oculto", "")
        })
        let valido = true
        const clave1 = this.shadowRoot.querySelector("#txtClave1")
        const clave2 = this.shadowRoot.querySelector("#txtClave2")
        if (clave1.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorClave1").removeAttribute("oculto");
        }
        if (clave2.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorClave2").removeAttribute("oculto");
        }
        this.update()
        return valido
    }
    clickBoton1() {
        store.dispatch(modoPantalla(store.getState().ui.pantallaQueLLamo, "clavemodificar"))
    }
    clickBoton2() {
        if (this.activo) {
            if (this.valido()) {
                store.dispatch(modoPantalla("clavemodificarmsg", "clavemodificar"));
            }
        }
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
            },
            label: {
                type: String,
                reflect: ""
            }
        }
    }
}

window.customElements.define("pantalla-clavemodificar", pantallarClaveModificar);