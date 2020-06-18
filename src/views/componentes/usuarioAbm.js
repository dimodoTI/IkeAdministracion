import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { button } from "../css/button"
import { USUARIO, MASCOTA, VACUNA, CONSULTA, FOTO } from "../../../assets/icons/icons";
import { modoPantalla } from "../../redux/actions/ui";
import { idiomas } from "../../redux/datos/idiomas";
import { select } from "../css/select"
import { cardUsuarios } from "../css/cardUsuarios"
import { MAS, BASURA, MODIFICAR, ARRIBA, ABAJO } from "../../../assets/icons/icons"
import { ikeInput } from "../css/ikeInput"
import { get as getUsuario, patch as patchUsuario, add as addUsuario } from "../../redux/actions/usuario";

const USUARIO_TIMESTAMP = "usuario.timeStamp"
const USUARIO_UPDATETIMESTAMP = "usuario.updateTimeStamp"
const USUARIO_ADDTIMESTAMP = "usuario.addTimeStamp"
const USUARIO_ERRORGETTIMESTAMP = "usuario.errorTimeStamp"
const USUARIO_ERROROTROSTIMESTAMP = "usuario.commandErrorTimeStamp"
export class usuarioAbm extends connect(store, USUARIO_TIMESTAMP, USUARIO_UPDATETIMESTAMP, USUARIO_ADDTIMESTAMP, USUARIO_ERRORGETTIMESTAMP, USUARIO_ERROROTROSTIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.TOCK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE1OTI1MDIwMzcsImV4cCI6MTU5MjUwNzQzNywiaWF0IjoxNTkyNTAyMDM3fQ.96lLS2Yd0cVhF89_XKG3JMfoWxUY851OrbClKmwy-_0"
        this.idioma = "ES"
        this.accion = ""
        this.itemOriginal = {}
        this.activo = false;
        this.usuarios = [{
            nombre: "Daniel Di Lorenzo", mail: "daniel@gmail.com", activo: true,
            documento: "12341236", clase: "Cliente"
        }, {
            nombre: "Bruno Manfrinotti", mail: "bruno@gmail.com", activo: true,
            documento: "23423456", clase: "Cliente"
        }, {
            nombre: "Manuel Dominguez", mail: "manuel@gmail.com", activo: true,
            documento: "56756789", clase: "Veterinario"
        }, {
            nombre: "Sebastian Real", mail: "manuel@gmail.com", activo: true,
            documento: "56756789", clase: "Veterinario"
        }, {
            nombre: "Sebastian Real", mail: "manuel@gmail.com", activo: true,
            documento: "56756789", clase: "Veterinario"
        }, {
            nombre: "Sebastian Real", mail: "manuel@gmail.com", activo: true,
            documento: "56756789", clase: "Veterinario"
        }]
    }

    static get styles() {
        return css`
        ${button}
        ${select}
        ${cardUsuarios}
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
        #divRegistros{
            display:none;
            grid-gap: .3rem;
            overflow-y:auto;
            align-content: flex-start;
            height: calc(((100vh * .9) * .82) - 10.5rem);
        }
        #divRegistros::-webkit-scrollbar {
            display: none;
        }
        :host([media-size="small"]) #divRegistros[alto="chico"]{
            height: calc(((100vh * .9) * .82) - 10.5rem);
            grid-gap: .3rem;  
        }
        :host([media-size="small"]) #divRegistros[alto="grande"]{
            height: calc(((100vh * .9) * .82) - 2rem);
            grid-gap: .3rem;  
        }
       :host(:not([media-size="small"])) #divRegistros[alto="chico"]{
            height: calc((100vh * .82) - 10.5rem);
            grid-gap: .5rem;  
        }
        :host(:not([media-size="small"])) #divRegistros[alto="grande"]{
            height: calc((100vh * .82) - 2rem);
            grid-gap: .5rem;  
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
                    <div id="divTituloLbl">${idiomas[this.idioma].usuarioabm.titulo}</div>
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
                    <select style="width:100%;height:2rem;" id="filtro">          
                        <option value="${idiomas[this.idioma].usuarioabm.filtroOpcionMail}">${idiomas[this.idioma].usuarioabm.filtroOpcionMail}</option>
                        <option value="${idiomas[this.idioma].usuarioabm.filtroOpcionDocumento}">${idiomas[this.idioma].usuarioabm.filtroOpcionDocumento}</option>
                        <option  value="${idiomas[this.idioma].usuarioabm.filtroOpcionNombre}">${idiomas[this.idioma].usuarioabm.filtroOpcionNombre}</option>
                    </select>
                </div>
                <input id="txtFiltro" @input=${this.activar} placeholder=${idiomas[this.idioma].usuarioabm.phFiltro}>
                <button id=btnFiltro btn1 style="width:100%"  @click=${this.clickMostrarDatos}>${idiomas[this.idioma].usuarioabm.btnFiltro}</button>
            </div>
            <div id=divRegistros alto="chico">
                ${this.usuarios.map(dato => html`
                    <div id="cuDivCuerpo">
                        <div id="cuDivMail">${dato.email}</div>
                        <!-- <div id="divSvgDelete" class="${!dato.perfil ? "" : dato.perfil.toUpperCase() == 'ADMIN' ? 'cuSvgHidden' : 'svgOpciones'}" @click=${this.clickDelete}>${BASURA}</div> -->
                        <div></div>
                        <div id="divSvgUpdate"  valor="2" class="${!dato.perfil ? "" : dato.perfil.toUpperCase() == 'ADMIN' ? 'cuSvgHidden' : 'svgOpciones'}" @click="${function () { this.clickAlta('update', dato) }}">${MODIFICAR}</div>
                        <div id="cuDivNombre">${dato.nombre + " " + dato.apellido}</div>
                        <div id="cuDivActivo">${idiomas[this.idioma].usuarioabm.datoActivo} ${dato.activo ? idiomas[this.idioma].SiNo.si : idiomas[this.idioma].SiNo.no}</div>
                        <div id="cuDivDocumento">
                            ${idiomas[this.idioma].usuarioabm.datoDocumento + dato.documento + "  (" + dato.perfil + ")"}
                        </div>
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
                        <label id="lblMail">${idiomas[this.idioma].usuarioabm.lblMail}</label>
                        <input id="txtMail"  @input=${this.activar} type="email" placeholder=${idiomas[this.idioma].usuarioabm.lblMail_ph}>
                        <label id="lblErrorMail" error oculto>Mail Incorrecto</label>
                    </div>
                    <div class="ikeInput">
                        <label id="lblNombre">${idiomas[this.idioma].usuarioabm.lblNombre}</label>
                        <input id="txtNombre"  @input=${this.activar} placeholder=${idiomas[this.idioma].usuarioabm.lblNombre_ph}>
                        <label id="lblErrorNombre" error oculto>Nombre Incorrecto</label>
                    </div>
                    <div class="ikeInput">
                        <label id="lblApellido">${idiomas[this.idioma].usuarioabm.lblApellido}</label>
                        <input id="txtApellido"  @input=${this.activar} placeholder=${idiomas[this.idioma].usuarioabm.lblApellido_ph}>
                        <label id="lblErrorApellido" error oculto>Apellido Incorrecto</label>
                    </div>
                    <div class="ikeInput">
                        <label id="lblDocumento">${idiomas[this.idioma].usuarioabm.lblDocumento}</label>
                        <input id="txtDocumento" @input=${this.activar} type="number" placeholder=${idiomas[this.idioma].usuarioabm.lblDocumento_ph}>
                        <label id="lblErrorDocumento" error oculto>Documento Erroneo</label>
                    </div>
                    <div class="ikeInput">
                        <label id="lblTelefono">${idiomas[this.idioma].usuarioabm.lblTelefono}</label>
                        <input id="txtTelefono" @input=${this.activar} placeholder=${idiomas[this.idioma].usuarioabm.lblTelefono_ph}>
                        <label id="lblErrorTelefono" error oculto>Telefono Erroneo</label>
                    </div>
                    <div id="selectClase" class="select" > 
                        <label >${idiomas[this.idioma].usuarioabm.lblClase}</label>
                        <select style="width:100%;height:2rem;" id="clase">          
                            <option value="${idiomas[this.idioma].perfiles.cliente}" .selected="${this.itemOriginal.perfil == idiomas[this.idioma].perfiles.cliente}">${idiomas[this.idioma].perfiles.cliente}</option>
                            <option value="${idiomas[this.idioma].perfiles.veterinario}" .selected="${this.itemOriginal.perfil == idiomas[this.idioma].perfiles.veterinario}">${idiomas[this.idioma].perfiles.veterinario}</option>
                            <option  value="${idiomas[this.idioma].perfiles.publicacion}" .selected="${this.itemOriginal.perfil == idiomas[this.idioma].perfiles.publicacion}">${idiomas[this.idioma].perfiles.publicacion}</option>
                            <option  value="${idiomas[this.idioma].perfiles.agenda}" .selected="${this.itemOriginal.perfil == idiomas[this.idioma].perfiles.agenda}">${idiomas[this.idioma].perfiles.agenda}</option>
                            <option  value="${idiomas[this.idioma].perfiles.admin}" .selected="${this.itemOriginal.perfil == idiomas[this.idioma].perfiles.admin}">${idiomas[this.idioma].perfiles.admin}</option>
                        </select>
                    </div>
                    <div id="selectActivo" class="select" > 
                        <label >${idiomas[this.idioma].usuarioabm.lblActivo}</label>
                        <select style="width:100%;height:2rem;" id="activo">          
                            <option value="${idiomas[this.idioma].SiNo.si}" .selected="${this.itemOriginal.activo}">${idiomas[this.idioma].SiNo.si}</option>
                            <option value="${idiomas[this.idioma].SiNo.no}" .selected="${!this.itemOriginal.activo}">${idiomas[this.idioma].SiNo.no}</option>
                        </select>
                    </div>
                    <button id="btnAceptar"  @click=${this.clickAccion} btn1 apagado>${idiomas[this.idioma].usuarioabm.btnGrabar}</button>                 
                </div>
            </div>
            <hc2-spinner></hc2-spinner>
        `
    }

    stateChanged(state, name) {
        if (name == USUARIO_TIMESTAMP) {
            this.usuarios = state.usuario.entities;
            this.update()
            this.shadowRoot.querySelector("#divRegistros").style.display = "grid";
        }
        if (name == USUARIO_UPDATETIMESTAMP) {
            this.clickX();
            let mId = this.itemOriginal.id > 0 ? this.itemOriginal.id : null;
            store.dispatch(getUsuario(mId, this.TOCK))
            //store.dispatch(getUsuario(mId, this.TOCK))
            //store.dispatch(getUsuario(null, store.getState().cliente.datos.token))
        }
        if (name == USUARIO_ADDTIMESTAMP) {
            this.clickX();
            store.dispatch(getUsuario(null, this.TOCK))
            //store.dispatch(getUsuario(null, store.getState().cliente.datos.token))
        }
        if (name == USUARIO_ERRORGETTIMESTAMP) {
            alert(idiomas[this.idioma].usuarioabm.errorToken)
        }
        if (name == USUARIO_ERROROTROSTIMESTAMP) {
            alert(idiomas[this.idioma].usuarioabm.errorOperacion)
            //store.dispatch(getUsuario(null, store.getState().cliente.datos.token))
        }
    }
    firstUpdated(changedProperties) {
    }

    clickAccion() {
        const email = this.shadowRoot.getElementById("txtMail").value;
        const nombre = this.shadowRoot.getElementById("txtNombre").value;
        const apellido = this.shadowRoot.getElementById("txtApellido").value;
        const documento = this.shadowRoot.getElementById("txtDocumento").value;
        const telefono = this.shadowRoot.getElementById("txtTelefono").value;
        const perfil = this.shadowRoot.getElementById("clase").value;
        const activo = this.shadowRoot.getElementById("activo").value == idiomas[this.idioma].SiNo.si ? true : false;

        if (this.accion == "alta") {
            let regNuevo = { "nombre": nombre, "apellido": apellido, "email": email, "perfil": perfil, "documento": documento }
            store.dispatch(addUsuario(regNuevo, this.TOCK))
        }
        if (this.accion == "update") {
            if (this.activo) {
                if (this.valido()) {
                    var datoUpdate = [];
                    email != this.itemOriginal.email ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Email",
                        "value": email
                    }) : null
                    nombre != this.itemOriginal.nombre ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Nombre",
                        "value": nombre
                    }) : null
                    apellido != this.itemOriginal.apellido ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Apellido",
                        "value": apellido
                    }) : null
                    documento != this.itemOriginal.documento ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Documento",
                        "value": parseInt(documento, 10)
                    }) : null
                    telefono != this.itemOriginal.telefono ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Telefono",
                        "value": telefono
                    }) : null
                    perfil != this.itemOriginal.perfil ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Perfil",
                        "value": perfil
                    }) : null
                    activo != this.itemOriginal.activo ? datoUpdate.push({
                        "op": "replace",
                        "path": "/Activo",
                        "value": activo
                    }) : null
                    if (datoUpdate) {
                        store.dispatch(patchUsuario(this.itemOriginal.id, datoUpdate, this.TOCK))
                    }
                }
            }
        }
    }

    clickMostrarDatos() {
        store.dispatch(getUsuario(null, this.TOCK))
        //store.dispatch(getUsuario(null, store.getState().cliente.datos.token))
    }
    clickMostrarFiltro(e) {
        if (this.shadowRoot.querySelector("#divSeleccion").style.display == "none") {
            this.shadowRoot.querySelector("#divSeleccion").style.display = "grid";
            this.shadowRoot.querySelector("#divRegistros").setAttribute("alto", "chico");
            this.shadowRoot.querySelector("#divTituloImgUp").style.display = "grid";
            this.shadowRoot.querySelector("#divTituloImgDown").style.display = "none";
        } else {
            this.shadowRoot.querySelector("#divSeleccion").style.display = "none";
            this.shadowRoot.querySelector("#divRegistros").setAttribute("alto", "grande")
            this.shadowRoot.querySelector("#divTituloImgUp").style.display = "none";
            this.shadowRoot.querySelector("#divTituloImgDown").style.display = "grid";
        }
    }
    clickAlta(accion, dato) {
        this.accion = accion;
        if (accion == "alta") {
            this.shadowRoot.querySelector("#selectActivo").style.display = "none";
            this.itemOriginal = { id: 0, email: "", nombre: "", apellido: "", documento: "", telefono: "", perfil: "", activo: "" };
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].usuarioabm.lblTituloAltaNew
        }
        if (accion == "update") {
            this.itemOriginal = dato;
            this.shadowRoot.querySelector("#selectActivo").style.display = "block";
            this.shadowRoot.querySelector("#txtMail").setAttribute("readonly", "")
            this.shadowRoot.querySelector("#txtMail").value = dato.email;
            this.shadowRoot.querySelector("#txtNombre").value = dato.nombre;
            this.shadowRoot.querySelector("#txtApellido").value = dato.apellido;
            this.shadowRoot.querySelector("#txtDocumento").value = dato.documento;
            this.shadowRoot.querySelector("#txtMail").value = dato.email;
            this.shadowRoot.querySelector("#txtTelefono").value = dato.telefono;
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].usuarioabm.lblTituloAltaChange
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
        const mail = this.shadowRoot.getElementById("txtMail");
        const nombre = this.shadowRoot.getElementById("txtNombre");
        const apellido = this.shadowRoot.getElementById("txtApellido");
        const documento = this.shadowRoot.getElementById("txtDocumento");
        const telefono = this.shadowRoot.getElementById("txtTelefono");
        if (mail.value.length < 4 || mail.value.indexOf("@") == -1) {
            this.activo = false
        }
        if (nombre.value.length < 2) {
            this.activo = false
        }
        if (apellido.value.length < 2) {
            this.activo = false
        }
        if (documento.value.length < 6) {
            this.activo = false
        }
        if (telefono.value.length < 0) {
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
        const mail = this.shadowRoot.getElementById("txtMail");
        const nombre = this.shadowRoot.getElementById("txtNombre");
        const apellido = this.shadowRoot.getElementById("txtApellido");
        const documento = this.shadowRoot.getElementById("txtDocumento");
        const telefono = this.shadowRoot.getElementById("txtTelefono");
        if (mail.value.length < 4 || mail.value.indexOf("@") == -1) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorMail").removeAttribute("oculto");
        }
        if (nombre.value.length < 2 || nombre.value.length > 50) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorNombre").removeAttribute("oculto");
        }
        if (apellido.value.length < 2 || apellido.value.length > 50) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorApellido").removeAttribute("oculto");
        }
        if (documento.value.length < 6 || documento.value.length > 9) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorDocumento").removeAttribute("oculto");
        }
        if (telefono.value.length < 0) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorTelefono").removeAttribute("oculto");
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

window.customElements.define("usuario-abm", usuarioAbm);