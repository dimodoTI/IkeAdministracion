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
    modoPantalla,
    cancelarTimer
} from "../../redux/actions/ui";
import {
    idiomas
} from "../../redux/datos/idiomas"
import {
    button
} from "../css/button"
import {
    ikeInput
} from "../css/ikeInput"
import {
    cabecera1
} from "../css/cabecera1"
import {
    media01
} from "../css/media01"
import {
    miCheckbox
} from "../componentes/checkbox"
import {
    login,
    LOGON,
    LOGON_ERROR
} from "../../redux/actions/autorizacion";
import {
    ATRAS
} from "../../../assets/icons/icons";


const MODO_PANTALLA = "ui.timeStampPantalla"
const LOGIN_OK_ERROR = "cliente.logueadoTimeStamp"
const COMMAND_ERROR = "autorizacion.commandErrorTimeStamp"
export class pantallaInicioSesion extends connect(store, MODO_PANTALLA, LOGIN_OK_ERROR, COMMAND_ERROR)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
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
            background-color:var(--color-gris-fondo);
            display:grid;
            grid-template-rows:2fr 8fr;
        }
        :host([hidden]){
            display: none; 
        }
        #cuerpo{
            background-color: transparent;
            display:grid;
            grid-auto-flow:row;
            grid-gap:.8rem;
            align-content:start;
            overflow-y: auto; 
            overflow-x: hidden; 
        }
        #cuerpo::-webkit-scrollbar{
            display: none;
        }       
        :host([media-size="medium"]) #header #bar{
            grid-template-columns: 100%;
        }
        :host([media-size="large"]) #header #bar{
            grid-template-columns: 100%;
        }
        `
    }

    render() {
        return html`
        <div id="header">
            <div id="bar">
               <!--  <div>${ATRAS}</div> -->
                <div id="lblTitulo">${idiomas[this.idioma].iniciosession.titulo}</div>
            </div>
            <div id="lblLeyenda">${idiomas[this.idioma].iniciosession.leyenda}</div>
        </div>
        <div id="cuerpo">
            <div class="ikeInput">
                <label id="lblMail">${idiomas[this.idioma].iniciosession.mail}</label>
                <input id="txtMail"  @input=${this.activar} type="email"  value="yo@yo.yo" placeholder=${idiomas[this.idioma].iniciosession.mail_ph}>
                <label id="lblErrorMail" error oculto>${idiomas[this.idioma].iniciosession.errorMail.err1}</label>
            </div>

            <div class="ikeInput">
                <label id="lblClave">${idiomas[this.idioma].iniciosession.clave}</label>
                <input id="txtClave" @input=${this.activar} type="password" value="administrador">
                <label id="lblErrorClave" error oculto>${idiomas[this.idioma].iniciosession.errorClave.err1}</label>
            </div>

            <mi-checkbox label="${idiomas[this.idioma].iniciosession.datos}"></mi-checkbox>

            <button id="btn-siguiente" btn1 apagado @click=${this.clickBoton1}>
            ${idiomas[this.idioma].iniciosession.btn1}
            </button>
            <button id="btn-cuenta" btn2 @click=${this.clickBoton2}>
            ${idiomas[this.idioma].iniciosession.btn2}
            </button>
        </div>
        `
    }
    activar() {
        this.activo = true
        const clave = this.shadowRoot.querySelector("#txtClave")
        const email = this.shadowRoot.querySelector("#txtMail")
        if (clave.value.length < 4) {
            this.activo = false
        }
        if (email.value.length < 4) {
            this.activo = false
        }
        if (this.activo) {
            this.shadowRoot.querySelector("#btn-siguiente").removeAttribute("apagado")
        } else {
            this.shadowRoot.querySelector("#btn-siguiente").setAttribute("apagado", "")
        }
        this.update()
    }

    valido() {
        [].forEach.call(this.shadowRoot.querySelectorAll("[error]"), element => {
            element.setAttribute("oculto", "")
        })
        let valido = true
        const clave = this.shadowRoot.querySelector("#txtClave")
        const email = this.shadowRoot.querySelector("#txtMail")
        if (clave.value.length < 3) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorClave").removeAttribute("oculto");
        }
        if (email.value.indexOf("@") == -1) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorMail").removeAttribute("oculto");
        }
        this.update()
        return valido
    }

    clickBoton1() {
        if (this.activo) {
            if (this.valido()) {
                const clave = this.shadowRoot.querySelector("#txtClave").value
                const email = this.shadowRoot.querySelector("#txtMail").value
                store.dispatch(login(email, clave))
                //store.dispatch(modoPantalla("principal", "iniciosesion"));
            }
        }
    }

    clickBoton2() {
        store.dispatch(modoPantalla("recuperaclave", "iniciosesion"));
    }
    clickBoton3() {
        store.dispatch(modoPantalla("principal", "iniciosesion"));
    }

    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "iniciosesion") {
            this.activar()
            store.dispatch(cancelarTimer())
        }
        if (name == LOGIN_OK_ERROR) {
            if (!state.cliente.logueado) {
                alert("Usuario o contraseña incorrectos")
            } else {
                store.dispatch(modoPantalla("principal", "iniciosesion"));
            }
            return
        }
        if (name == COMMAND_ERROR) {
            alert("Problemas con la conexión. Intente mas tarde")
            return
        }
    }

    firstUpdated() { }

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
window.customElements.define("pantalla-iniciosesion", pantallaInicioSesion);