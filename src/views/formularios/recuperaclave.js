import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { button } from "../css/button"
import { ikeInput } from "../css/ikeInput"
import { cabecera1 } from "../css/cabecera1"
import { modoPantalla } from "../../redux/actions/ui";
import { ATRAS } from "../../../assets/icons/icons"
import {
    media01
} from "../css/media01"
export class pantallaRecuperaClave extends connect(store)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.item = { mail: "", clave: "", recordar: "" }
        this.label = ""
    }

    static get styles() {
        return css`
        ${button}
        ${ikeInput}
        ${cabecera1}
        ${media01}
        :host{
            position: absolute;
            top: 0rem;
            left: 0rem;  
            height:100%;
            width: 100%;
            background-color:var(--color-gris-fondo);
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
        #cuerpo::-webkit-scrollbar{
            display: none;
        }
        `
    }
    render() {
        return html`
        <div id="header">        
            <div id="bar">
                <div @click=${this.clickBoton1}>${ATRAS}</div>
                <div id="lblTitulo">${idiomas[this.idioma].recuperaclave.titulo}</div>
            </div>
            <div id="lblLeyenda">${idiomas[this.idioma].recuperaclave.leyenda}</div>
        </div>
        <div id="cuerpo">
            <div class="ikeInput">
                <label id="lblMail">${idiomas[this.idioma].recuperaclave.mail}</label>
                <input id="txtMail"  @input=${this.activar} type="email" placeholder=${idiomas[this.idioma].recuperaclave.mail_ph}>
                <label id="lblErrorMail" error oculto>${idiomas[this.idioma].recuperaclave.errorMail.err1}</label>
            </div>

            <div class="ikeInput">
                <label id="lblDocumento">${idiomas[this.idioma].recuperaclave.documento}</label>
                <input id="txtDocumento" @input=${this.activar} type="number" placeholder=${idiomas[this.idioma].recuperaclave.documento_ph}>
                <label id="lblErrorDocumento" error oculto>${idiomas[this.idioma].recuperaclave.errorDocumento.err1}</label>
            </div>
            <button id="btn-recuperar" btn1 apagado @click=${this.clickBoton2}>
                ${idiomas[this.idioma].recuperaclave.btn1}
            </button>
        </div>
        `
    }
    activar() {
        this.activo = true
        const email = this.shadowRoot.querySelector("#txtMail")
        const documento = this.shadowRoot.querySelector("#txtDocumento")
        if (documento.value.length < 4) {
            this.activo = false
        }
        if (email.value.length < 4) {
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
        const documento = this.shadowRoot.querySelector("#txtDocumento")
        const email = this.shadowRoot.querySelector("#txtMail")
        if (documento.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorDocumento").removeAttribute("oculto");
        }
        if (email.value.indexOf("@") == -1) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorMail").removeAttribute("oculto");
        }
        this.update()
        return valido
    }
    clickBoton1() {
        store.dispatch(modoPantalla("iniciosesion", "recuperaclave"))
    }

    clickBoton2() {
        if (this.activo) {
            if (this.valido()) {
                store.dispatch(modoPantalla("recuperaclavemsg", "recuperaclave"));
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

window.customElements.define("pantalla-recuperaclave", pantallaRecuperaClave);