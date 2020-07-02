import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { label } from "../css/label"
import { button } from "../css/button"
import { cabecera1 } from "../css/cabecera1"
import { btnFlotanteRedondo } from "../css/btnFlotanteRedondo"
import { mediaConMenu01 } from "../css/mediaConMenu01"
import { modoPantalla } from "../../redux/actions/ui";
import { REGALO, CARRITO, RELOJ, NOVEDADES1, NOVEDADES2, NOVEDADES3, HOME, MASCOTA, CONSULTA, VACUNA, FOTO, MAS } from "../../../assets/icons/icons"

import { pantallaPrincipal } from "./principal";
import { pantallaUsuariosAbm } from "./usuariosAbm";
import { pantallaPublicacionesAbm } from "./publicacionesAbm";
import { pantallaRazasAbm } from "./razasAbm";
import { pantallaMascotasTiposAbm } from "./mascotasTiposAbm";
import { pantallaCalendariosAbm } from "./calendariosAbm";
import { pantallaPuestosAbm } from "./puestosAbm";
import { pantallaVacunasAbm } from "./vacunasAbm";
import { pantallaConfiguracionesAbm } from "./configuracionesAbm";

const QUEPANTALLA = "ui.timeStampPantalla";
const MODO_PANTALLA = "ui.timeStampPantalla"
const MEDIA_CHANGE = "ui.media.timeStamp"
export class pantallaMenuGral extends connect(store, MODO_PANTALLA, QUEPANTALLA, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.hayReserva = "N";
    }

    static get styles() {
        return css`
        ${label}
        ${button}
        ${mediaConMenu01}
        :host{
            position: absolute;
            top: 0;
            left: 0;  
            height:100%;
            width:100%;
            background-color:var(--color-gris-fondo);
            display:grid;
            overflow-x: none; 
            overflow-y: none; 
        }
        :host([hidden]){
            display: none; 
        } 
        #gridPie{
            grid-area: Pie; 
            display:grid;
            overflow-x: none; 
        }
        #divTapaPantalla{
            position:absolute;
            z-index:10;
            display:none;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background-color:var(--color-gris);
            opacity:.6;
        }
    `
    }
    render() {
        return html`
            <div id="gridContenedor">
                <pantalla-principal id="principal" media-size="${this.mediaSize}"></pantalla-principal>
                <pantalla-usuariosabm id="usuariosabm" media-size="${this.mediaSize}"></pantalla-usuariosabm>
                <pantalla-publicacionesabm id="publicacionesabm" media-size="${this.mediaSize}"></pantalla-publicacionesabm>
                <pantalla-razasabm id="razasabm" media-size="${this.mediaSize}"></pantalla-razasabm>      
                <pantalla-mascotastiposabm id="mascotastiposabm" media-size="${this.mediaSize}"></pantalla-mascotastiposabm>      
                <pantalla-calendariosabm id="calendariosabm" media-size="${this.mediaSize}"></pantalla-calendariosabm>      
                <pantalla-puestosabm id="puestosabm" media-size="${this.mediaSize}"></pantalla-puestosabm>      
                <pantalla-vacunasabm id="vacunasabm" media-size="${this.mediaSize}"></pantalla-vacunasabm>      
                <pantalla-configuracionesabm id="configuracionesabm" media-size="${this.mediaSize}"></pantalla-configuracionesabm>      

                <div id="divTapaPantalla"  @click=${this.clickTapaPantalla}></div>
            </div>
            <pie-componente id="gridPie" opcion="" media-size="${this.mediaSize}">
            </pie-componente>
        `
    }

    stateChanged(state, name) {
        if (name == QUEPANTALLA || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size
            if (this.shadowRoot.children.length > 0) {
                this.shadowRoot.querySelector("#principal").hidden = state.ui.quePantalla != "principal";
                this.shadowRoot.querySelector("#usuariosabm").hidden = state.ui.quePantalla != "usuariosabm";
                this.shadowRoot.querySelector("#publicacionesabm").hidden = state.ui.quePantalla != "publicacionesabm";
                this.shadowRoot.querySelector("#razasabm").hidden = state.ui.quePantalla != "razasabm";
                this.shadowRoot.querySelector("#mascotastiposabm").hidden = state.ui.quePantalla != "mascotastiposabm";
                this.shadowRoot.querySelector("#calendariosabm").hidden = state.ui.quePantalla != "calendariosabm";
                this.shadowRoot.querySelector("#puestosabm").hidden = state.ui.quePantalla != "puestosabm";
                this.shadowRoot.querySelector("#vacunasabm").hidden = state.ui.quePantalla != "vacunasabm";
                this.shadowRoot.querySelector("#configuracionesabm").hidden = state.ui.quePantalla != "configuracionesabm";

            }
        }
        this.update();
    }


    clickBotonUsuario() {
        store.dispatch(modoPantalla("usuariosabm", "principal"))
    }
    clickBotonNotificacion() {
        store.dispatch(modoPantalla("notificacion", "principal"))
    }
    clickTapaPantalla() {
        this.shadowRoot.querySelector("#divTapaPantalla").style.display = "none"
        this.shadowRoot.children.gridPie.shadowRoot.querySelector("#divPopupTablas").style.display = "none"
        this.shadowRoot.children.gridPie.shadowRoot.querySelector("#divPopupAgendaMenu").style.display = "none"
        this.shadowRoot.children.gridPie.opcion = "cero"
        this.update()
    }
    firstUpdated() {
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

window.customElements.define("pantalla-menugral", pantallaMenuGral);