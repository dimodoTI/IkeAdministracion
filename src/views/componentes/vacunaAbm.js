import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { button } from "../css/button"
import { USUARIO, MASCOTA, VACUNA, CONSULTA, FOTO } from "../../../assets/icons/icons";
import { modoPantalla } from "../../redux/actions/ui";
import { idiomas } from "../../redux/datos/idiomas";
import { select } from "../css/select"
import { cardOnboarding } from "../css/cardOnboarding"
import { cardVacuna } from "../css/cardVacuna"
import { MAS, BASURA, MODIFICAR, ARRIBA, ABAJO } from "../../../assets/icons/icons"
import { ikeInput } from "../css/ikeInput"

export class vacunaAbm extends connect(store)(LitElement) {
    constructor() {
        super();
        this.idioma = "ES"
        this.item = { id: 1 }
        this.vacunaOriginal = { idMascota: 1, mascota: "Perro", vacuna: "", para: "", edad: "", obligatoria: "", activo: true };
        this.vacunas = [{ idMascota: 1, mascota: "Perro", vacuna: "Perro Quíntuple Refuerzo", para: "Tos de las perreras - Hepatitis - Moquillo - Parvovirus", edad: "Cachorros", obligatoria: "Obligatoria", activo: true },
        { idMascota: 1, mascota: "Perro", vacuna: "Quíntuple", para: "Tos de las perreras - Hepatitis - Moquillo - Parvovirus", edad: "Cachorros", obligatoria: "Obligatoria", activo: true },
        { idMascota: 1, mascota: "Perro", vacuna: "Tetano", para: "Tetano", edad: "Cachorros", obligatoria: "Obligatoria", activo: true },
        { idMascota: 2, mascota: "Gato", vacuna: " Gato Quíntuple Refuerzo", para: "Tos de las perreras - Hepatitis - Moquillo - Parvovirus", edad: "Cachorros", obligatoria: "Obligatoria", activo: true },
        { idMascota: 2, vacuna: "Rabia", para: "Rabia", edad: "Cachorros", obligatoria: "Obligatoria", activo: true },
        { idMascota: 2, vacuna: "Quíntuple", para: "Tos de las perreras - Hepatitis - Moquillo - Parvovirus", edad: "Cachorros", obligatoria: "Obligatoria", activo: true },
        { idMascota: 2, vacuna: "Tetano", para: "Tetano", edad: "Cachorros", obligatoria: "Obligatoria", activo: true }
        ]


    }

