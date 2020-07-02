import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { button } from "../css/button"
import { modoPantalla } from "../../redux/actions/ui";
import { idiomas } from "../../redux/datos/idiomas";
import { select } from "../css/select"
import { cardVacuna } from "../css/cardVacuna"
import { MAS, MODIFICAR, ARRIBA, ABAJO } from "../../../assets/icons/icons"
import { ikeInput } from "../css/ikeInput"
import { get as getVacuna, patch as patchVacuna, add as addVacuna } from "../../redux/actions/vacuna";
import { get as getMascotasTipo } from "../../redux/actions/mascotastipo";

const VACUNA_TIMESTAMP = "vacuna.timeStamp"
const MASCOTASTIPO_TIMESTAMP = "mascotastipo.timeStamp"
const VACUNA_UPDATETIMESTAMP = "vacuna.updateTimeStamp"
const VACUNA_ADDTIMESTAMP = "vacuna.addTimeStamp"
const VACUNA_ERRORGETTIMESTAMP = "vacuna.errorTimeStamp"
const VACUNA_ERROROTROSTIMESTAMP = "vacuna.commandErrorTimeStamp"
const MODO_PANTALLA = "ui.timeStampPantalla"

export class vacunaAbm extends connect(store, MODO_PANTALLA, MASCOTASTIPO_TIMESTAMP, VACUNA_TIMESTAMP, VACUNA_UPDATETIMESTAMP, VACUNA_ADDTIMESTAMP, VACUNA_ERRORGETTIMESTAMP, VACUNA_ERROROTROSTIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.TOCK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE1OTI0NTg1MTksImV4cCI6MTU5MjQ2MzkxOSwiaWF0IjoxNTkyNDU4NTE5fQ.m6skA3UUdCoiUkkCp1QcuUQs9ipJy570Sr8rnhLdfQo"
        this.idioma = "ES"
        this.accion = ""
        this.mascotaTipoSeleccionada = 0
        this.itemOriginal = { id: 0, MascotaTipoId: 0, descripcion: "", activo: true, MascotaTipo: { Id: 0, Descripcion: "", Activo: true } }
        this.activo = false;
        this.mascotasTipo = [];
        this.vacunas = []
    }

    static get styles() {
        return css`
        ${button}
        ${select}
        ${cardVacuna}
        ${ikeInput}
        :host{
            display: grid;
            position:relative; 
            align-items:flex-start; 
            justify-content:left;
            background-color: var(--color-blanco);
            grid-gap:0rem;
            grid-template-rows: 2.5rem 3.5rem auto ;
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
        #divSacoFiltro{
            display:grid;
            grid-template-columns: auto 1fr 1fr;            
        }
        #divTituloImgUp {
            margin-left:.8rem;
        }
        #divTituloImgUp svg {
            fill:var(--color-blanco);
            align-self: center;
            width:1.2rem;
            height:1.2rem;           
        }
        #divTituloImgDown {
            display:none;
            margin-left:.8rem;
        }
        #divTituloImgDown svg {
            fill:var(--color-blanco);
            align-self: center;
            width:1.2rem;
            height:1.2rem;           
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
        .classRegistros{
            display:grid;
            grid-gap: .5rem;
            overflow-y:auto;
            align-content: flex-start;
            height: calc(((100vh * .9) * .82) - 10.5rem);
        }
        .classRegistros::-webkit-scrollbar {
            display: none;
        }
        :host([media-size="small"]) .classRegistros[alto="chico"]{
            height: calc(((100vh * .9) * .82) - 6rem);
            grid-gap: .6rem;  
        }
        :host([media-size="small"]) .classRegistros[alto="grande"]{
            height: calc(((100vh * .9) * .82) - 3rem);
            grid-gap: .7rem;  
        }
        :host(:not([media-size="small"])) .classRegistros[alto="chico"]{
            height: calc((100vh * .82) - 5.5rem);
            grid-gap: .8rem;  
        }
        :host(:not([media-size="small"])) .classRegistros[alto="grande"]{
            height: calc((100vh * .82) - 2rem);
            grid-gap: .8rem;  
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
                    <div id="divTituloLbl">${idiomas[this.idioma].vacunasabm.titulo}</div>
                    <div id="divTituloImgUp" @click=${this.clickMostrarFiltro}>
                        ${ARRIBA}
                    </div>
                    <div id="divTituloImgDown" @click=${this.clickMostrarFiltro}>
                        ${ABAJO}
                    </div>
                </div>
                <div id="divBtnMas" @click="${function () { this.clickAlta('alta', null) }}">${MAS}</div>
            </div>
            <div id="divSeleccion">
                <div id="selectFiltro" class="select" > 
                    <label >${idiomas[this.idioma].usuarioabm.lblFiltro}</label>
                    <select style="width:100%;height:2rem;" id="filtro" @change=${this.clickMostrarDatos}>          
                        ${this.mascotasTipo.map(dato => html`
                            <option value="${dato.Id}" .selected="${this.itemOriginal.MascotasTipoId == dato.Id}">${dato.Descripcion}</option>                               
                        `)}
                    </select>
                </div>
            </div>
            <div id=divRegistros class="classRegistros" alto="chico">
                ${this.vacunas.map((dato) => {
            return html`
                        <div id="cvacDivCuerpo">
                            <div id="cvacDivActivo">${idiomas[this.idioma].vacunasabm.datoActivo} ${dato.Activo ? idiomas[this.idioma].SiNo.si : idiomas[this.idioma].SiNo.no}</div>
                            <div id="divSvgUpdate"  valor="2" class="svgOpciones" @click="${function () { this.clickAlta('update', dato) }}">${MODIFICAR}</div>
                            <div id="cvacDivTipo">${dato.MascotaTipo.Descripcion}</div>
                            <div id="cvacDivNombre">${dato.Descripcion}</div>
                        </div>
                    `
        })}
            <div style="height:.5rem;"></div>
            </div>
            <div id="pantallaOscura"> 
            </div>
            <div id="x" @click=${this.clickX}>
            </div>  
            <div id="verDatos">
                <div id="verDatosContenedor">               
                    <div class="divTituloDatos">
                        <label id="lblTituloDatos">titulo</label>
                    </div>
                    <div class="ikeInput">
                        <label id="lblNombre">${idiomas[this.idioma].vacunasabm.lblNombre}</label>
                        <input id="txtNombre"  @input=${this.activar} placeholder=${idiomas[this.idioma].vacunasabm.lblNombre_ph}>
                        <label id="lblErrorNombre" error oculto>Vacuna Incorrecta</label>
                    </div>
                    <div id="selectTipo" class="select" > 
                        <label >${idiomas[this.idioma].vacunasabm.lblTipo}</label>
                        <select style="width:100%;height:2rem;" id="tipo"> 

                        ${this.mascotasTipo.map((dato) => {
            return html`
                           <option value=${dato.Id} .selected=${this.itemOriginal.MascotasTipoId == dato.Id} >${dato.Descripcion}</option>
                            `
        })}
                            </select>
                    </div>

                    <div id="selectActivo" class="select" > 
                        <label >${idiomas[this.idioma].vacunasabm.lblActivo}</label>
                        <select style="width:100%;height:2rem;" id="activo">          
                            <option value=true .selected="${this.itemOriginal.Activo}">${idiomas[this.idioma].SiNo.si}</option>
                            <option value=false .selected="${!this.itemOriginal.Activo}">${idiomas[this.idioma].SiNo.no}</option>
                        </select>
                    </div>
                    <button id="btnAceptar"  @click=${this.clickAccion} btn1 apagado>${idiomas[this.idioma].vacunasabm.btnGrabar}</button>                 
                </div>
            </div>
            <hc2-spinner></hc2-spinner>
        `
    }

    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "vacunasabm") {
            if (state.mascotastipo.entities) {
                this.mascotasTipo = state.mascotastipo.entities
                let fil = { filter: "MascotaTipoId eq " + this.mascotasTipo[0].Id, expand: "MascotaTipo" }
                store.dispatch(getVacuna(fil))
            } else {
                store.dispatch(getMascotasTipo({}))
            }
        }
        if (name == MASCOTASTIPO_TIMESTAMP && state.ui.quePantalla == "vacunasabm") {
            if (state.mascotastipo.entities) {
                this.mascotasTipo = state.mascotastipo.entities
                if (state.vacuna.entities[0].MascotaTipo) {
                    this.update()
                }
            }
        }
        if (name == VACUNA_TIMESTAMP && state.ui.quePantalla == "vacunasabm") {
            if (state.vacuna.entities[0].MascotaTipo) {
                this.vacunas = state.vacuna.entities
                if (state.mascotastipo.entities) {
                    this.update()
                }
            }

        }
        if (name == VACUNA_ADDTIMESTAMP || name == VACUNA_UPDATETIMESTAMP) {
            let fil = { filter: "MascotaTipoId eq " + this.shadowRoot.querySelector("#filtro").value, expand: "MascotaTipo" }
            store.dispatch(getVacuna(fil))
        }
    }
    firstUpdated(changedProperties) {
    }

    clickAccion() {
        const descripcion = this.shadowRoot.getElementById("txtNombre").value;
        const tipo = this.shadowRoot.getElementById("tipo").value;
        const activo = this.shadowRoot.getElementById("activo").value;

        var datoUpdate = [];

        if (this.accion == "alta") {
            let mySel = this.shadowRoot.querySelector("#tipo")
            let opt = mySel.options[mySel.selectedIndex].text
            this.itemOriginal = { MascotaTipoId: tipo, Descripcion: descripcion, Activo: activo, MascotaTipo: { Id: mySel.value, Descripcion: opt, Activo: true } }
            let nuevo = { MascotaTipoId: tipo, Descripcion: descripcion, Activo: activo }
            let miToken = store.getState().cliente.datos.token
            store.dispatch(addVacuna(nuevo, miToken))
            this.clickX()
        }
        if (this.accion == "update") {
            if (this.activo) {
                if (this.valido()) {
                    var datoUpdate = [];
                    descripcion != this.itemOriginal.Descripcion ? datoUpdate.push({
                        "op": "replace",
                        "path": "/descripcion",
                        "value": descripcion
                    }) : null
                    activo != this.itemOriginal.Activo ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Activo",
                        "value": activo
                    }) : null
                    tipo != this.itemOriginal.MascotaTipoId ? datoUpdate.push({
                        "op": "replace",
                        "path": "/MascotaTipoId",
                        "value": tipo
                    }) : null
                    if (datoUpdate) {
                        let miToken = store.getState().cliente.datos.token
                        store.dispatch(patchVacuna(this.itemOriginal.Id, datoUpdate, miToken))
                        this.itemOriginal.Descripcion = descripcion
                        this.itemOriginal.MascotaTipoId = tipo
                        this.itemOriginal.Activo = activo
                        this.clickX()
                    }
                }
            }
        }
    }

    clickMostrarDatos() {
        //this.mascotaTipoSeleccionada = this.shadowRoot.querySelector("#filtro").value
        //this.update();
        let fil = { filter: "MascotaTipoId eq " + this.shadowRoot.querySelector("#filtro").value, expand: "MascotaTipo" }
        store.dispatch(getVacuna(fil))
    }
    clickMostrarFiltro(e) {
        if (this.shadowRoot.querySelector("#divSeleccion").style.display == "none") {
            this.shadowRoot.querySelector("#divSeleccion").style.display = "grid";
            this.shadowRoot.querySelector(".classRegistros").setAttribute("alto", "chico");
            this.shadowRoot.querySelector("#divTituloImgUp").style.display = "grid";
            this.shadowRoot.querySelector("#divTituloImgDown").style.display = "none";
        } else {
            this.shadowRoot.querySelector("#divSeleccion").style.display = "none";
            this.shadowRoot.querySelector(".classRegistros").setAttribute("alto", "grande")
            this.shadowRoot.querySelector("#divTituloImgUp").style.display = "none";
            this.shadowRoot.querySelector("#divTituloImgDown").style.display = "grid";
        }
    }
    clickAlta(accion, dato) {
        this.accion = accion;
        if (accion == "alta") {
            let mySel = this.shadowRoot.querySelector("#tipo")
            let opt = mySel.options[mySel.selectedIndex].text
            this.itemOriginal = { Id: 0, MascotaTipoId: 0, Descripcion: "", Activo: true, MascotaTipo: { Id: mySel.value, Descripcion: opt, Activo: true } }
            this.shadowRoot.querySelector("#txtNombre").value = "";
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].vacunasabm.lblTituloAltaNew
        }
        if (accion == "update") {
            this.itemOriginal = dato;
            this.shadowRoot.querySelector("#txtNombre").value = dato.Descripcion;
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].vacunasabm.lblTituloAltaChange
        }
        this.shadowRoot.querySelector("#verDatos").style.display = "grid";
        this.shadowRoot.querySelector("#x").style.display = "grid";
        this.shadowRoot.querySelector("#pantallaOscura").style.display = "grid";
        this.activar();

    }
    clickDelete(e) {
        if (confirm('Delete')) {

        }
    }
    clickX() {
        this.shadowRoot.querySelector("#verDatos").style.display = "none";
        this.shadowRoot.querySelector("#x").style.display = "none";
        this.shadowRoot.querySelector("#pantallaOscura").style.display = "none";
    }
    activar() {
        this.activo = true
        const descripcion = this.shadowRoot.getElementById("txtNombre");
        if (descripcion.value.length < 2) {
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
        const descripcion = this.shadowRoot.getElementById("txtNombre");
        if (descripcion.value.length < 2 || descripcion.value.length > 50) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorNombre").removeAttribute("oculto");
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

window.customElements.define("vacuna-abm", vacunaAbm);