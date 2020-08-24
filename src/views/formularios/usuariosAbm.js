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
    cabecera1
} from "../css/cabecera1"
import {
    btnFlotanteRedondo
} from "../css/btnFlotanteRedondo"
import {
    usuarioAbm
} from "../componentes/usuarioAbm"
import {
    mediaConMenu01
} from "../css/mediaConMenu01"
import {
    modoPantalla
} from "../../redux/actions/ui";
import {
    REGALO,
    CARRITO,
    RELOJ,
    NOVEDADES1,
    NOVEDADES2,
    NOVEDADES3,
    HOME,
    MASCOTA,
    CONSULTA,
    VACUNA,
    FOTO,
    MAS
} from "../../../assets/icons/icons"

const MODO_PANTALLA = "ui.timeStampPantalla"
export class pantallaUsuariosAbm extends connect(store, MODO_PANTALLA)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
    }

    static get styles() {
        return css `
        ${label}
        ${button}
        ${cabecera1}
        :host{
            position: relative;
            height:100%;
            width:100%;
            background-color:var(--color-gris-fondo);
            display:grid;
            grid-template-rows:14% 86%;
        }
        :host([hidden]){
            display: none; 
        } 
        #detalle{
            height: 100%;
            width: 2rem;
            background-image: var(--icon-flecha-abajo-sin-bordes);
            background-color: transparent;
            background-repeat: no-repeat;
            background-position: left bottom;
            background-size: 1rem 1rem;
            opacity:.4;
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
            position: relative;
            display: grid;
            background-color: transparent;  
            overflow-x: none; 
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        label,button {
            position: relative;
            width: 95%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }      
        #usuarioComp{
            position:relative;
            display:grid;
            padding: 0 1rem 0 1rem;
        }
    `
    }
    render() {
        return html `
            <div id="header">
                <div style="display:grid;width:100%;grid-template-columns:90% 10%;">
                    <div id="bar">
                        <div id="lblTitulo">${idiomas[this.idioma].principal.tituloCabecera}
                            ${store.getState().cliente.datos.nombre == "" ? "" : ", " + store.getState().cliente.datos.nombre}    
                        </div>
                        <div id="detalle" 
                            @click=${this.clickBotonUsuario}>
                        </div>
                    </div>
                    <div id="campana" @click=${this.clickBotonNotificacion}></div>
                </div>    
                <div id="lblLeyenda">${idiomas[this.idioma].principal.leyendaCabecera}</div>
            </div>
            <div id="cuerpo">
                <usuario-abm id="usuarioComp" media-size="${this.mediaSize}">
                </usuario-abm>
            </div>        
        `
    }
    clickBotonUsuario() {
        //store.dispatch(modoPantalla("usuariodetalle", "usuariosabm"))
    }
    clickBotonNotificacion() {
        //store.dispatch(modoPantalla("notificacion", "usuariosabm"))
    }
    stateChanged(state, name) {

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
window.customElements.define("pantalla-usuariosabm", pantallaUsuariosAbm);