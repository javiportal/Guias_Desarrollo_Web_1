// Accediendo a los elementos del expediente médico
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");
const tablaPacientes = document.getElementById("idTablaPacientes");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

// Componente modal
const idModal = document.getElementById("idModal");

// Referencias del formulario con expresiones regulares
const formEstudiante = document.getElementById("idFormEstudiante");
const resultadoEstudiante = document.getElementById("idResultadoEstudiante");
const inputCarnet = document.getElementById("idCarnet");
const inputNombreCompleto = document.getElementById("idNombreCompleto");
const inputDui = document.getElementById("idDui");
const inputNit = document.getElementById("idNit");
const inputFechaEstudiante = document.getElementById("idFechaEstudiante");
const inputCorreo = document.getElementById("idCorreo");
const inputEdad = document.getElementById("idEdad");

// Arreglo global de pacientes y estado de edición
let arrayPaciente = [];
let indiceEdicion = null;

const TEXTO_BOTON_GUARDAR = `<i class="bi bi-person-plus-fill"></i> Guardar Datos`;
const TEXTO_BOTON_ACTUALIZAR = `<i class="bi bi-arrow-repeat"></i> Actualizar paciente`;

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    indiceEdicion = null;
    buttonAgregarPaciente.innerHTML = TEXTO_BOTON_GUARDAR;
    inputNombre.focus();
};

