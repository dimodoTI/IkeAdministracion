import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { label } from "../css/label"
import { button } from "../css/button"
import { cabecera1 } from "../css/cabecera1"
import { btnFlotanteRedondo } from "../css/btnFlotanteRedondo"
import { usuarioAbm } from "../componentes/usuarioAbm"
import { mediaConMenu01 } from "../css/mediaConMenu01"
import { modoPantalla } from "../../redux/actions/ui";
import { REGALO, CARRITO, RELOJ, NOVEDADES1, NOVEDADES2, NOVEDADES3, HOME, MASCOTA, CONSULTA, VACUNA, FOTO, MAS } from "../../../assets/icons/icons"

const RESERVA_TIMESTAMP = "reserva.timeStamp"
export class pantallaUsuariosAbm extends connect(store, RESERVA_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
    }

    static get styles() {
        return css`
        ${label}
        ${button}
        ${cabecera1}
        ${btnFlotanteRedondo}
        ${mediaConMenu01}
        :host{
            position: absolute;
            top: 0;
            left: 0;  
            height:100vh;
            width:100vw;
            background-color:var(--color-gris-fondo);
            display:grid;
        }
        :host([hidden]){
            display: none; 
        } 
        #gridPie{
            grid-area: Pie; 
            display:grid;
        }
        #detalle{
            height: 90%;
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
        return html`
            <div id="gridContenedor">
                <div id="header">
                    <div style="display:grid;width:100%;grid-template-columns:90% 10%;">
                        <div id="bar">
                            <div id="lblTitulo">${idiomas[this.idioma].principal.tituloCabecera}</div>
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
            </div>
            <pie-componente id="gridPie" opcion="uno" media-size="${this.mediaSize}">
            </pie-componente>
`
    }
    clickBotonUsuario() {
        store.dispatch(modoPantalla("usuariodetalle", "principal"))
    }
    clickBotonNotificacion() {
        store.dispatch(modoPantalla("notificacion", "principal"))
    }
    clickConsulta() {
        store.dispatch(modoPantalla("video", "principal"))
    }
    clickAgenda() {
        store.dispatch(modoPantalla("plancontrata", "principal"))
    }
    clickAyuda() {
        store.dispatch(modoPantalla("vercobertura", "principal"))
    }
    clickBoton1() {
        store.dispatch(modoPantalla("iniciosesion", "principal"))
    }
    clickBoton2() {
        store.dispatch(modoPantalla("iniciosesion", "principal"))
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
                reflect: false
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