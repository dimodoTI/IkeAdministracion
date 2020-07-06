import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { button } from "../css/button"
import { modoPantalla } from "../../redux/actions/ui";
import { idiomas } from "../../redux/datos/idiomas";
import { MAS, BASURA, MODIFICAR, ARRIBA, ABAJO } from "../../../assets/icons/icons"
import { get as getConfiguracion, patch as patchConfiguracion, add as addConfiguracion } from "../../redux/actions/configuracion";

const MODO_PANTALLA = "ui.timeStampPantalla"

export class chatApp extends connect(store, MODO_PANTALLA)(LitElement) {
    constructor() {
        super();
        this.TOCK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE1OTI0NTg1MTksImV4cCI6MTU5MjQ2MzkxOSwiaWF0IjoxNTkyNDU4NTE5fQ.m6skA3UUdCoiUkkCp1QcuUQs9ipJy570Sr8rnhLdfQo"
        this.idioma = "ES"
        this.accion = ""
        this.chat = { id: 0, quien: "", texto: "", hora: "", fecha: "" }
        this.activo = false;
        this.chates = [];
    }

    static get styles() {
        return css`
        ${button}
        :host{
            display: grid;
            position:relative; 
            width: 100%;
            background-color: var(--color-blanco);
            grid-gap:0rem;
        }
        #divRegistros{
            display:grid;
            grid-gap: .2rem;
            height: calc(((100vh *.85) * .82) );
            grid-template-rows: 8.8fr .6fr .6fr;
            background-color:var(--color-gris-fondo);
        }
        :host(:not([media-size="small"])) #divRegistros{
            height: calc((100vh * .82));
       }
        #divChat{
            display: grid;
            flex-direction: column;
            grid-gap: .4rem;
            background-color:var(--color-gris-fondo);
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight); 
            overflow-x:none;
            overflow-y:auto;
            align-content: flex-end;
        }
        #divChat::-webkit-scrollbar {
            display: none;
        }
        #divEnviar{
            display:grid;
            width:100%;
            justify-self:center;
            grid-template-columns: 8fr 2fr;
            grid-gap:1rem;
            background-color:var(--color-gris-blanco);
            padding: .6rem 0 .1rem 0;
        }
        #divBotonTerminar{
            position:relative;
            display:grid;
            width:100%;
            padding: .2rem 0 .2rem 0;
        }
        #txtTexto{
            border-radius:.4rem;
            border: 1px solid var(--color-gris);
        }
        #chatCuerpo{
            display:grid;
            border-radius: .5rem;
            border: 1px solid var(--color-gris);
            grid-template-rows: 1rem auto 1rem;
            width:fit-content;
            height:fit-content;
            max-width:100vw;
        }
        .classCuerpoyo{
            justify-self:left;
            background-color: var(--color-blanco);
         }
        .classCuerpootro{
            justify-self:right;
            background-color: var(--color-celeste-claro);
        }
        #chatQuien{
            font-size: var(--font-label-size);
            font-weight: 900;
            padding: 0 .5rem 0 .5rem;
        }
        .classQuienyo{
            color: var(--color-azul);
            justify-self: left;
        }
        .classQuienotro{
            color: var(--color-naranja);
            justify-self: right;
        }
        #chatTexto{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
            color: var(--color-negro);
            align-self:center;
            padding: 0 .5rem 0 .5rem;
            word-wrap:break-word;
            max-width:80vw;
         }
        #chatHora{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            color: var(--color-gris-oscuro);
            align-self:flex-start;
            padding: 0 .5rem 0 .5rem;
        }
        .classHorayo{
            justify-self: right;
        }
        .classHoraotro{
            justify-self: right;
        }
        `
    }

