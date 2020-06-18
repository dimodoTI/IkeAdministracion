import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { button } from "../css/button"
import { USUARIO, PUBLICACION, VACUNA, CONSULTA, FOTO } from "../../../assets/icons/icons";
import { modoPantalla } from "../../redux/actions/ui";
import { idiomas } from "../../redux/datos/idiomas"

export class pieComponente extends connect(store)(LitElement) {
    constructor() {
        super();
        this.opcionAnterior = "";
        this.opcion = "";
        this.idioma = "ES"
    }

    static get styles() {
        return css`
        ${button}
        :host{
            display: grid;
            position:relative; 
            align-items:center; 
            justify-content:center;
            background-color: var(--color-blanco);
        }
        :host([media-size="small"]){
            grid-template-rows: 100% ;
            grid-template-columns: 100% ;
        }
        :host(:not([media-size="small"])){
            grid-template-rows: 24% 76% ;
            grid-template-columns: 100% ;
        }
        #pieCabecera{
            width:100%;
            height:100%;
            background-image:var(--imagen-logo-splash);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 7vw;
        }
        :host([media-size="small"]) #pieCabecera{
            display:none;
         }
        #pieMenu{
            display: grid;
            position:relative;
            align-items:center; 
            justify-content:center;
            background-color: var(--color-blanco);
        }
        :host([media-size="small"]) #pieMenu{
            grid-template-columns:repeat(5,2fr);
            grid-template-rows: 60% 40%;
            grid-gap:0.1rem;
        }
        :host(:not([media-size="small"])) #pieMenu{
            grid-template-columns: 40% 60%;
            grid-template-rows: 3rem 3rem 3rem 3rem 3rem ;
            grid-auto-flow: column;
            align-self: start;
            grid-gap:0rem;
        }
        .img{
            display:grid;
            justify-content: center;
            align-content: center;
            cursor:pointer;
            width:100%;
            height:100%;
        }
        :host(:not([media-size="small"])) .img{
            border-left: solid 4px transparent;
        }
        .img[select="SI"]{
            cursor: not-allowed;
            pointer-events: none;  
        }
        .img[select="NO"]{
            cursor: pointer;
            pointer-events: auto;  
        }
        :host(:not([media-size="small"])) .img[select="SI"]{
            border-left: solid 4px var(--color-azul-oscuro);
            background-color:var(--color-gris-fondo);
        }
        .lbl{
            width:100%;
            height:100%;
            display:grid;
            justify-content: center;
            align-content: center;
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            color:var(--color-gris-medio);
            cursor:pointer;
        }
        :host(:not([media-size="small"])) .lbl{
            justify-content: start;
        }
        .lbl[select="SI"]{
            color:var(--color-azul-oscuro);
            background-color:var(--color-gris-fondo);
            cursor: not-allowed;
            pointer-events: none;  
        }
        svg{
            width:1rem;
            height:1rem;
            stroke:var(--color-gris);
        }
        :host(:not([media-size="small"])) svg{
            width:1.5rem;
            height:1.5rem;
         }
        .img[select="SI"] svg{
            stroke:var(--color-azul-oscuro);
        }
        .img[select="NO"] svg{
            stroke:var(--color-azul-gris-claro);
            fill:var(--color-gris-claro);
        }
        #divAyudaPie{
            position:absolute;
            display:grid;
            left:0;
            bottom:1rem;
            grid-template-rows: 30% 40% 40%;
            width:100%;
            grid-gap:0rem;
            justify-items:center;
        }
        :host([media-size="small"]) #divAyudaPie{
            display:none;
        }
        .lblayudaPie{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
            width:100%;
            text-align:center;
        }
        #btn-ayudaPie{
            height:1.8rem;
            width:90%;
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
        }
        :host([media-size="medium"]) #btn-ayudaPie{
            font-size: var(--font-error-size);
        }
        #divTapaPantalla{
            position:absolute;
            z-index:10;
            display:none;
            width:100vw;
            height:100vh;
            background-color:var(--color-gris);
            opacity:.4;
        }
        :host([media-size="small"]) #divTapaPantalla{
            right:0;
            bottom:0;
        }
        :host(:not([media-size="small"])) #divPopupTablas{
            top:0;
            left:0;
        }
        #divPopupTablas{
            position:absolute;
            display:none;
            z-index:11;
            background-color:var(--color-blanco);
            border-radius:.4rem ;
            border: 1px solid var(--color-gris);
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
            align-content: normal;
            padding:.2rem .4rem .2rem .4rem;
            height:3rem;
            width:6rem;
        }
        :host([media-size="small"]) #divPopupTablas{
            bottom:2.5rem;
            left:9rem;
        }
        :host(:not([media-size="small"])) #divPopupTablas{
            top:14rem;
            left:6rem;
        }
        .itemMenuTablas{
            cursor:pointer;           
        }
        `
    }
    //    attributeChangedCallback(name, oldVal, newVal) {
    //        console.log('attribute change: ', name, newVal);
    //        super.attributeChangedCallback(name, oldVal, newVal);
    //    }
    render() {
        return html`
            <div id="pieCabecera">
            </div>
            <div id="pieMenu">
                <div id="img-usuario" select=${this.opcion == 'uno' ? 'SI' : 'NO'} @click="${this.clickBoton1}" class="img">
                    ${USUARIO}
                </div>
                <div id="img-publicaciones" select=${this.opcion == 'dos' ? 'SI' : 'NO'}  @click="${this.clickBoton2}" class="img">
                    ${PUBLICACION}
                </div>  
                <div id="img-tablas" select=${this.opcion == 'tres' ? 'SI' : 'NO'} @click="${this.clickBoton3}" class="img">
                    ${CONSULTA}
                </div>
                <div id="img-vacuna" select=${this.opcion == 'cuatro' ? 'SI' : 'NO'} @click="${this.clickBoton4}" class="img">
                    ${VACUNA}
                </div>  
                <div id="img-foto" select=${this.opcion == 'cinco' ? 'SI' : 'NO'} @click="${this.clickBoton5}" class="img">
                    ${FOTO}
                </div>          
                <div id="lbl-usuario" select=${this.opcion == 'uno' ? 'SI' : 'NO'} @click="${this.clickBoton1}"  class="lbl">
                    ${idiomas[this.idioma].pie.inicio}
                </div>
                <div id="lbl-publicaciones" select=${this.opcion == 'dos' ? 'SI' : 'NO'} @click="${this.clickBoton2}"  class="lbl">
                    ${idiomas[this.idioma].pie.mascota}
                </div>
                <div id="lbl-tablas" select=${this.opcion == 'tres' ? 'SI' : 'NO'} @click="${this.clickBoton3}"  class="lbl">
                    ${idiomas[this.idioma].pie.consulta}
                </div>
                <div id="lbl-vacuna" select=${this.opcion == 'cuatro' ? 'SI' : 'NO'} @click="${this.clickBoton4}"  class="lbl">
                    ${idiomas[this.idioma].pie.vacuna}
                </div>
                <div id="lbl-foto" select=${this.opcion == 'cinco' ? 'SI' : 'NO'} @click="${this.clickBoton5}"  class="lbl">
                    ${idiomas[this.idioma].pie.foto}
                </div>
            </div>
            <div id="divPopupTablas">
                <div id="divPopupRazas" class="itemMenuTablas" @click=${this.clickRaza}>Razas</div>
                <div id="divPopupTipoMascota" class="itemMenuTablas">Tipo de mascotas</div>
                <div id="divPopupVacunas" class="itemMenuTablas">Vacunas</div>
            </div>
            <div id="divAyudaPie">
                <hr style="width:90%; border-top: 2px solid var(--color-gris-claro)">
                <div><label class="lblayudaPie">${idiomas[this.idioma].principal.lblAyuda01}</label></div>
                <button btn3 id="btn-ayudaPie" @click=${this.clickAyudaPie}>${idiomas[this.idioma].principal.btnAyuda}</button>
            </div>
            <div id="divTapaPantalla"  @click=${this.clickTapaPantalla}></div>
        `
    }
    clickTapaPantalla() {
        this.shadowRoot.querySelector("#divTapaPantalla").style.display = "none"
        this.shadowRoot.querySelector("#divPopupTablas").style.display = "none"
        this.opcion = this.opcionAnterior
        this.update()
    }
    clickBoton1() {
        store.dispatch(modoPantalla("usuariosabm", "principal"))
    }
    clickBoton2() {
        store.dispatch(modoPantalla("publicacionesabm", "principal"))
    }
    clickBoton3() {
        this.opcionAnterior = this.opcion
        this.opcion = "tres"
        this.shadowRoot.querySelector("#divTapaPantalla").style.display = "grid"
        this.shadowRoot.querySelector("#divPopupTablas").style.display = "grid"
        this.update();
    }
    clickBoton4() {
        store.dispatch(modoPantalla("calendario", "principal"))
    }
    clickBoton5() {
        store.dispatch(modoPantalla("fotogaleria", "principal"))
    }
    clickAyudaPie() {
        store.dispatch(modoPantalla("vercobertura", "principal"))
    }
    clickRaza() {
        store.dispatch(modoPantalla("razasabm", "principal"))
    }
    static get properties() {
        return {
            opcion: {
                type: String,
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

window.customElements.define("pie-componente", pieComponente);