    static get styles() {
        return css`
        ${button}
        ${select}
        ${cardOnboarding}
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
            grid-gap: .3rem;
            overflow-y:auto;
            align-content: flex-start;
            height: calc(((100vh * .9) * .82) - 10.5rem);
        }
        .classRegistros::-webkit-scrollbar {
            display: none;
        }
        :host([media-size="small"]) .classRegistros[alto="chico"]{
            height: calc(((100vh * .9) * .82) - 5.5rem);
            grid-gap: .6rem;  
        }
        :host([media-size="small"]) .classRegistros[alto="grande"]{
            height: calc(((100vh * .9) * .82) - 2rem);
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
                        <option value="1" .selected="${this.item.id == "1"}">Perro</option>
                        <option value="2" .selected="${this.item.id == "2"}">Gato</option>
                    </select>
                </div>
            </div>
            <div id=divRegistrosPerro class="classRegistros" alto="chico">
                ${this.vacunas.filter(dato => { return dato.idMascota == this.item.id }).map(dato => html`
                    <div id="ccDivEtiqueta">
                        <div id ="ccDivVacuna">${dato.vacuna}</div>
                        <div id="cobDivSvgUpdate" class="cobSvgOpciones" @click="${function () { this.clickAlta('update', dato) }}">${MODIFICAR}</div>
                        <div id="ccDivPara">${idiomas[this.idioma].vacunasabm.lblTitulo} ${dato.para}</div>
                        <div id="ccDivCachorro">${dato.edad}</div>
                        <div id="ccDivObligatorio">${dato.obligatoria}</div>
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
                    <div id="divMascotaSelect" class="select" > 
                        <label >${idiomas[this.idioma].vacunasabm.lblMascota}</label>
                        <select style="width:100%;height:2rem;" id="selectMascota">          
                            <option value="1" .selected="${this.item.id == "1"}">Perro</option>
                            <option value="2" .selected="${this.item.id == "2"}">Gato</option>
                        </select>
                    </div>

                    <div id="divVacunaForm" class="ikeInput">
                        <label id="lblVacuna">${idiomas[this.idioma].vacunasabm.lblVacuna}</label>
                        <input id="txtVacuna" @input=${this.activar} placeholder=${idiomas[this.idioma].vacunasabm.lblVacuna_ph}>
                        <label id="lblErrorVacuna" error oculto>Vacuna Erronea</label>
                    </div>
                    <div id="divParaForm" class="ikeInput">
                        <label id="lblPara">${idiomas[this.idioma].vacunasabm.lblPara}</label>
                        <input id="txtPara" @input=${this.activar} placeholder=${idiomas[this.idioma].vacunasabm.lblPara_ph}>
                        <label id="lblErrorPara" error oculto>Para Erroneo</label>
                    </div>
                    <div id="divEdadForm" class="ikeInput">
                        <label id="lblEdad">${idiomas[this.idioma].vacunasabm.lblEdad}</label>
                        <input id="txtEdad" @input=${this.activar} placeholder=${idiomas[this.idioma].vacunasabm.lblEdad_ph}>
                        <label id="lblErrorEdad" error oculto>Edad Erronea</label>
                    </div>
                    <div id="divObligatoriaForm" class="ikeInput">
                        <label id="lblObligatoria">${idiomas[this.idioma].vacunasabm.lblObligatoria}</label>
                        <select style="width:100%;height:2rem;" id="selectObligatoria">          
                            <option value="${idiomas[this.idioma].SiNo.si}" .selected="${this.vacunaOriginal.activo}">${idiomas[this.idioma].SiNo.si}</option>
                            <option value="${idiomas[this.idioma].SiNo.no}" .selected="${!this.vacunaOriginal.activo}">${idiomas[this.idioma].SiNo.no}</option>
                        </select>
                    </div>
                    <div id="selectActivo" class="select" > 
                        <label id="lblActivo">${idiomas[this.idioma].vacunasabm.lblActivo}</label>
                        <select style="width:100%;height:2rem;" id="activo">          
                            <option value="${idiomas[this.idioma].SiNo.si}" .selected="${this.vacunaOriginal.activo}">${idiomas[this.idioma].SiNo.si}</option>
                            <option value="${idiomas[this.idioma].SiNo.no}" .selected="${!this.vacunaOriginal.activo}">${idiomas[this.idioma].SiNo.no}</option>
                        </select>
                    </div>
                    <button id="btnAceptar"  @click=${this.clickAccion} btn1 apagado>${idiomas[this.idioma].usuarioabm.btnGrabar}</button>                 
                </div>
            </div>
        `
    }
    clickMostrarDatos() {
        this.item.id = this.shadowRoot.querySelector("#filtro").value
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
        if (accion == "alta") {
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].vacunasabm.lblTituloAltaNew
            this.vacunaOriginal = { idMascota: 0, vacuna: "", para: "", edad: "", obligatoria: true, activo: true }
        }
        if (accion == "update") {
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].vacunasabm.lblTituloAltaChange
            this.vacunaOriginal = dato;
            this.shadowRoot.querySelector("#txtVacuna").value = dato.vacuna
            this.shadowRoot.querySelector("#txtPara").value = dato.para
            this.shadowRoot.querySelector("#txtEdad").value = dato.edad
        }
        this.shadowRoot.querySelector("#verDatos").style.display = "grid";
        this.shadowRoot.querySelector("#x").style.display = "grid";
        this.shadowRoot.querySelector("#pantallaOscura").style.display = "grid";
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