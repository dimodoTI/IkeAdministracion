import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { button } from "../css/button"
import { USUARIO, MASCOTA, VACUNA, CONSULTA, FOTO } from "../../../assets/icons/icons";
import { modoPantalla } from "../../redux/actions/ui";
import { idiomas } from "../../redux/datos/idiomas";
import { select } from "../css/select"
import { cardTramo } from "../css/cardTramo"
import { MAS, BASURA, MODIFICAR, ARRIBA, ABAJO } from "../../../assets/icons/icons"
import { ikeInput } from "../css/ikeInput"
import { get as getTramo, patch as patchTramo, add as addTramo } from "../../redux/actions/tramo";
import { get as getPuesto } from "../../redux/actions/puestos";

const PUESTO_TIMESTAMP = "puesto.timeStamp"
const TRAMO_TIMESTAMP = "tramo.timeStamp"
const TRAMO_UPDATETIMESTAMP = "tramo.updateTimeStamp"
const TRAMO_ADDTIMESTAMP = "tramo.addTimeStamp"
const TRAMO_ERRORGETTIMESTAMP = "tramo.errorTimeStamp"
const TRAMO_ERROROTROSTIMESTAMP = "tramo.commandErrorTimeStamp"
const MODO_PANTALLA = "ui.timeStampPantalla"

