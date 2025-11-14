const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

const controls = {
    nombre: document.getElementById("idNombre"),
    apellidos: document.getElementById("idApellidos"),
    fecha: document.getElementById("idFechaNac"),
    correo: document.getElementById("idCorreo"),
    password: document.getElementById("idPassword"),
    repetirPassword: document.getElementById("idPasswordRepetir"),
    pais: document.getElementById("idCmPais"),
};

const checkboxesIntereses = Array.from(
    formulario.querySelectorAll('input[type="checkbox"]')
);
const radiosCarrera = Array.from(
    formulario.querySelectorAll('input[name="idRdCarrera"]')
);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeValue = (value) => value.trim();

const getLabelText = (element) => {
    if (!element.id) {
        return element.name || element.tagName.toLowerCase();
    }
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) {
        return label.textContent.trim();
    }
    return element.id;
};

const clearModalBody = () => {
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }
};

const buildSummaryTable = (rows) => {
    const table = document.createElement("table");
    table.setAttribute("class", "table table-striped mb-0");

    const tbody = document.createElement("tbody");

    rows.forEach((row) => {
        const tr = document.createElement("tr");

        const th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.textContent = row.label;

        const td = document.createElement("td");
        td.textContent = row.value;

        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
};

const showSummary = (data) => {
    clearModalBody();
    const rows = [
        { label: "Nombres", value: data.nombre },
        { label: "Apellidos", value: data.apellidos },
        { label: "Fecha de nacimiento", value: data.fecha },
        { label: "Correo electrónico", value: data.correo },
        { label: "Intereses", value: data.intereses },
        { label: "Carrera", value: data.carrera },
        { label: "País de origen", value: data.pais },
    ];

    const table = buildSummaryTable(rows);
    bodyModal.appendChild(table);
    modal.show();
};

const validateForm = () => {
    const errors = [];

    const nombre = sanitizeValue(controls.nombre.value);
    const apellidos = sanitizeValue(controls.apellidos.value);
    const fechaNac = controls.fecha.value;
    const correo = sanitizeValue(controls.correo.value);
    const password = controls.password.value;
    const passwordRepetir = controls.repetirPassword.value;
    const paisIndex = controls.pais.selectedIndex;
    const pais = controls.pais.value;

    if (!nombre) {
        errors.push("El campo Nombres es obligatorio.");
    }

    if (!apellidos) {
        errors.push("El campo Apellidos es obligatorio.");
    }

    if (!fechaNac) {
        errors.push("Debe ingresar su fecha de nacimiento.");
    } else {
        const fechaSeleccionada = new Date(fechaNac);
        const hoy = new Date();
        fechaSeleccionada.setHours(0, 0, 0, 0);
        hoy.setHours(0, 0, 0, 0);

        if (fechaSeleccionada > hoy) {
            errors.push("La fecha de nacimiento no puede ser posterior a la fecha actual.");
        }
    }

    if (!correo) {
        errors.push("El correo electrónico es obligatorio.");
    } else if (!EMAIL_REGEX.test(correo)) {
        errors.push("Ingrese un correo electrónico válido.");
    }

    if (!password || !passwordRepetir) {
        errors.push("Debe completar ambos campos de contraseña.");
    } else if (password !== passwordRepetir) {
        errors.push("Las contraseñas deben ser iguales.");
    }

    const interesesSeleccionados = checkboxesIntereses.filter(
        (checkbox) => checkbox.checked
    );
    if (!interesesSeleccionados.length) {
        errors.push("Seleccione al menos un interés.");
    }

    const carreraSeleccionada = radiosCarrera.find((radio) => radio.checked);
    if (!carreraSeleccionada) {
        errors.push("Seleccione la carrera que estudia.");
    }

    if (paisIndex <= 0 || !pais || sanitizeValue(pais) === "") {
        errors.push("Debe seleccionar un país de origen.");
    }

    return {
        isValid: errors.length === 0,
        errors,
        data: {
            nombre,
            apellidos,
            fecha: fechaNac,
            correo,
            intereses: interesesSeleccionados
                .map((checkbox) => getLabelText(checkbox))
                .join(", "),
            carrera: carreraSeleccionada ? getLabelText(carreraSeleccionada) : "",
            pais: paisIndex > 0 ? controls.pais.options[paisIndex].textContent : "",
        },
    };
};

const handleSubmit = () => {
    const result = validateForm();

    if (!result.isValid) {
        alert(result.errors.join("\n"));
        return;
    }

    showSummary(result.data);
};

button.addEventListener("click", handleSubmit);