const addPaciente = function () {
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const fechaNacimiento = inputFechaNacimiento.value;
    const sexo =
        inputRdMasculino.checked === true
            ? "Hombre"
            : inputRdFemenino.checked === true
            ? "Mujer"
            : "";
    const pais = cmbPais.value;
    const labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    const direccion = inputDireccion.value.trim();

    if (
        nombre !== "" &&
        apellido !== "" &&
        fechaNacimiento !== "" &&
        sexo !== "" &&
        pais !== "0" &&
        direccion !== ""
    ) {
        const paciente = {
            nombre,
            apellido,
            fechaNacimiento,
            sexo,
            pais,
            paisNombre: labelPais,
            direccion,
        };

        if (indiceEdicion !== null) {
            arrayPaciente[indiceEdicion] = paciente;
            mensaje.innerHTML = "Paciente actualizado correctamente";
        } else {
            arrayPaciente.push(paciente);
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        }

        toast.show();
        imprimirPacientes();
        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

const imprimirFilas = () => {
    let filas = "";
    let contador = 1;

    arrayPaciente.forEach((element, index) => {
        filas += `<tr>
            <td scope="row" class="text-center fw-bold">${contador}</td>
            <td>${element.nombre}</td>
            <td>${element.apellido}</td>
            <td>${element.fechaNacimiento}</td>
            <td>${element.sexo}</td>
            <td>${element.paisNombre}</td>
            <td>${element.direccion}</td>
            <td class="text-center">
                <button type="button" class="btn btn-primary btn-editar" data-index="${index}" alt="Editar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-danger btn-eliminar" data-index="${index}" alt="Eliminar">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
        contador++;
    });
    return filas;
};

const imprimirPacientes = () => {
    if (arrayPaciente.length === 0) {
        tablaPacientes.innerHTML = "Ninguno";
        return;
    }

    const tabla = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width:5%">#</th>
                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                <th scope="col" class="text-center" style="width:10%">País</th>
                <th scope="col" class="text-center" style="width:25%">Dirección</th>
                <th scope="col" class="text-center" style="width:10%">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;

    tablaPacientes.innerHTML = tabla;
};

let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    const paisNew = inputNombrePais.value.trim();

    if (paisNew !== "") {
        const option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;
        contadorGlobalOption++;

        cmbPais.appendChild(option);

        mensaje.innerHTML = "País agregado correctamente";
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

tablaPacientes.addEventListener("click", (event) => {
    const boton = event.target.closest("button");
    if (!boton || !boton.dataset.index) return;

    const index = parseInt(boton.dataset.index, 10);
    if (Number.isNaN(index)) return;

    if (boton.classList.contains("btn-editar")) {
        cargarPacienteParaEdicion(index);
    } else if (boton.classList.contains("btn-eliminar")) {
        eliminarPaciente(index);
    }
});

const cargarPacienteParaEdicion = (index) => {
    const paciente = arrayPaciente[index];
    if (!paciente) return;

    inputNombre.value = paciente.nombre;
    inputApellido.value = paciente.apellido;
    inputFechaNacimiento.value = paciente.fechaNacimiento;
    inputDireccion.value = paciente.direccion;
    cmbPais.value = paciente.pais;
    inputRdMasculino.checked = paciente.sexo === "Hombre";
    inputRdFemenino.checked = paciente.sexo === "Mujer";

    indiceEdicion = index;
    buttonAgregarPaciente.innerHTML = TEXTO_BOTON_ACTUALIZAR;
    mensaje.innerHTML = "Edite los datos y presione Actualizar paciente";
    toast.show();
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const eliminarPaciente = (index) => {
    const paciente = arrayPaciente[index];
    if (!paciente) return;

    const confirmar = confirm(`¿Desea eliminar a ${paciente.nombre} ${paciente.apellido}?`);
    if (!confirmar) return;

    arrayPaciente.splice(index, 1);
    mensaje.innerHTML = "Paciente eliminado";
    toast.show();

    if (indiceEdicion === index) {
        limpiarForm();
    }
    imprimirPacientes();
};

idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// ---------- Expresiones regulares ----------
const marcarCampo = (input, esValido) => {
    if (!input) return;
    input.classList.remove("is-valid", "is-invalid");
    input.classList.add(esValido ? "is-valid" : "is-invalid");
};

const regexValidadores = {
    carnet: /^[A-Za-z]{2}\d{3}$/,
    nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
    dui: /^\d{8}-\d$/,
    nit: /^\d{4}-\d{6}-\d{3}-\d$/,
    fecha: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    edad: /^\d+$/,
};

const validarEstudiante = (event) => {
    event.preventDefault();
    if (!formEstudiante) return;

    const errores = [];
    const campos = [
        { input: inputCarnet, regex: regexValidadores.carnet, mensaje: "Carnet con formato AB123" },
        { input: inputNombreCompleto, regex: regexValidadores.nombre, mensaje: "Nombre solo admite letras y espacios" },
        { input: inputDui, regex: regexValidadores.dui, mensaje: "DUI con formato ########-#" },
        { input: inputNit, regex: regexValidadores.nit, mensaje: "NIT con formato ####-######-###-#" },
        { input: inputFechaEstudiante, regex: regexValidadores.fecha, mensaje: "Fecha con formato dd/mm/aaaa" },
        { input: inputCorreo, regex: regexValidadores.correo, mensaje: "Correo electrónico válido" },
        { input: inputEdad, regex: regexValidadores.edad, mensaje: "Edad solo admite números" },
    ];

    campos.forEach(({ input, regex, mensaje }) => {
        const valor = input ? input.value.trim() : "";
        const esValido = regex.test(valor);
        marcarCampo(input, esValido);
        if (!esValido) {
            errores.push(mensaje);
        }
    });

    if (errores.length === 0) {
        resultadoEstudiante.innerHTML = `<div class="alert alert-success">
            <i class="bi bi-check-circle-fill"></i> Todos los datos ingresados son válidos.
        </div>`;
    } else {
        const listaErrores = errores.map((error) => `<li>${error}</li>`).join("");
        resultadoEstudiante.innerHTML = `<div class="alert alert-danger">
            <p class="mb-1"><i class="bi bi-exclamation-triangle-fill"></i> Revise los siguientes campos:</p>
            <ul class="mb-0">${listaErrores}</ul>
        </div>`;
    }
};

if (formEstudiante) {
    formEstudiante.addEventListener("submit", validarEstudiante);
}

// Ejecutar función al momento de cargar la pagina HTML
limpiarForm();