export class tramoAbm extends connect(store, PUESTO_TIMESTAMP, MODO_PANTALLA, TRAMO_TIMESTAMP, TRAMO_UPDATETIMESTAMP, TRAMO_ADDTIMESTAMP, TRAMO_ERRORGETTIMESTAMP, TRAMO_ERROROTROSTIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.TOCK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE1OTI0NTg1MTksImV4cCI6MTU5MjQ2MzkxOSwiaWF0IjoxNTkyNDU4NTE5fQ.m6skA3UUdCoiUkkCp1QcuUQs9ipJy570Sr8rnhLdfQo"
        this.idioma = "ES"
        this.accion = ""
        this.puestoSeleccionado = -1
        this.combos = { dia: 0, horainicio: 0, mininicio: 0, horafin: 0, minfin: 0, activo: true }
        this.tramoOriginal = {};
        this.activo = false;
        this.tramos = null;
        this.puestos = null;
    }

    static get styles() {
        return css`
        ${button}
        ${select}
        ${cardTramo}
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
            grid-gap: .3rem;
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
            right: .3rem;
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
        #divRegistrosVacuna{
            display:none;
        }
        `
    }
    render() {
        return html`
            <div id="divTitulo">
                <div id="divSacoFiltro">
                    <div id="divTituloLbl">${idiomas[this.idioma].tramosabm.titulo}</div>
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
                    <label >${idiomas[this.idioma].tramosabm.lblFiltro}</label>
                    <select style="width:100%;height:2rem;" id="filtro" @change=${this.clickMostrarDatos}>          
                        ${!this.puestos ? "" : this.puestos.map(dato => html`
                            <option value="${dato.Id}" .selected="${this.puestoSeleccionado == dato.Id}">${dato.Descripcion}</option>                               
                        `)}
                    </select>
                </div>
            </div>
            <div id=divRegistrosPerro class="classRegistros" alto="chico">
                ${!this.tramos ? "" : this.tramos.filter(dato => { return dato.PuestoId == this.puestoSeleccionado }).map(dato => html`
                    <div id="traDivEtiqueta">
                        <div id ="traDivDia">${idiomas[this.idioma].diaSemana[dato.Dia]}</div>
                        <div id="DivSvgUpdate" class="SvgOpciones" @click="${function () { this.clickAlta('update', dato) }}">${MODIFICAR}</div>
                        <div id="traDivHoraDesde">${idiomas[this.idioma].tramosabm.lblDe + parseInt(dato.HoraInicio / 100).toString() + ":" + dato.HoraInicio.toString().substr(-2) + "hs. " + idiomas[this.idioma].tramosabm.lblHasta + parseInt(dato.HoraFin / 100).toString() + ":" + dato.HoraFin.toString().substr(-2) + "hs. "}</div>
                        <div id="traDivFecha">${idiomas[this.idioma].tramosabm.lblFinal + dato.FechaFin.substr(8, 2) + "/" + dato.FechaFin.substr(5, 2) + "/" + dato.FechaFin.substr(0, 4)}</div>
                        <div id="traDivActivo">${idiomas[this.idioma].tramosabm.lblActivo + (dato.Activo ? idiomas[this.idioma].SiNo.si : idiomas[this.idioma].SiNo.no)}</div>
                    </div>
                `)}
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
                    <div id="divMascotaSelect" class="select"> 
                        <label >${idiomas[this.idioma].tramosabm.lblMascota}</label>
                        <select style="width:100%;height:2rem;cursor: default;" id="selectPuesto" disabled >          
                            ${!this.puestos ? "" : this.puestos.map(dato => html`
                                <option value="${dato.Id}" .selected="${this.puestoSeleccionado == dato.Id}">${dato.Descripcion}</option>                               
                            `)}
                        </select>
                    </div>

                    <div id="divVacunaForm" class="select">
                        <label >${idiomas[this.idioma].tramosabm.lblVacuna}</label>
                        <select style="width:100%;height:2rem;" id="selectDia">          
                            ${this.dias().map((index) => html`
                                <option value="${index}" .selected="${this.combos.dia == index}">${index}</option>                               
                            `)}
                        </select>
                    </div>
<!--                     <div id="divParaForm" class="ikeInput">
                        <label id="lblPara">${idiomas[this.idioma].tramosabm.lblPara}</label>
                        <input id="txtPara" @input=${this.activar} placeholder=${idiomas[this.idioma].tramosabm.lblPara_ph}>
                        <label id="lblErrorPara" error oculto>Para Erroneo</label>
                    </div>
                    <div id="divEdadForm" class="ikeInput">
                        <label id="lblEdad">${idiomas[this.idioma].tramosabm.lblEdad}</label>
                        <input id="txtEdad" @input=${this.activar} placeholder=${idiomas[this.idioma].tramosabm.lblEdad_ph}>
                        <label id="lblErrorEdad" error oculto>Edad Erronea</label>
                    </div>
                    <div id="divObligatoriaForm" class="select">
                        <label id="lblObligatoria">${idiomas[this.idioma].tramosabm.lblObligatoria}</label>
                        <select style="width:100%;height:2rem;" id="selectObligatoria">          
                            <option value=true .selected=${this.combos.optativa}>${idiomas[this.idioma].optativa.op}</option>
                            <option value=false .selected=${!this.combos.optativa}>${idiomas[this.idioma].optativa.ob}</option>
                        </select>
                    </div>
                    <div id="divActivoForm" class="select" > 
                        <label id="lblActivo">${idiomas[this.idioma].tramosabm.lblActivo}</label>
                        <select style="width:100%;height:2rem;" id="selectActivo">          
                            <option value=true .selected="${this.combos.activo}">${idiomas[this.idioma].SiNo.si}</option>
                            <option value=false .selected="${!this.combos.activo}">${idiomas[this.idioma].SiNo.no}</option>
                        </select>
                    </div> -->
                    <button id="btnAceptar"  @click=${this.clickAccion} btn1 apagado>${idiomas[this.idioma].usuarioabm.btnGrabar}</button>                 
                </div>
            </div>
        `
    }

    dias() {
        let dd = [0, 1, 2, 3, 4, 5, 6]
        return dd
    }
    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "tramosabm") {
            store.dispatch(getTramo({}))
            if (state.puestos.entities) {
                this.puestos = state.puestos.entities
                this.puestoSeleccionado = this.puestos[0].Id
            } else {
                store.dispatch(getPuesto({}))
            }
        }
        if (name == TRAMO_TIMESTAMP && state.ui.quePantalla == "tramosabm") {
            if (state.tramo.entities) {
                this.tramos = state.tramo.entities
                if (this.puestos) {
                    this.update()
                }
            }
        }
        if (name == PUESTO_TIMESTAMP && state.ui.quePantalla == "tramosabm") {
            if (state.puestos.entities) {
                this.puestos = state.puestos.entities
                if (this.puestoSeleccionado == -1) { this.puestoSeleccionado = this.puestos[0].Id }
                if (this.tramos) {
                    this.update()
                }
            }
        }
        if (name == TRAMO_ADDTIMESTAMP || name == TRAMO_UPDATETIMESTAMP) {
            store.dispatch(getTramo({}))
        }
    }
    firstUpdated(changedProperties) {
    }

    clickAccion() {
        if (this.activo) {
            if (this.valido()) {
                this.combos.mascota = this.shadowRoot.getElementById("selectMascota").value
                this.combos.vacuna = this.shadowRoot.getElementById("selectVacuna").value
                this.combos.optativa = this.shadowRoot.getElementById("selectObligatoria").value
                this.combos.activo = this.shadowRoot.getElementById("selectActivo").value
                const enfermedades = this.shadowRoot.getElementById("txtPara").value;
                const edad = this.shadowRoot.getElementById("txtEdad").value;
                var datoUpdate = [];
                if (this.accion == "alta") {
                    let regNuevo = { MascotasTipoId: this.combos.mascota, VacunaId: this.combos.vacuna, Enfermedades: enfermedades, Edad: edad, Optativa: this.combos.optativa, Activo: this.combos.activo }
                    let miToken = store.getState().cliente.datos.token
                    store.dispatch(addTramo(regNuevo, miToken))
                    this.update()
                    this.clickX()
                }
                if (this.accion == "update") {
                    var datoUpdate = [];
                    enfermedades != this.calendarioOriginal.Enfermedades ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Enfermedades",
                        "value": enfermedades
                    }) : null
                    edad != this.calendarioOriginal.Edad ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Edad",
                        "value": edad
                    }) : null
                    this.combos.mascota != this.calendarioOriginal.MascotasTipoId ? datoUpdate.push({
                        "op": "replace",
                        "path": "/MascotasTipoId",
                        "value": this.combos.mascota
                    }) : null
                    this.combos.vacuna != this.calendarioOriginal.VacunaId ? datoUpdate.push({
                        "op": "replace",
                        "path": "/VacunaId",
                        "value": this.combos.vacuna
                    }) : null
                    this.combos.optativa != this.calendarioOriginal.Optativa ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Optativa",
                        "value": this.combos.optativa
                    }) : null
                    this.combos.activo != this.calendarioOriginal.Activo ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Activo",
                        "value": this.combos.activo
                    }) : null
                    if (datoUpdate) {
                        let miToken = store.getState().cliente.datos.token
                        store.dispatch(patchTramo(this.calendarioOriginal.Id, datoUpdate, miToken))
                        this.update()
                        this.clickX()
                    }
                }
            }
        }
    }
    clickMostrarDatos() {
        this.mascotaTipoSeleccionada = this.shadowRoot.querySelector("#filtro").value
        this.update();
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
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].tramosabm.lblTituloAltaNew
            this.calendarioOriginal = { idMascota: 0, vacuna: "", para: "", edad: "", obligatoria: true, activo: true }
            this.shadowRoot.querySelector("#txtPara").value = ""
            this.shadowRoot.querySelector("#txtEdad").value = ""
            this.combos = { mascota: this.mascotasTipo[0].Id, vacuna: 0, optativa: true, activo: true }
        }
        if (accion == "update") {
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].tramosabm.lblTituloAltaChange
            this.calendarioOriginal = dato;
            this.combos = { mascota: dato.MascotasTipoId, vacuna: dato.VacunaId, optativa: dato.Optativa, activo: dato.Activo }
            //this.shadowRoot.querySelector("#txtPara").value = dato.Enfermedades
            //this.shadowRoot.querySelector("#txtEdad").value = dato.Edad
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
        //const para = this.shadowRoot.querySelector("#txtPara")
        //const edad = this.shadowRoot.querySelector("#txtEdad")
        //if (para.value.length < 2 || edad.value.length < 2) {
        //    this.activo = false
        //}
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
        //const para = this.shadowRoot.querySelector("#txtPara")
        //const edad = this.shadowRoot.querySelector("#txtEdad")
        //if (para.value.length < 3 || para.value.length > 150) {
        //    valido = false
        //    this.shadowRoot.querySelector("#lblErrorPara").removeAttribute("oculto");
        //}
        //if (edad.value.length < 3 || edad.value.length > 150) {
        //    valido = false
        //    this.shadowRoot.querySelector("#lblErrorEdad").removeAttribute("oculto");
        //}
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

window.customElements.define("tramo-abm", tramoAbm);