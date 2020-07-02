import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { button } from "../css/button"
import { USUARIO, MASCOTA, VACUNA, CONSULTA, FOTO } from "../../../assets/icons/icons";
import { modoPantalla } from "../../redux/actions/ui";
import { idiomas } from "../../redux/datos/idiomas";
import { select } from "../css/select"
import { cardPuesto } from "../css/cardPuesto"
import { MAS, BASURA, MODIFICAR, ARRIBA, ABAJO } from "../../../assets/icons/icons"
import { ikeInput } from "../css/ikeInput"
import { get as getConfiguracion, patch as patchConfiguracion, add as addConfiguracion } from "../../redux/actions/configuracion";

const CONFIGURACION_TIMESTAMP = "configuracion.timeStamp"
const CONFIGURACION_UPDATETIMESTAMP = "configuracion.updateTimeStamp"
const CONFIGURACION_ADDTIMESTAMP = "configuracion.addTimeStamp"
const CONFIGURACION_ERRORGETTIMESTAMP = "configuracion.errorTimeStamp"
const CONFIGURACION_ERROROTROSTIMESTAMP = "configuracion.commandErrorTimeStamp"
const MODO_PANTALLA = "ui.timeStampPantalla"

export class configuracionAbm extends connect(store, MODO_PANTALLA, CONFIGURACION_TIMESTAMP, CONFIGURACION_UPDATETIMESTAMP, CONFIGURACION_ADDTIMESTAMP, CONFIGURACION_ERRORGETTIMESTAMP, CONFIGURACION_ERROROTROSTIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.TOCK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE1OTI0NTg1MTksImV4cCI6MTU5MjQ2MzkxOSwiaWF0IjoxNTkyNDU4NTE5fQ.m6skA3UUdCoiUkkCp1QcuUQs9ipJy570Sr8rnhLdfQo"
        this.idioma = "ES"
        this.accion = ""
        this.itemOriginal = { id: 0, descripcion: "", activo: true }
        this.activo = false;
        this.puestos = [{ id: 0, descripcion: "", activo: true }]
    }

    static get styles() {
        return css`
        ${button}
        ${select}
        ${cardPuesto}
        ${ikeInput}
        :host{
            display: grid;
            position:relative; 
            align-items:flex-start; 
            justify-content:left;
            background-color: var(--color-blanco);
            grid-gap:0rem;
            grid-template-rows: 2.5rem 8rem auto ;
            grid-template-columns: 100% ;
            height:100vh;
            overflow-x:none;
        }
        #divTitulo{
            display:grid;
            grid-template-columns: 90% 10% ;
            font-size: var(--font-header-h1-menos-size);
            font-weight: var(--font-header-h1-menos-weight);
            background-color: var(--color-celeste-oscuro);
            color:var(--color-blanco);
            padding:.4rem;
            border-radius:.4rem;
        }

        #divTitulo svg{
            width:1rem;
            height:1rem;
            stroke:var(--color-blanco);
            cursor:pointer;
        }
        #divTituloImgUp {
            margin-left:.8rem;
        }
        #divBtnMas{
            justify-self: end;
        }
        #divSeleccion{
            display:grid;
            width:100%;
            grid-gap:.5rem;         
        }
        #txtFiltro{
            height:1.5rem;
            font-size: var(--font-header-h1-menos-size);
            font-weight: var(--font-label-weight);  
        }
        #divRegistros{
            display:grid;
            grid-gap: .8rem;
            overflow-y:auto;
            align-content: flex-start;
            height: calc(((100vh * .9) * .82) - 2rem);
        }
        #divRegistros::-webkit-scrollbar {
            display: grid;
        }
        #pantallaOscura{
            display:none;
            position:fixed;
            top:0px;
            left:0px;
            width:100vmax;
            height:100vh;
            background-color:var(--color-negro);
            opacity:.6;
            z-index:10;
        }
        #verDatos{
            display:none;
            position:fixed;
            align-content: start;
            grid-gap: .6rem;
            top:1rem;
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
            background-color:var(--color-gris-claro);
            z-index:10;
            border-radius:.5rem;
            padding:.5rem;
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            overflow-y:auto;
        }
        :host(:not([media-size="small"])) #verDatos{
            margin: 0 8rem 0 5rem; 
        }
        #verDatosContenedor{
            position:relative;
            display:grid;
            grid-gap: 1rem;
            overflow-y:scroll;
            width:100%;
            bottom:.1rem;
        }
        #verDatosContenedor::-webkit-scrollbar {
            display: none;
        }
        #x{
            display:none;
            position: fixed;
            top: .3rem;
            right: 0.3rem;
            width: 1.5rem;
            height: 1.5rem;
            background-color: var(--color-gris-claro);
            background-image:var(--icon-cerrar);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            cursor: pointer;
            border-radius:.75rem;
            z-index:12;
        }
        :host(:not([media-size="small"])) #x{
            right: 8.3rem;
        }
        #lblTituloDatos{
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);              
        }
        .select{
            height:3rem;
        }
        #txtMail[readonly]{
            cursor: not-allowed;
            background-color:var(--color-nude);
        }
        `
    }
    attributeChangedCallback(name, oldVal, newVal) {
        console.log('attribute change: ', name, newVal);
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    render() {
        return html`
            <div id="divTitulo">
                <div id="divSacoFiltro">
                    <div id="divTituloLbl">${idiomas[this.idioma].configuracionesabm.titulo}</div>
                    <div></div>
                </div>
                <div id="divBtnMas" ></div>
            </div>
            <div id=divRegistros>
                <div id="verDatosContenedor">               
                    <div class="ikeInput">
                        <label id="lblDiaRes">${idiomas[this.idioma].configuracionesabm.lblDiaRes}</label>
                        <input id="txtDiaRes"  @input=${this.activar} placeholder=${idiomas[this.idioma].configuracionesabm.lblDiaRes_ph}>
                        <label id="lblErrorDiaRes" error oculto>Días de Reserva Incorrecto</label>
                    </div>
                    <div class="ikeInput">
                        <label id="lblTurXHora">${idiomas[this.idioma].configuracionesabm.lblTurXHora}</label>
                        <input id="txtTurXHora"  @input=${this.activar} placeholder=${idiomas[this.idioma].configuracionesabm.lblTurXHora_ph}>
                        <label id="lblErrorTurXHora" error oculto>Turnos por hora Incorrecto</label>
                    </div>
                    <button id="btnAceptar"  @click=${this.clickAccion} btn1 apagado>${idiomas[this.idioma].configuracionesabm.btnGrabar}</button>                 
                </div>
            </div>
            <div id="x" @click=${this.clickX}>
            </div>  
            <div id="verDatos">
           </div>
            <hc2-spinner></hc2-spinner>
        `
    }

    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "configuracionesabm") {
            store.dispatch(getConfiguracion({}))
        }
        if (name == CONFIGURACION_TIMESTAMP && state.ui.quePantalla == "configuracionesabm") {
            if (state.configuracion.entities) {
                this.itemOriginal = state.configuracion.entities[0];
                this.shadowRoot.querySelector("#txtDiaRes").value = state.configuracion.entities[0].DiasReserva;
                this.shadowRoot.querySelector("#txtTurXHora").value = state.configuracion.entities[0].TurnosxHora;
                this.activar()
            }
        }
        if (name == CONFIGURACION_UPDATETIMESTAMP) {
            store.dispatch(getConfiguracion({}))
        }
    }
    firstUpdated(changedProperties) {
    }

    clickAccion() {
        if (this.activo) {
            if (this.valido()) {
                const diasres = this.shadowRoot.getElementById("txtDiaRes").value;
                const turhora = this.shadowRoot.getElementById("txtTurXHora").value;
                var datoUpdate = [];
                diasres != this.itemOriginal.DiasReserva ? datoUpdate.push({
                    "op": "replace",
                    "path": "/DiasReserva",
                    "value": diasres
                }) : null
                turhora != this.itemOriginal.TurnosxHora ? datoUpdate.push({
                    "op": "replace",
                    "path": "/TurnosxHora",
                    "value": turhora
                }) : null
                if (datoUpdate) {
                    let miToken = store.getState().cliente.datos.token
                    store.dispatch(patchConfiguracion(this.itemOriginal.Id, datoUpdate, miToken))
                    this.clickX()
                }
            }
        }
    }

    clickDelete(e) {
        if (confirm('Delete')) {

        }
    }
    clickX() {
        this.shadowRoot.querySelector("#verDatos").style.display = "none";
        this.shadowRoot.querySelector("#x").style.display = "none";
    }
    activar() {
        this.activo = true
        const diares = this.shadowRoot.getElementById("txtDiaRes");
        const turhora = this.shadowRoot.getElementById("txtTurXHora");
        if (diares.value.length < 1) {
            this.activo = false
        }
        if (turhora.value.length < 1) {
            this.activo = false
        }
        if (this.activo) {
            this.shadowRoot.querySelector("#btnAceptar").removeAttribute("apagado")
        } else {
            this.shadowRoot.querySelector("#btnAceptar").setAttribute("apagado", "")
        }
        this.update()
    }
    valido() {
        [].forEach.call(this.shadowRoot.querySelectorAll("[error]"), element => {
            element.setAttribute("oculto", "")
        })
        let valido = true
        const diares = this.shadowRoot.getElementById("txtDiaRes");
        const turhora = this.shadowRoot.getElementById("txtTurXHora");
        if (diares.value.length < 1 || diares.value.length > 10) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorDiaRes").removeAttribute("oculto");
        }
        if (turhora.value.length < 1 || turhora.value.length > 10) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorTurXHora").removeAttribute("oculto");
        }
        this.update()
        return valido
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

window.customElements.define("configuracion-abm", configuracionAbm);