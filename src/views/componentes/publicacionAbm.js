import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { button } from "../css/button"
import { USUARIO, MASCOTA, VACUNA, CONSULTA, FOTO } from "../../../assets/icons/icons";
import { modoPantalla } from "../../redux/actions/ui";
import { idiomas } from "../../redux/datos/idiomas";
import { select } from "../css/select"
import { cardOnboarding } from "../css/cardOnboarding"
import { cardFlier } from "../css/cardFlier"
import { cardCarrusel1 } from "../css/cardCarrusel1"
import { cardCarrusel2 } from "../css/cardCarrusel2"
import { MAS, BASURA, MODIFICAR, ARRIBA, ABAJO } from "../../../assets/icons/icons"
import { ikeInput } from "../css/ikeInput"

export class publicacionAbm extends connect(store)(LitElement) {
    constructor() {
        super();
        this.idioma = "ES"
        this.item = { tipo: "D" }
        this.publicaciones = [{ tipo: "A", imagen: "--imagen-regalo", titulo: "0", leyenda: "", btnCaption: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/", orden: "0" },
        { tipo: "A", imagen: "--imagen-carrito", titulo: "1", leyenda: "", btnCaption: "", color: "--color-amarillo", http: "http://www.ikeargentina.com.ar/", orden: "0" },
        { tipo: "A", imagen: "--imagen-reloj", titulo: "2", leyenda: "", btnCaption: "", color: "--color-rosa", http: "http://www.ikeargentina.com.ar/", orden: "0" },
        { tipo: "A", imagen: "--imagen-regalo", titulo: "3", leyenda: "", btnCaption: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/", orden: "0" },
        { tipo: "B", imagen: "--imagen-novedades01", titulo: "", leyenda: "", btnCaption: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/", orden: "0" },
        { tipo: "B", imagen: "--imagen-novedades02", titulo: "", leyenda: "", btnCaption: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/", orden: "0" },
        { tipo: "B", imagen: "--imagen-novedades03", titulo: "", leyenda: "", btnCaption: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/", orden: "0" },
        { tipo: "B", imagen: "--imagen-novedades03", titulo: "", leyenda: "", btnCaption: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/", orden: "0" },
        { tipo: "B", imagen: "--imagen-novedades03", titulo: "", leyenda: "", btnCaption: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/", orden: "0" },
        { tipo: "B", imagen: "--imagen-novedades03", titulo: "", leyenda: "", btnCaption: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/", orden: "0" },
        { tipo: "C", imagen: "--imagen-fondo-agenda", titulo: "Visitá al veterinario, sin moverte del sillón.", leyenda: "", btnCaption: "Agenda una consulta.", color: "#FFF2D9", http: "http://www.ikeargentina.com.ar/", orden: "0" },
        { tipo: "D", imagen: "", titulo: "Cuidalos. Sin salir de tu casa", leyenda: "Accedé a consultas online y chat personalizado con nuestros profesionales.", btnCaption: "", color: "", http: "", orden: "0" },
        { tipo: "D", imagen: "", titulo: "Lo que necesitas, al alcance de tu mano.", leyenda: "Consultá la historia clínica de tus mascotas en cualquier momento y lugar.", btnCaption: "", color: "", http: "", orden: "0" },
        { tipo: "D", imagen: "", titulo: "Te ayudamos a darles lo mejor", leyenda: "Chequeá el calendario de vacunación para estar siempre al día.", btnCaption: "", color: "", http: "", orden: "0" }
        ]
    }

    static get styles() {
        return css`
        ${button}
        ${select}
        ${cardOnboarding}
        ${cardFlier}
        ${cardCarrusel1}
        ${cardCarrusel2}
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
        #divRegistrosFlier, #divRegistrosCarrusel1, #divRegistrosCarrusel2{
            display:none;
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
                    <div id="divTituloLbl">${idiomas[this.idioma].publicacionesabm.titulo}</div>
                    <div id="divTituloImgUp" @click=${this.clickMostrarFiltro}>
                        ${ARRIBA}
                    </div>
                    <div id="divTituloImgDown" @click=${this.clickMostrarFiltro}>
                        ${ABAJO}
                    </div>
                </div>
                <div id="divBtnMas" @click=${this.clickAlta}>${MAS}</div>
            </div>
            <div id="divSeleccion">
                <div id="selectFiltro" class="select" > 
                    <label >${idiomas[this.idioma].usuarioabm.lblFiltro}</label>
                    <select style="width:100%;height:2rem;" id="filtro" @change=${this.clickMostrarDatos}>          
                        <option value="D" .selected="${this.item.tipo == "D"}">Onboarding</option>
                        <option value="C" .selected="${this.item.tipo == "C"}">flier</option>
                        <option  value="A" .selected="${this.item.tipo == "A"}">Carrusel-1</option>
                        <option  value="B" .selected="${this.item.tipo == "B"}">Carrusel-2</option>
                    </select>
                </div>
            </div>
            <div id=divRegistrosOnboarding class="classRegistros" alto="chico">
                ${this.publicaciones.filter(dato => { return dato.tipo == this.item.tipo }).map(dato => html`
                    <div id="cobDivCuerpo">
                        <div ></div>
                        <div id="cobDivSvgUpdate" class="cobSvgOpciones" @click=${this.clickAlta}>${MODIFICAR}</div>
                        <div id="cobDivSvgDelete" class="cobSvgOpciones" @click=${this.clickDelete}>${BASURA}</div>
                        <div id="cobDivTitulo">${idiomas[this.idioma].publicacionesabm.lblTitulo} ${dato.titulo}</div>
                        <div id="cobDivLeyenda">${idiomas[this.idioma].publicacionesabm.lblLeyenda} ${dato.leyenda}</div>
                        <div id="cobDivOrden">${idiomas[this.idioma].publicacionesabm.lblOrden} ${dato.orden}</div>
                    </div>
                `)}
                <div style="height:.5rem;"></div>
            </div>
            <div id=divRegistrosFlier class="classRegistros" alto="chico">
                ${this.publicaciones.filter(dato => { return dato.tipo == this.item.tipo }).map(dato => html`
                    <div id="cflierDivCuerpo">
                        <div id="cflierDivColor">${idiomas[this.idioma].publicacionesabm.lblColor} ${dato.color}</div>
                        <div id="cflierDivSvgUpdate" class="cflierSvgOpciones" @click=${this.clickAlta}>${MODIFICAR}</div>
                        <div id="cflierDivSvgDelete" class="cflierSvgOpciones" @click=${this.clickDelete}>${BASURA}</div>
                        <div id="cflierDivTitulo">${idiomas[this.idioma].publicacionesabm.lblTitulo} ${dato.titulo}</div>
                        <div id="cflierDivBoton">${idiomas[this.idioma].publicacionesabm.lblBoton} ${dato.btnCaption}</div>
                        <div id="cflierDivHttp">${idiomas[this.idioma].publicacionesabm.lblHttp} ${dato.http}</div>
                        <div id="cflierDivImagen">${idiomas[this.idioma].publicacionesabm.lblImagen} ${dato.imagen}</div>
                    </div>
                `)}
                <div style="height:.5rem;"></div>
            </div>
            <div id=divRegistrosCarrusel1 class="classRegistros" alto="chico">
                ${this.publicaciones.filter(dato => { return dato.tipo == this.item.tipo }).map(dato => html`
                    <div id="ccar1DivCuerpo">
                        <div id="ccar1DivColor">${idiomas[this.idioma].publicacionesabm.lblColor} ${dato.color}</div>
                        <div id="ccar1DivSvgUpdate" class="ccar1SvgOpciones" @click=${this.clickAlta}>${MODIFICAR}</div>
                        <div id="ccar1DivSvgDelete" class="ccar1SvgOpciones" @click=${this.clickDelete}>${BASURA}</div>
                        <div id="ccar1DivTitulo">${idiomas[this.idioma].publicacionesabm.lblTitulo} ${dato.titulo}</div>
                        <div id="ccar1DivHttp">${idiomas[this.idioma].publicacionesabm.lblHttp} ${dato.http}</div>
                        <div id="ccar1DivImagen">${idiomas[this.idioma].publicacionesabm.lblImagen} ${dato.imagen}</div>
                        <div id="ccar1DivOrden">${idiomas[this.idioma].publicacionesabm.lblOrden} ${dato.orden}</div>
                    </div>
                `)}
                <div style="height:.5rem;"></div>
            </div>
            <div id=divRegistrosCarrusel2 class="classRegistros" alto="chico">
                ${this.publicaciones.filter(dato => { return dato.tipo == this.item.tipo }).map(dato => html`
                    <div id="ccar2DivCuerpo">
                        <div id="ccar2DivColor">${idiomas[this.idioma].publicacionesabm.lblColor} ${dato.color}</div>
                        <div id="ccar2DivSvgUpdate" class="ccar2SvgOpciones" @click=${this.clickAlta}>${MODIFICAR}</div>
                        <div id="ccar2DivSvgDelete" class="ccar2SvgOpciones" @click=${this.clickDelete}>${BASURA}</div>
                        <div id="ccar2DivHttp">${idiomas[this.idioma].publicacionesabm.lblHttp} ${dato.http}</div>
                        <div id="ccar2DivImagen">${idiomas[this.idioma].publicacionesabm.lblImagen} ${dato.imagen}</div>
                        <div id="ccar2DivOrden">${idiomas[this.idioma].publicacionesabm.lblOrden} ${dato.orden}</div>
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
                    <div id="divTituloForm" class="ikeInput">
                        <label id="lblTitulo">${idiomas[this.idioma].publicacionesabm.lblTitulo}</label>
                        <input id="txtTitulo"  @input=${this.activar}>
                        <label id="lblErrorTitulo" error oculto>Titulo Incorrecto</label>
                    </div>
                    <div id="divLeyendaForm" class="ikeInput">
                        <label id="lblLeyenda">${idiomas[this.idioma].publicacionesabm.lblLeyenda}</label>
                        <input id="txtLeyenda"  @input=${this.activar}>
                        <label id="lblErrorLeyenda" error oculto>Leyenda Incorrecta</label>
                    </div>
                    <div id="divColorForm" class="ikeInput">
                        <label id="lblColor">${idiomas[this.idioma].publicacionesabm.lblColor}</label>
                        <input id="txtColor" @input=${this.activar} placeholder=${idiomas[this.idioma].publicacionesabm.lblColor_ph}>
                        <label id="lblErrorColor" error oculto>Color Erroneo</label>
                    </div>
                    <div id="divImagenForm" class="ikeInput">
                        <label id="lblImagen">${idiomas[this.idioma].publicacionesabm.lblImagen}</label>
                        <input id="txtImagen" @input=${this.activar} placeholder=${idiomas[this.idioma].publicacionesabm.lblImagen_ph}>
                        <label id="lblErrorImagen" error oculto>Imagen Erronea</label>
                    </div>
                    <div id="divBotonForm" class="ikeInput">
                        <label id="lblBoton">${idiomas[this.idioma].publicacionesabm.lblBoton}</label>
                        <input id="txtBoton" @input=${this.activar}>
                        <label id="lblErrorBoton" error oculto>Boton caption Erroneo</label>
                    </div>
                    <div id="divHttpForm" class="ikeInput">
                        <label id="lblHttp">${idiomas[this.idioma].publicacionesabm.lblHttp}</label>
                        <input id="txtHttp" @input=${this.activar} placeholder=${idiomas[this.idioma].publicacionesabm.lblHttp_ph}>
                        <label id="lblErrorHttp" error oculto>Http Erroneo</label>
                    </div>
                    <div id="divOrdenForm" class="ikeInput">
                        <label id="lblOrden">${idiomas[this.idioma].publicacionesabm.lblOrden}</label>
                        <input id="txtOrden" @input=${this.activar} >
                        <label id="lblErrorOrden" error oculto>Orden Erroneo</label>
                    </div>
                    <button id="btnAceptar" btn1>${idiomas[this.idioma].publicacionesabm.btnGrabar}</button>                 
                </div>
            </div>
        `
    }
    clickMostrarDatos() {
        this.item.tipo = this.shadowRoot.querySelector("#filtro").value
        this.shadowRoot.querySelector("#divRegistrosOnboarding").style.display = "none"
        this.shadowRoot.querySelector("#divRegistrosFlier").style.display = "none"
        this.shadowRoot.querySelector("#divRegistrosCarrusel1").style.display = "none"
        this.shadowRoot.querySelector("#divRegistrosCarrusel2").style.display = "none"
        switch (this.item.tipo) {
            case "A":
                this.shadowRoot.querySelector("#divRegistrosCarrusel1").style.display = "grid"
                break;
            case "B":
                this.shadowRoot.querySelector("#divRegistrosCarrusel2").style.display = "grid"
                break;
            case "C":
                this.shadowRoot.querySelector("#divRegistrosFlier").style.display = "grid"
                break;
            case "D":
                this.shadowRoot.querySelector("#divRegistrosOnboarding").style.display = "grid"
                break;
        }
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
    clickAlta(e) {
        if (e.currentTarget.id == "divBtnMas") {
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].publicacionesabm.lblTituloAltaNew
        }
        if (e.currentTarget.id == "cobDivSvgUpdate") {
            this.shadowRoot.querySelector("#lblTituloDatos").innerHTML = idiomas[this.idioma].publicacionesabm.lblTituloAltaChange
        }
        this.shadowRoot.querySelector("#divTituloForm").style.display = "none";
        this.shadowRoot.querySelector("#divLeyendaForm").style.display = "none";
        this.shadowRoot.querySelector("#divColorForm").style.display = "none";
        this.shadowRoot.querySelector("#divImagenForm").style.display = "none";
        this.shadowRoot.querySelector("#divBotonForm").style.display = "none";
        this.shadowRoot.querySelector("#divHttpForm").style.display = "none";
        this.shadowRoot.querySelector("#divOrdenForm").style.display = "grid";
        switch (this.item.tipo) {
            case "A":
                this.shadowRoot.querySelector("#divTituloForm").style.display = "grid";
                this.shadowRoot.querySelector("#divColorForm").style.display = "grid";
                this.shadowRoot.querySelector("#divImagenForm").style.display = "grid";
                this.shadowRoot.querySelector("#divHttpForm").style.display = "grid";
                break;
            case "B":
                this.shadowRoot.querySelector("#divColorForm").style.display = "grid";
                this.shadowRoot.querySelector("#divImagenForm").style.display = "grid";
                this.shadowRoot.querySelector("#divHttpForm").style.display = "grid";
                break;
            case "C":
                this.shadowRoot.querySelector("#divTituloForm").style.display = "grid";
                this.shadowRoot.querySelector("#divColorForm").style.display = "grid";
                this.shadowRoot.querySelector("#divImagenForm").style.display = "grid";
                this.shadowRoot.querySelector("#divBotonForm").style.display = "grid";
                this.shadowRoot.querySelector("#divHttpForm").style.display = "grid";
                this.shadowRoot.querySelector("#divOrdenForm").style.display = "none";
                break;
            case "D":
                this.shadowRoot.querySelector("#divTituloForm").style.display = "grid";
                this.shadowRoot.querySelector("#divLeyendaForm").style.display = "grid";
                break;
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

window.customElements.define("publicacion-abm", publicacionAbm);