    render() {
        return html`
            <div id=divRegistros>
                <div id="divChat">
                    ${this.chates.map(dato => html`
                        <div id="chatCuerpo" class="classCuerpo${dato.quien}">   
                            <div id="chatQuien" class="classQuien${dato.quien}">${dato.quien == 'yo' ? store.getState().cliente.datos.nombre : dato.quien}</div>
                            <div id="chatTexto">${dato.texto}</div>
                            <div id="chatHora" class="classHora${dato.quien}">${dato.hora}</div>
                        </div>
                    `)}
                </div>
                <div id="divEnviar">
                    <input id="txtTexto"  @input=${this.activar} placeholder=${idiomas[this.idioma].chatsapp.lblTextoEnviar_ph}>
                    <button id="btnAceptar"  @click=${this.clickAccion} apagado btn1>${idiomas[this.idioma].chatsapp.btnEnviar}</button>                 
                </div>
                <div id="divBotonTerminar">               
                    <button id="btnFin"  @click=${this.clickAccion} btn1>${idiomas[this.idioma].chatsapp.btnFin}</button>                 
                </div>
            </div>
        `
    }

    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "chatsapp") {
            this.chates = [];
            this.shadowRoot.getElementById("txtTexto").value = "";
            this.update();
        }
        // if (name == MODO_PANTALLA && state.ui.quePantalla == "configuracionesabm") {
        //     store.dispatch(getConfiguracion({}))
        // }
        // if (name == CONFIGURACION_TIMESTAMP && state.ui.quePantalla == "configuracionesabm") {
        //     if (state.configuracion.entities) {
        //         this.itemOriginal = state.configuracion.entities[0];
        //         this.shadowRoot.querySelector("#txtDiaRes").value = state.configuracion.entities[0].DiasReserva;
        //         this.shadowRoot.querySelector("#txtTurXHora").value = state.configuracion.entities[0].TurnosxHora;
        //         this.activar()
        //     }
        // }
        // if (name == CONFIGURACION_UPDATETIMESTAMP) {
        //     store.dispatch(getConfiguracion({}))
        // }
    }
    firstUpdated(changedProperties) {
    }

    clickAccion(e) {
        var myJson = {}
        if (e.currentTarget.id == "btnAceptar") {
            myJson.quien = "yo"
        } else {
            myJson.quien = "otro"
        }
        if (true) {
            const texto = this.shadowRoot.getElementById("txtTexto").value;
            var d = new Date();
            myJson.texto = texto
            myJson.hora = d.getHours() + ":" + d.getMinutes()
            myJson.fecha = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()

            var datoUpdate = [];
            texto != "" ? datoUpdate.push({
                "op": "replace",
                "path": "/Texto",
                "value": texto
            }) : null
            if (datoUpdate) {
                //let miToken = store.getState().cliente.datos.token
                //store.dispatch(patchConfiguracion(this.itemOriginal.Id, datoUpdate, miToken))
                this.chates.push(myJson)
                this.update()
                Promise.all([this.updateComplete, this.scrollDiv()]);

            }
        }

    }
    scrollDiv() {
        const myElem = this.shadowRoot.getElementById("divChat")
        myElem.style.alignContent = "baseline"
        if (myElem.scrollHeight > myElem.offsetHeight) {
            myElem.style.alignContent = "stretch"
            const altoTotal = this.shadowRoot.getElementById("divChat").scrollHeight;
            this.shadowRoot.getElementById("divChat").scrollTop = altoTotal;
        } else {
            myElem.style.alignContent = "flex-end"
        }
        this.shadowRoot.getElementById("txtTexto").value = "";
    }
    clickDelete(e) {
        if (confirm('Delete')) {

        }
    }
    activar() {
        this.activo = true
        const texto = this.shadowRoot.getElementById("txtTexto");
        if (texto.value.length < 1) {
            this.activo = false
        }
        if (this.activo) {
            this.shadowRoot.querySelector("#btnAceptar").removeAttribute("apagado")
        } else {
            this.shadowRoot.querySelector("#btnAceptar").setAttribute("apagado", "")
        }
        //this.update()
    }
    valido() {
        [].forEach.call(this.shadowRoot.querySelectorAll("[error]"), element => {
            element.setAttribute("oculto", "")
        })
        let valido = true
        const texto = this.shadowRoot.getElementById("txtTexto");
        if (texto.value.length < 1) {
            valido = false
        }
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

window.customElements.define("chat-app", chatApp);