// Obtener todos los elementos
const inputField = document.querySelector(".input-field textarea"),
    todoLists    = document.querySelector(".todoLists"),
    pendingNum   = document.querySelector(".pending-num"),
    clearButton  = document.querySelector(".clear-button");


// Obtener todas las tareas pendientes
function allTasks() {
    let tasks              = document.querySelectorAll(".pending");
    pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length; 

    let allLists           = document.querySelectorAll(".list");

    // Si hay tareas, se ajusta el margen de la parte de arriba del div y el botón de Clear all se activa
    if (allLists.length > 0) {
        todoLists.style.marginTop       = "20px";
        clearButton.style.pointerEvents = "auto";
        return
    }

    // Si no hay tareas, se quita el margen de la parte de arriba del div y el botón de Clear all se desactiva
    todoLists.style.marginTop         = "0px";
    clearButton.style.pointerEvents   = "none";
}

// Añadir tarea al presionar Enter y actualizar contador
inputField.addEventListener("keyup", (e) => {
    let inputValue = inputField.value.trim();
    // Con trim() se quita el espacio en blanco de antes de la palabra
    
    // Valida que se presione Enter y el input no está vacío
    if (e.key === "Enter" && inputValue.length > 0) {
        let liTag = `<li class="list pending" onclick="handleStatus(this)">
                    <input type="checkbox">
                    <span class="task">${inputValue}</span>
                    <i class="uil uil-trash" onclick="deleteTask(this)"></i>
                </li>`;
        
        // Se interta la tarea al final y se limpia el input
        todoLists.insertAdjacentHTML("beforeend", liTag);
        inputField.value = "";
        allTasks();
    }
});

// Check y unchecking del checkbox cuando se da clic en la tarea, se vuelven a contar las tareas pendientes
function handleStatus(e) {
    const checkbox   = e.querySelector("input");
    checkbox.checked = checkbox.checked ? false : true;
    e.classList.toggle("pending");
    allTasks();
}

// Se elimina la tarea seleccionada
function deleteTask(e) {
    e.parentElement.remove();
    allTasks();
}

// Se eliminan todas las tareas
clearButton.addEventListener("click", () => {
    todoLists.innerHTML = "";
    allTasks();
});