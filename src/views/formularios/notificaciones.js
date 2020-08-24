import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    store
} from "../../redux/store";
import {
    connect
} from "@brunomon/helpers";
import {
    idiomas
} from "../../redux/datos/idiomas"
import {
    label
} from "../css/label"
import {
    button
} from "../css/button"
import {
    select
} from "../css/select"
import {
    ikeInput
} from "../css/ikeInput"
import {
    cabecera1
} from "../css/cabecera1"

import {
    modoPantalla
} from "../../redux/actions/ui";

import {
    MAS
} from "../../../assets/icons/icons"
import {
    get as getMascotas
} from "../../redux/actions/mascotas"
import {
    get as getMascotaTipo
} from "../../redux/actions/mascotastipo";
import {
    get as getRazas
} from "../../redux/actions/razas";


const MODO_PANTALLA = "ui.timeStampPantalla"
const MASCOTAS_TIPO = "mascotastipo.timeStamp"
const RAZAS = "razas.timeStamp"
const VACUNA = "vacuna.timeStamp"
const MASCOTAS = "mascotas.timeStamp"
export class pantallaNotificaciones extends connect(store, MODO_PANTALLA, MASCOTAS_TIPO, RAZAS, VACUNA, MASCOTAS)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.mascotasTipo = []
        this.razas = []
        this.vacuna = []
        this.status = html ``
    }

    firstUpdated(changedProperties) {

        let combos = this.shadowRoot.querySelectorAll("select");

        [...combos].forEach((combo) => {
            combo.addEventListener('change', this.hideStatus.bind(this));
        });

    }

    static get styles() {
        return css `
         ${label}
         ${button}
         ${select}
         ${ikeInput}
         ${cabecera1}

         :host{
             background-color:var(--color-gris-fondo);
             display:grid;
             grid-template-rows:auto 1fr
         } 
         :host([hidden]){
             display: none; 
         } 
         #cuerpo{
             position: relative;
             display: grid;
             grid-template-columns:1fr 1fr;
             background-color: transparent;  
             grid-gap:.5rem
         }
         #cuerpo::-webkit-scrollbar {
             display: none;
         }
         label,button {
             position: relative;
             color: var(--color-negro);
             background-color:transparent;
             border-radius:0;
             font-size: var(--font-bajada-size);
             font-weight: var(--font-bajada-weight);
         }    
         .panel{
             display:grid;
             grid-auto-flow:row;
             align-items:start;
             align-content:start;
             grid-gap:.7rem;
             padding:1rem;
             overflow-y:auto
         } 
         #botonera{

             display:grid;
             grid-auto-flow:column;
             grid-gap:1rem;
         }

         h4{
             margin:0;
         }

         select {
             height:2rem;
         }
         #status{
             display:grid;
             grid-auto-flow:column;
             grid-gap:1rem
         }
        .notif{
            display:grid;
            grid-auto-flow:row;
            place-items:center

        }
     `
    }
    render() {
        return html `
             <div id="header">
                 <div style="display:grid;grid-template-columns:2fr 3fr;">
                     <div id="bar">
                         <div id="lblTitulo">${idiomas[this.idioma].notificaciones.tituloCabecera}</div>
                     </div>
                     <div id="status">
                         ${this.status}
                     </div>
                 </div>    
                 <div id="lblLeyenda">${idiomas[this.idioma].notificaciones.leyendaCabecera}</div>
             </div>
             <div id="cuerpo">
               
                 <div id="panelFiltro"  class="panel">
                    <h4>Filtro</h4>
                    <div id="selectDest" class="select"> 
                         <label>Destinatarios</label>
                         <select @change="${this.cambioDestinatario}"  id="destinatario">          
                             <option value="C">Clientes</option>
                             <option value="V">Veterinarios</option>
                         </select>
                     </div>

                     <div id="selectTipo" class="select"> 
                         <label>Tipo Mascota</label>
                         <select @change="${this.updateComboRazas}" ?disabled=${this.disabled} id="tipo">          
                             ${this.mascotasTipo.map(item => html `<option value="${item.Id}">${item.Descripcion}</option>`)}
                         </select>
                     </div>
                   

                     <div id="selectRaza" class="select"> 
                         <label>Raza</label>
                         <select ?disabled=${this.disabled} id="raza">          
                             ${this.razas.map(item => html `<option value="${item.Id}">${item.Descripcion}</option>`)}
                         </select>
                     </div>

                     <div id="selectCumple" class="select"> 
                         <label>Cumpleaños</label>
                         <select ?disabled=${this.disabled} id="cumple">          
                             <option value="N">No Aplica</option>
                             <option value="S">Los cumpleñeros</option>
                         </select>
                     </div>

                     <div id="selectCastrados" class="select"> 
                         <label>Castrados</label>
                         <select ?disabled=${this.disabled} id="castrado">          
                             <option value="X">No Aplica</option>
                             <option value="S">Los castrados</option>
                             <option value="N">Los NO castrados</option>
                         </select>
                     </div>

                     <div id="selectCastrados" class="select"> 
                         <label>Vacunados</label>
                         <select ?disabled=${this.disabled} id="vacunado">          
                             <option value="X">No Aplica</option>
                             <option value="S">Tiene la siguiente vacuna</option>
                             <option value="N">Les falta la siguiente vacuna</option>
                         </select>
                     </div>

                     <div id="selectVacunas" class="select"> 
                         <label>Vacunas</label>
                         <select ?disabled=${this.disabled} id="vacuna">          
                             ${this.vacuna.map(item => html `<option value="${item.Id}">${item.Descripcion}</option>`)}
                         </select>
                     </div>
                 </div>

                 <div id="panelNotif" class="panel">
                    <h4>Notificación</h4>
                    <div id="divTituloForm" class="ikeInput">
                         <label id="lblTit">Titulo</label>
                         <input id="txtTit">
                         <label id="lblErrorTit" error oculto>Titulo Incorrecto</label>
                     </div>

                     <div id="divTextoForm" class="ikeInput">
                         <label id="lblTexto">Texto</label>
                         <textarea name="txtTexto" cols="40" rows="5"></textarea>
                         <label id="lblErrorTexto" error oculto>Texto Incorrecto</label>
                     </div>

                     <div id="divLinkForm" class="ikeInput">
                         <label id="lblLink">Link</label>
                         <input id="txtLinko">
                         <label id="lblErrorLink" error oculto>Link Incorrecto</label>
                     </div>

                     <div id="botonera">
                         <button btn3 @click="${this.aplicar}">Aplicar filtros</button>
                         
                     </div>

                 </div>
             </div>        
         `
    }


    aplicar() {
        this.entity = ""
        this.filtro = ""
        this.expand = ""
        let destinatario = this.shadowRoot.querySelector("#destinatario").value
        let tipo = this.shadowRoot.querySelector("#tipo").value
        let raza = this.shadowRoot.querySelector("#raza").value
        let cumple = this.shadowRoot.querySelector("#cumple").value
        let castrado = this.shadowRoot.querySelector("#castrado").value
        let vacunado = this.shadowRoot.querySelector("#vacunado").value
        let vacuna = this.shadowRoot.querySelector("#vacuna").value


        if (destinatario == "V") {
            this.entity = "Usuarios"
            this.filtro = "perfil eq 'veterinario'"

            console.log("Entity:" + this.entity)
            console.log("Expand:" + this.expand)
            console.log("Filter:" + this.filtro)

            return
        }

        this.expand = "Raza($select=idMascotasTipo),MascotasVacuna($select=Id,VacunaId,Realizada,Activo)"
        this.select = "Id,idUsuario,idRaza,FechaNacimiento,Castrada,Activo"


        if (tipo != -1) {
            this.filtro = "Raza/idMascotasTipo eq " + tipo;
        }

        if (raza != -1) {
            this.filtro = this.filtro + " and idRaza eq " + raza;
        }

        if (cumple == "S") {
            if (this.filtro) this.filtro = this.filtro + " and "
            this.filtro = this.filtro + "day(FechaNacimiento) eq " + (new Date()).getDate() + " and month(FechaNacimiento) eq " + ((new Date()).getMonth() + 1)
        }

        if (castrado != "X") {
            if (this.filtro) this.filtro = this.filtro + " and "
            if (castrado == "S") {
                this.filtro = this.filtro + "Castrada"
            } else {
                this.filtro = this.filtro + "not Castrada"
            }
        }





        store.dispatch(getMascotas({
            expand: this.expand,
            filter: this.filtro,
            select: this.select,
            token: store.getState().cliente.datos.token
        }, vacunado, vacuna))


        return


    }


    cambioDestinatario(e) {
        this.disabled = e.currentTarget.value == "V"
        this.update();
    }

    stateChanged(state, name) {


        if (name == MASCOTAS_TIPO) {
            this.mascotasTipo = state.mascotastipo.entities
            this.mascotasTipo.push({
                Id: -1,
                Descripcion: "Todas las Mascotas"
            })
            if (this.razas[0]) this.filtrarRazas(this.mascotasTipo[0].Id)
            this.update();
        }

        if (name == RAZAS) {
            if (this.mascotasTipo[0]) {
                this.filtrarRazas(this.mascotasTipo[0].Id)
            } else {
                this.razas = state.razas.entities
            }
            this.update()
        }

        if (name == VACUNA) {
            this.vacuna = state.vacuna.entities
            this.vacuna.push({
                Id: -1,
                Descripcion: "Todas las vacunas"
            })
            this.update()
        }

        if (name == MASCOTAS) {

            this.status = html `
                          <div class="notif">Notificaciones por usuario <h4>${state.mascotas.porUsuario.length}</h4><button btn1 @click="${this.generar}">Notificar</button></div> 
                          <div class="notif">Notificaciones por mascota <h4>${state.mascotas.entities.length}</h4><button btn1 @click="${this.generar}">Notificar</button></div>`

            this.update()
        }
    }


    filtrarRazas(id) {
        this.razas = store.getState().razas.entities.filter(r => r.idMascotasTipo == id)
        this.razas.push({
            Id: -1,
            Descripcion: "Todas las Razas"
        })

    }
    updateComboRazas(e) {
        this.filtrarRazas(e.currentTarget.value);
        this.update()
    }

    hideStatus() {
        this.status = html ``
        this.update()
    }



    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true
            },
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            disabled: {
                type: Boolean,
                reflect: true
            }
        }
    }
}

window.customElements.define("pantalla-notificaciones", pantallaNotificaciones);