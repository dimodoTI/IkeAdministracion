export const idiomas = {
    ES: {
        SiNo: { si: "Si", no: "No" },
        diasCortos: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        mesCortos: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        perfiles: {
            cliente: "cliente mascotas", veterinario: "veterinario mascotas",
            publicacion: "publicaciones mascotas", agenda: "agendas mascotas", admin: "Admin"
        },
        iniciosession: {
            titulo: "Iké Mascotas Administración", leyenda: "Iniciá sesión",
            mail: "Ingresá tu mail", mail_ph: "jose@gmail.com", clave: "Ingresá tu contraseña", datos: "Recordar mis datos", btn1: "Iniciar sesión",
            btn2: "Olvidé mi contraseña", btn3: "Ingresar sin registrarme", errorMail: { err1: "Mail incorrecto", err2: "wer" },
            errorClave: { err1: "Tu contraseña debe tener 4 caraceres", err2: "wer" }
        },
        recuperaclave: {
            titulo: "Recuperá tu contraseña", leyenda: "Completá tus datos para recuperar tu contraseña",
            mail: "Ingresá tu mail", mail_ph: "jose@gmail.com", documento: "Ingresá el DNI del titular", documento_ph: "99999999", btn1: "Recuperar contraseña",
            errorMail: { err1: "Mail incorrecto", err2: "wer" },
            errorDocumento: { err1: "Documento incorrecto", err2: "wer" }
        },
        recuperaclavemsg: { titulo: "¡Todo listo para recuperar tu contraseña!", leyenda: "Ingresá a tu casilla de mail y seguí los pasos para recuperar tu contraseña." },
        crearclave: {
            titulo: "Creá tu contraseña", leyenda: "Creá tu nueva contraseña para volver a acceder a tu cuenta.",
            clave1: "Ingresá tu nueva contraseña", clave2: "Repetí tu nueva contraseña", btn1: "Crear nueva contraseña",
            errorClave1: { err1: "Clave1 incorrecto", err2: "wer" },
            errorClave2: { err1: "Clave2 incorrecto", err2: "wer" }
        },
        crearclavemsg: { titulo: "¡Genial!", leyenda: "Tu contraseña fue creada con éxito.", btn1: "Ingresar a mi cuenta" },
        pie: { inicio: "Usuarios", mascota: "Publicacion", consulta: "Tablas", vacuna: "Vacunas", foto: "Fotos" },
        principal: {
            tituloCabecera: "Hola, Lucía", leyendaCabecera: "Administración mascotas",
            lblAyuda01: "¿Necesitás ayuda?.", btnAyuda: "Solicitar asistencia"
        },
        usuarioabm: {
            tituloCabecera: "Hola, Lucía", leyendaCabecera: "Administración mascotas",
            titulo: "Administrar usuarios", lblFiltro: "Filtro por:", phFiltro: "Ingrese datos as buscar",
            btnFiltro: "Filtrar", filtroOpcionMail: "Mail", filtroOpcionDocumento: "Documento", filtroOpcionNombre: "Nombre",
            datoActivo: "Activo: ", datoDocumento: "DNI: ",
            lblAyuda01: "¿Necesitás ayuda?.", btnAyuda: "Solicitar asistencia",
            lblMail: "Tu mail", lblMail_ph: "Jose@gmail.com", lblNombre: "Tu nombre", lblNombre_ph: "Juan Jose",
            lblApellido: "Tu apellido", lblApellido_ph: "Perez", lblDocumento: "Ingresá el DNI del titular", lblDocumento_ph: "99999999",
            lblTelefono: "Telefono: ", lblTelefono_ph: "(+54) 1142231234",
            lblClase: "Tipo de usuario: ", lblActivo: "Esta activo?", btnGrabar: "Aceptar",
            lblTituloAltaNew: "Nuevo Usuario", lblTituloAltaChange: "Modificar Usuario",
            errorToken: "Error, Vuelve a loguearte", errorOperacion: "Operacion no realizada"
        },
        publicacionesabm: {
            tituloCabecera: "Hola, Lucía", leyendaCabecera: "Administración mascotas",
            titulo: "Administrar publicaciones", lblTitulo: "Titulo:  ", lblLeyenda: "Cuerpo:  ",
            lblColor: "Color de Fondo:  ", lblColor_ph: "#999999", lblImagen: "Imagen:  ", lblImagen_ph: "http://www.ikeasistencia.com.ar/imagen/publicacion.gif",
            lblBoton: "Boton caption:  ", lblHttp: "Http: ", lblHttp_ph: "http://www.ikeasistencia.com.ar/pagina/publicacion.html", lblOrden: "Orden:  ",
            btnGrabar: "Aceptar", lblTituloAltaNew: "Nueva Publicacion", lblTituloAltaChange: "Modificar Publicacion"
        },
        razaabm: {
            tituloCabecera: "Hola, Lucía", leyendaCabecera: "Administración razas",
            titulo: "Administrar razas", datoRaza: "Raza: ", datoActivo: "Activo: ",
            lblNombre: "Raza", lblNombre_ph: "Salchicha", lblActivo: "Esta activo?",
            btnGrabar: "Aceptar", lblTituloAltaNew: "Nuevo Raza", lblTituloAltaChange: "Modificar Raza",
            errorToken: "Error, Vuelve a loguearte", errorOperacion: "Operacion no realizada"
        }
    }
}

