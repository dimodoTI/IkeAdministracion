import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { button } from "../css/button"
import { USUARIO, MASCOTA, VACUNA, CONSULTA, FOTO } from "../../../assets/icons/icons";
import { modoPantalla } from "../../redux/actions/ui";
import { idiomas } from "../../redux/datos/idiomas";
import { select } from "../css/select"
import { cardRaza } from "../css/cardRaza"
import { MAS, BASURA, MODIFICAR, ARRIBA, ABAJO } from "../../../assets/icons/icons"
import { ikeInput } from "../css/ikeInput"


export class razaAbm extends connect(store)(LitElement) {
    constructor() {
        super();
        this.TOCK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE1OTI0NTg1MTksImV4cCI6MTU5MjQ2MzkxOSwiaWF0IjoxNTkyNDU4NTE5fQ.m6skA3UUdCoiUkkCp1QcuUQs9ipJy570Sr8rnhLdfQo"
        this.idioma = "ES"
        this.accion = ""
        this.itemOriginal = {}
        this.activo = false;
        this.razas = [{
            id: 1, nombre: "Boxer", activo: true
        }, {
            id: 2, nombre: "Chiguagua", activo: false
        }, {
            id: 3, nombre: "Calle", activo: true
        }, {
            id: 4, nombre: "Policia", activo: false
        }, {
            id: 5, nombre: "Caniche", activo: true
        }, {
            id: 6, nombre: "Salchicha", activo: true
        }, {
            id: 6, nombre: "Salchicha", activo: true
        }, {
            id: 6, nombre: "Salchicha", activo: true
        }, {
            id: 6, nombre: "Salchicha", activo: true
        }, {
            id: 6, nombre: "Salchicha", activo: true
        }, {
            id: 6, nombre: "Salchicha", activo: true
        }, {
            id: 6, nombre: "Salchicha Ultima", activo: true
        }]
    }

    static get styles() {
        return css`
        ${button}
        ${select}
        ${cardRaza}
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
                    <div id="divTituloLbl">${idiomas[this.idioma].razaabm.titulo}</div>
                    <div></div>
                </div>
                <div id="divBtnMas" @click="${function () { this.clickAlta('alta', null) }}">${MAS}</div>
            </div>

            <div id=divRegistros>
                ${this.razas.map(dato => html`
                    <div id="crazaDivCuerpo">
                        <div id="crazaDivActivo">${idiomas[this.idioma].razaabm.datoActivo} ${dato.activo ? idiomas[this.idioma].SiNo.si : idiomas[this.idioma].SiNo.no}</div>
                        <div></div>
                        <div id="divSvgUpdate"  valor="2" class="svgOpciones" @click="${function () { this.clickAlta('update', dato) }}">${MODIFICAR}</div>
                        <div id="crazaDivNombre">${dato.nombre}</div>
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
                    <div class="ikeInput">
                        <label id="lblNombre">${idiomas[this.idioma].razaabm.lblNombre}</label>
                        <input id="txtNombre"  @input=${this.activar} placeholder=${idiomas[this.idioma].razaabm.lblNombre_ph}>
                        <label id="lblErrorNombre" error oculto>Raza Incorrecto</label>
                    </div>
                    <div id="selectActivo" class="select" > 
                        <label >${idiomas[this.idioma].razaabm.lblActivo}</label>
                        <select style="width:100%;height:2rem;" id="activo">          
                            <option value=true .selected="${this.itemOriginal.activo}">${idiomas[this.idioma].SiNo.si}</option>
                            <option value=false .selected="${!this.itemOriginal.activo}">${idiomas[this.idioma].SiNo.no}</option>
                        </select>
                    </div>
                    <button id="btnAceptar"  @click=${this.clickAccion} btn1 apagado>${idiomas[this.idioma].razaabm.btnGrabar}</button>                 
                </div>
            </div>
            <hc2-spinner></hc2-spinner>
        `
    }

    stateChanged(state, name) {

    }
    firstUpdated(changedProperties) {
    }

    clickAccion() {
        const nombre = this.shadowRoot.getElementById("txtNombre").value;
        const activo = this.shadowRoot.getElementById("activo").value;

        if (this.accion == "alta") {
            let regNuevo = { "nombre": nombre, "activo": activo }
            //            store.dispatch(addUsuario(regNuevo, this.TOCK))
        }
        if (this.accion == "update") {
            if (this.activo) {
                if (this.valido()) {
                    var datoUpdate = [];
                    nombre != this.itemOriginal.nombre ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Nombre",
                        "value": nombre
                    }) : null
                    activo.toString().toUpperCase() != this.itemOriginal.activo.toUpperCase() ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Activo",
                        "value": activo
                    }) : null
                    if (datoUpdate) {
                        //                        store.dispatch(patchUsuario(this.itemOriginal.id, datoUpdate, this.TOCK))
                    }
                }
            }
        }
    }

    clickMostrarDatos() {
        //store.dispatch(getUsuario(null, this.TOCK))
        //store.dispatch(getUsuario(null, store.getState().cliente.datos.token))
    }
    clickAlta(accion, dato) {
        this.accion = accion;
        if (accion == "alta") {
            this.itemOriginal = { id: 0, nombre: "", activo: true };
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].razaabm.lblTituloAltaNew
        }
        if (accion == "update") {
            this.itemOriginal = dato;
            this.shadowRoot.querySelector("#txtNombre").value = dato.nombre;
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].razaabm.lblTituloAltaChange
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
        const nombre = this.shadowRoot.getElementById("txtNombre");
        if (nombre.value.length < 2) {
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
        const nombre = this.shadowRoot.getElementById("txtNombre");
        if (nombre.value.length < 2 || nombre.value.length > 50) {
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

window.customElements.define("raza-abm", razaAbm);