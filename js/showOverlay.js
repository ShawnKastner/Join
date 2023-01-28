let contactsDetailsDisplayed = false;

function openAddTask(status) {
    renderAddTask(status);
    let addTaskOverlay = document.getElementById("addTaskOverlay");
    let taskModul = document.getElementById('addTaskModul');
    taskModul.classList.add("slideIn");
    addTaskOverlay.classList.remove("d-none");
}

function closeAddTask() {
    let taskModul = document.getElementById('addTaskModul');
    taskModul.classList.remove("slideIn");
    taskModul.classList.add("slideOut");
    setTimeout(addDisplayNoneTask, 550);
}

function openAddContact() {
    let addContactOverlay = document.getElementById("addContactOverlay");
    let addContactModul = document.getElementById('addContactModul');
    addContactModul.classList.add("slideIn");
    addContactOverlay.classList.remove('d-none');
}

function openEditContact(contactId) {
    let editContactOverlay = document.getElementById("editContactOverlay");
    let editContactModul = document.getElementById('editContactModul');
    editContactModul.classList.add("slideIn");
    editContactOverlay.classList.remove('d-none');

    fillEditContactField(contactId);
}

async function fillEditContactField(contactId) {
    await loadContactsFromBackend();
    let index = getIndexOfArray(contacts, contactId);
    document.getElementById('c-new-name').value = contacts[index].name;
    document.getElementById('edit-c-initials').innerHTML = contacts[index].initials;
    document.getElementById('edit-c-initials').classList.add(`color-${contacts[index].color}`);
    document.getElementById('editContactOverlay').setAttribute("onclick", `closeEditContact(${contactId})`);
    document.getElementById('c-edit-close').setAttribute("onclick", `closeEditContact(${contactId})`);

    if (contacts[index].email) {
        document.getElementById('c-new-email').value = contacts[index].email;
    } else {
        document.getElementById('c-new-email').value = "";
    }

    if (contacts[index].phone) {
        document.getElementById('c-new-tel').value = contacts[index].phone;
    } else {
        document.getElementById('c-new-tel').value = "";

    }
}

async function fillEditTasksField(taskId) {
    await loadTasksFromBackend();
    let index = getIndexOfArray(tasks, taskId);
    document.getElementById('task-input-title').value = tasks[index].titel;

    if (tasks[index].description) {
        document.getElementById('task-input-description').value = tasks[index].description;
    } else {
        document.getElementById('task-input-description').value = "";
    }

    if (tasks[index].category) {
        document.getElementById('task-input-category').value = tasks[index].category;
    } else {
        document.getElementById('task-input-category').value = "";
    }

    if (tasks[index].category) {
        document.getElementById('task-input-category').value = tasks[index].category;
    } else {
        document.getElementById('task-input-category').value = "";
    }

    
}

function closeAddContact() {
    let contactModul = document.getElementById('addContactModul');
    contactModul.classList.remove("slideIn");
    contactModul.classList.add("slideOut");
    setTimeout(addDisplayNoneContact, 550);
}

function closeEditContact(contactId) {
    let index = getIndexOfArray(contacts, contactId);
    document.getElementById('edit-c-initials').classList.remove(`color-${contacts[index].color}`);

    let contactModul = document.getElementById('editContactModul');
    contactModul.classList.remove("slideIn");
    contactModul.classList.add("slideOut");

    setTimeout(editDisplayNoneContact, 550);
}

function contactDetailsSlideIn() {
    if (contactsDetailsDisplayed == false) {
        let contactDetails = document.getElementById("contactDetails");
        contactDetails.classList.add("slideIn");
        contactDetails.classList.remove("d-none");
    }
    
    contactsDetailsDisplayed = true;
}

function dontClose(e) {
    e.stopPropagation();
}

function addDisplayNoneTask() {
    addTaskOverlay.classList.add("d-none")
}

function addDisplayNoneContact() {
    addContactOverlay.classList.add("d-none")
}

function editDisplayNoneContact() {
    editContactOverlay.classList.add("d-none")
}