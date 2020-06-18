import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { label } from "../css/label"
import { repeat } from 'lit-html/directives/repeat.js';
import { idiomas } from "../../redux/datos/idiomas"
import { REGALO, CARRITO, RELOJ, NOVEDADES1, NOVEDADES2, NOVEDADES3, HOME, MASCOTA, CONSULTA, VACUNA, FOTO, MAS } from "../../../assets/icons/icons"
import { tiempos } from "../../redux/datos/tiempoEspera";

const PUBLICIDAD_TIMESTAMP = "publicidad.timeStamp"
export class marquesinaComponente extends connect(store, PUBLICIDAD_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.item = {}
        this.mediaSize = ""
        this.tipo = "A"
        this.idioma = "ES"
        this.etiquetaAncho = "8rem"
    }

    static get styles() {
        return css`
        ${label}
        :host{
            position: relative;
            display: grid; 
            grid-auto-flow: column;
            background-color: transparent;
            grid-template-rows: 98%;
            grid-gap:1rem;
            height:100%;
            width:auto;
        }
        #cuerpo-marq{
            position: relative;
            display: grid;
            height: 98%;
            background-color: var(--color-celeste);
            align-items:center; 
            justify-content:center;
            grid-template-columns:100%;
            grid-gap:0;
            border-radius:.4rem;
        }
        .cuerpo-marq-combinado{
             grid-template-rows: 70% 30%;
        }
        .cuerpo-marq-uno{
            grid-template-rows: 100%;
        }
        .img-marq-dos{
            height: 100%;
            width: 100%;
            display: grid;
            align-items:center; 
            justify-content:center;
        }
        .img-marq-dos img{
            height: 70%;
            width: auto;
            justify-self: center;
       }
        .img-marq-solo{
            height: 100%;
            width: 100%;
            display: grid;
            align-items:center; 
            justify-content:center;
        }
        .img-marq-solo img{
            justify-self: center;
            height: 100%;
            width: 100%;
            object-fit: contain;
            border-radius:.4rem;
        }
        #lbl-marq{
            position: relative;
            align-items:center; 
            justify-content:center;
            text-align: center;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
            color:var(--color-blanco);
        }
        `
    }
    render() {
        if (this.item) {
            return html`
        ${
                repeat(this.item, (dato) => dato.texto, (dato, index) => html`
                <div id="cuerpo-marq" class="${!dato.texto == '' ? 'cuerpo-marq-combinado' : 'cuerpo-marq-uno'}"
                style="background-color:var(${dato.color});width:${this.etiquetaAncho}">
                    <div class="${!dato.texto == '' ? 'img-marq-dos' : 'img-marq-solo'}" >
                    <img  style="content:var(${dato.imagen})"/>
                    </div>
                    <label id="lbl-marq" >${!dato.texto == '' > 0 ? idiomas[this.idioma].publicidad.marquesina[dato.texto].lbl : ''}</label>
                </div>                
            `)
                }
        `
        }
    }
    stateChanged(state, name) {
        if (name == PUBLICIDAD_TIMESTAMP) {
            this.item = state.publicidad.entities.filter(item => { return item.tipo == this.tipo });
            this.update();
        }
    }
    static get properties() {
        return {
            tipo: {
                type: String,
                reflect: false
            },
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            etiquetaAncho: {
                type: String,
                reflect: true,
                attribute: 'etiqueta-ancho'
            }
        }
    }
}

window.customElements.define("marquesina-componente", marquesinaComponente);