// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidarControles = document.getElementById("idBtnValidarControles");

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const sanitizeValue = (value) => value.trim();
const buildControlId = (nombreControl) => `id${nombreControl}`;
const controlExists = (controlId) => document.getElementById(controlId) !== null;

const createControlIdLabel = (nombreControl) => {
    const labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreControl}`;
    return labelId;
};

const getLinkedLabelText = (control) => {
    if (!control.id) {
        return control.name || control.tagName.toLowerCase();
    }
    const label = document.querySelector(`label[for="${control.id}"]`);
    if (label && label.textContent.trim() !== "") {
        return label.textContent.trim();
    }
    return control.id;
};

const isControlValid = (control) => {
    if (control.tagName === "INPUT") {
        if (control.type === "radio" || control.type === "checkbox") {
            return control.checked;
        }
        return sanitizeValue(control.value) !== "";
    }
    if (control.tagName === "SELECT") {
        return sanitizeValue(control.value) !== "";
    }
    if (control.tagName === "TEXTAREA") {
        return sanitizeValue(control.value) !== "";
    }
    return true;
};

// AGREGANDO FUNCIONES
const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;

    // validando que se haya seleccionado un elemento
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

const newSelect = function ({ titulo, nombre }) {
    // Creando elementos
    let addElemento = document.createElement("select");

    // creando atributos para el nuevo elemento
    addElemento.setAttribute("id", buildControlId(nombre));
    addElemento.setAttribute("class", "form-select");
    addElemento.setAttribute("name", nombre);

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Seleccione una opción";
    addElemento.appendChild(defaultOption);

    // creando option para el select
    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.textContent = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }

    // creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", buildControlId(nombre));
    labelElemento.textContent = titulo;

    let labelId = createControlIdLabel(nombre);

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    // Creando el input que será hijo del div
    divElemento.appendChild(addElemento);

    // Creando el label que será hijo del div
    divElemento.appendChild(labelElemento);

    // SPAN al formulario
    newForm.appendChild(labelId);

    // Div al formulario
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento, { titulo, nombre }) {
    // Creando elementos
    let addElemento = document.createElement("input");

    // creando atributos
    addElemento.setAttribute("id", buildControlId(nombre));
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");
    addElemento.setAttribute("name", nombre);
    addElemento.value = titulo;

    // creando label
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", buildControlId(nombre));
    labelElemento.textContent = titulo;

    let labelId = createControlIdLabel(nombre);

    // Creando plantilla de bootstrap
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    // Insertando elementos
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newInput = function (newElemento, { titulo, nombre }) {
    // Creando elementos de tipo = text, number, date, password o textarea
    let addElemento =
        newElemento == "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");

    // creando atributos
    addElemento.setAttribute("id", buildControlId(nombre));
    if (newElemento !== "textarea") {
        addElemento.setAttribute("type", newElemento);
    }
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", titulo);
    addElemento.setAttribute("name", nombre);

    // creando label
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", buildControlId(nombre));

    // icono del label
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    // texto del label
    labelElemento.textContent = titulo;
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = createControlIdLabel(nombre);

    // creando plantilla bootstrap
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    // Insertando elementos
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const validateDynamicControls = () => {
    const controls = newForm.querySelectorAll("input, select, textarea");

    if (!controls.length) {
        alert("Debe crear al menos un control antes de validar el formulario.");
        return;
    }

    const invalidControls = [];

    controls.forEach((control) => {
        if (!isControlValid(control)) {
            invalidControls.push(getLinkedLabelText(control));
        }
    });

    if (invalidControls.length) {
        alert(
            `Los siguientes controles requieren información o selección: ${invalidControls.join(
                ", "
            )}`
        );
    } else {
        alert("Todos los controles agregados tienen información válida.");
    }
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
    const titulo = sanitizeValue(tituloElemento.value);
    const nombre = sanitizeValue(nombreElemento.value);

    if (nombre === "" || titulo === "") {
        alert("Faltan campos por completar");
        return;
    }

    const controlId = buildControlId(nombre);

    if (controlExists(controlId)) {
        alert("El ID del control ya existe. Por favor ingrese un nombre diferente.");
        return;
    }

    let elemento = cmbElemento.value;

    if (elemento == "select") {
        newSelect({ titulo, nombre });
    } else if (elemento == "radio" || elemento == "checkbox") {
        newRadioCheckbox(elemento, { titulo, nombre });
    } else {
        newInput(elemento, { titulo, nombre });
    }

    modal.hide();
};

buttonValidarControles.onclick = () => {
    validateDynamicControls();
};

// Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    // Limpiando campos para los nuevos elementos
    tituloElemento.value = "";
    nombreElemento.value = "";

    // inicializando pointer en el título
    tituloElemento.focus();
});
