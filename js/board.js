"use strict";

setURL('https://gruppe-join-422.developerakademie.net/smallest_backend');

const progressStepCategories = ["todo", "inProgress", "awaitingFeedback", "done"];
let filteredTasks = [];
let currentTasksArray = tasks;
let currentDraggedElement;
let categoryOfDraggedElement;
const taskOverlayBg = document.querySelector("#taskOverlayBg");
const taskOverlayContentContainer = document.querySelector('#taskOverlayContent');
const taskOverlayEditContentContainer = document.querySelector('#taskOverlayEditContent');
const priorityUrgentButton = document.querySelector('#priority-urgent');
const priorityMediumButton = document.querySelector('#priority-medium');
const priorityLowButton = document.querySelector('#priority-low');

const dummyData = [
  {
    id: 0,
    label: "design",
    title: "task a",
    description: "Modify the contents of the main website...",
    dueDate: "2023-02-01",
    subtasks: [],
    assignedTo: [
      {
        name: "Sandra Müller",
        email: "sandra.mueller@gmx.de",
        phone: "+4994937394",
        color: "blue",
        initials: "SM",
      },
      {
        name: "Manuel Vogel",
        email: "manu.vogel@gmail.com",
        phone: "+49934798347",
        color: "pink",
        initials: "MV",
      },
    ],
    priority: "low",
    category: "todo",
  },
  {
    id: 1,
    label: "sales",
    title: "task b",
    description: "Make the product presentation to prospective buyers",
    dueDate: "2023-02-01",
    subtasks: [],
    assignedTo: [
      {
        name: "Anton Sommer",
        email: "anton.so@gmx.net",
        phone: "+4998747394",
        color: "dark-blue",
        initials: "AS",
      },
      {
        name: "Denise Eibold",
        email: "denise.e@gmail.com",
        phone: "+494556657",
        color: "red",
        initials: "DE",
      },
      {
        name: "Sandra Müller",
        email: "sandra.mueller@gmx.de",
        phone: "+4994937394",
        color: "blue",
        initials: "SM",
      },
      {
        name: "Manuel Vogel",
        email: "manu.vogel@gmail.com",
        phone: "+49934798347",
        color: "pink",
        initials: "MV",
      },
    ],
    priority: "medium",
    category: "todo",
  },
  {
    id: 2,
    label: "backoffice",
    title: "task c",
    description: "Modify the contents of the main website...",
    dueDate: "2023-02-01",
    subtasks: [
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: false },
    ],
    assignedTo: [
      {
        name: "Sandra Müller",
        email: "sandra.mueller@gmx.de",
        phone: "+4994937394",
        color: "blue",
        initials: "SM",
      },
      {
        name: "Manuel Vogel",
        email: "manu.vogel@gmail.com",
        phone: "+49934798347",
        color: "pink",
        initials: "MV",
      },
    ],
    priority: "low",
    category: "inProgress",
  },
  {
    id: 3,
    label: "media",
    title: "task d",
    description: "Make the product presentation to prospective buyers",
    dueDate: "2023-02-01",
    subtasks: [],
    assignedTo: [
      {
        name: "Anton Sommer",
        email: "anton.so@gmx.net",
        phone: "+4998747394",
        color: "dark-blue",
        initials: "AS",
      },
      {
        name: "Denise Eibold",
        email: "denise.e@gmail.com",
        phone: "+494556657",
        color: "red",
        initials: "DE",
      },
    ],
    priority: "urgent",
    category: "inProgress",
  },
  {
    id: 4,
    label: "marketing",
    title: "task e",
    description: "Modify the contents of the main website...",
    dueDate: "2023-02-01",
    subtasks: [
      { title: "subtask 1", done: false },
      { title: "subtask 2", done: false },
    ],
    assignedTo: [
      {
        name: "Sandra Müller",
        email: "sandra.mueller@gmx.de",
        phone: "+4994937394",
        color: "blue",
        initials: "SM",
      },
      {
        name: "Manuel Vogel",
        email: "manu.vogel@gmail.com",
        phone: "+49934798347",
        color: "pink",
        initials: "MV",
      },
    ],
    priority: "low",
    category: "awaitingFeedback",
  },
  {
    id: 5,
    label: "backoffice",
    title: "task f",
    description: "Make the product presentation to prospective buyers",
    dueDate: "2023-02-01",
    subtasks: [],
    assignedTo: [
      {
        name: "Anton Sommer",
        email: "anton.so@gmx.net",
        phone: "+4998747394",
        color: "dark-blue",
        initials: "AS",
      },
      {
        name: "Denise Eibold",
        email: "denise.e@gmail.com",
        phone: "+494556657",
        color: "red",
        initials: "DE",
      },
    ],
    priority: "urgent",
    category: "awaitingFeedback",
  },
  {
    id: 6,
    label: "marketing",
    title: "task g",
    description: "Modify the contents of the main website...",
    dueDate: "2023-02-01",
    subtasks: [
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: true },
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: true },
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: true },
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: true },
    ],
    assignedTo: [
      {
        name: "Sandra Müller",
        email: "sandra.mueller@gmx.de",
        phone: "+4994937394",
        color: "blue",
        initials: "SM",
      },
      {
        name: "Manuel Vogel",
        email: "manu.vogel@gmail.com",
        phone: "+49934798347",
        color: "pink",
        initials: "SM",
      },
      {
        name: "Anton Sommer",
        email: "anton.so@gmx.net",
        phone: "+4998747394",
        color: "dark-blue",
        initials: "AS",
      },
      {
        name: "Denise Eibold",
        email: "denise.e@gmail.com",
        phone: "+494556657",
        color: "red",
        initials: "DE",
      },
    ],
    priority: "low",
    category: "done",
  },
  {
    id: 7,
    label: "media",
    title: "task h",
    description: "Make the product presentation to prospective buyers",
    dueDate: "2023-02-01",
    subtasks: [],
    assignedTo: [
      {
        name: "Anton Sommer",
        email: "anton.so@gmx.net",
        phone: "+4998747394",
        color: "dark-blue",
        initials: "AS",
      },
      {
        name: "Denise Eibold",
        email: "denise.e@gmail.com",
        phone: "+494556657",
        color: "red",
        initials: "DE",
      },
    ],
    priority: "urgent",
    category: "done",
  },
];


async function render() {
  await loadTasksFromBackend();
  tasks.push(...dummyData);
  if (!currentTasksArray.length) currentTasksArray = tasks;
  for (let category of progressStepCategories) updateHtml(category, currentTasksArray);
}

// prettier-ignore
function updateHtml(category, tasksArrayToRender) {
  const progressStep = tasksArrayToRender.filter((task) => task.category === category);
  const progressStepHtmlContainer = document.querySelector(`#${category}-tasks`);
  progressStepHtmlContainer.innerHTML = "";
  for (let task of progressStep) {
    progressStepHtmlContainer.innerHTML += generateTaskCardtHtml(task);
  }
  progressStepHtmlContainer.innerHTML += generatePlaceholderHtml(category);
}

// prettier-ignore
function generateTaskCardtHtml(task) {
  return `
        <div class="task-card" draggable="true" ondragstart="startDragging(${task.id})" onclick="openTaskOverlay(${task.id})">
            <span class="label ${task.label}">${task.label}</span>
            <div class="title">${task.title}</div>
            <div class="description">
                ${task.description}
            </div>
            <div class="subtasks-progress ${checkIfSubtasksAreEmpty(task)}">
                <progress value="${getDoneSubtasksInPercent(task)}" max="100"><progress>
                <span>${getDoneSubtasks(task)}/${task.subtasks.length} Done</span>
            </div>
            <div class="assigned-to-and-priority-container">
                <div class="assigned-to">
                  ${getAssignedPersonsInitialsHtml(task)}
                </div>
                <div class="priority"><img src="../src/img/${task.priority}.svg" /></div>
            </div>
        </div>
  `;
}

function generatePlaceholderHtml(category) {
  return `
        <div class="task-card-placeholder ${category}-task-card-placeholder d-none"></div>
  `;
}

function checkIfSubtasksAreEmpty(task) {
  if (!task.subtasks.length) return "d-none";
}

function getDoneSubtasks(task) {
  const doneSubtasks = task.subtasks.filter((subtask) => subtask.done);
  return doneSubtasks.length;
}

function getDoneSubtasksInPercent(task) {
  const doneSubtasks = task.subtasks.filter((subtask) => subtask.done);
  const percent = doneSubtasks.length
    ? (100 / task.subtasks.length) * doneSubtasks.length
    : 0;
  return percent;
}

function getAssignedPersonsInitialsHtml(task) {
  let assignedPersonsHtml = "";
  for (let assignedPerson of task.assignedTo) {
    assignedPersonsHtml += `<div class="initials ${assignedPerson.color}">${assignedPerson.initials}</div>`;
  }
  return assignedPersonsHtml;
}

function getInitials(name) {
  const fullname = name.split(" ");
  const [forename, lastname] = [fullname[0], fullname[fullname.length - 1]];
  return forename[0] + lastname[0];
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  tasks[currentDraggedElement].category = category;
  render();
}

function getCategoryOfDraggedElement(category) {
  categoryOfDraggedElement = category;
}

function addPlaceholder() {
  const placeholder = document.querySelectorAll(".task-card-placeholder");

  for (let place of placeholder) {
    const category = place.classList[1].split("-")[0];
    if (!(categoryOfDraggedElement === category))
      place.classList.remove("d-none");
  }
}

function openTaskOverlay(taskId) {
  const taskIndex = getIndexOfArray(tasks, taskId)
  renderCategory(taskIndex);
  renderContentOnly(taskIndex, "title");
  renderContentOnly(taskIndex, "description");
  renderContentOnly(taskIndex, "dueDate");
  renderSubtasksContainer(taskIndex);
  renderPriority(taskIndex);
  renderAssignedToContainer(taskIndex);
  renderTaskOverlayButtons(taskIndex);
  taskOverlayContentContainer.classList.remove('d-none');
  taskOverlayEditContentContainer.classList.add('d-none');
  taskOverlayBg.classList.remove("d-none");
}

function closeTaskOverlay() {
  taskOverlayBg.classList.add("d-none");
  taskOverlayContentContainer.classList.remove('d-none');
  taskOverlayEditContentContainer.classList.add('d-none');
}

render();

function renderCategory(taskIndex) {
  const labelContainer = document.querySelector("#label");
  labelContainer.className = "";
  labelContainer.classList.add("label");
  labelContainer.classList.add(tasks[taskIndex].label);
  labelContainer.innerHTML = tasks[taskIndex].label;
}

function renderContentOnly(taskIndex, containerId) {
  const container = document.querySelector(`#${containerId}`);
  container.innerHTML = "";
  container.innerHTML = tasks[taskIndex][containerId];
}

function renderSubtasksContainer(taskIndex) {
  const subtaskContainer = document.querySelector("#subtasksContainer");
  const subtaskElementsContainer = document.querySelector("#subtasks");
  subtaskElementsContainer.innerHTML = "";
  if (tasks[taskIndex].subtasks.length) {
    subtaskElementsContainer.innerHTML = renderAllSubtasks(taskIndex);
    subtaskContainer.className = "subtasks";
  } else {
    subtaskContainer.className = "subtasks d-none";
  }
}

function renderAllSubtasks(taskIndex) {
  let subtasksHtml = "";
  const subtasksArray = [...tasks[taskIndex].subtasks];
  for (let i = 0; i < subtasksArray.length; i++) {
    subtasksHtml += generateSubtaskHtml(subtasksArray, i);
  }
  return subtasksHtml;
}

function generateSubtaskHtml(subtasksArray, subtaskId) {
  return `
      <div class="subtask" id="subtask-${subtaskId}">
        <input
          class="subtask-checkbox"
          type="checkbox"
          ${checkIfDone(subtasksArray, subtaskId)}
        />
        <span>${subtasksArray[subtaskId].title}</span>
      </div>
    `;
}

function checkIfDone(subtasksArray, subtaskId) {
  if (subtasksArray[subtaskId].done) return "checked";
}

function renderPriority(taskIndex) {
  const priorityContainer = document.querySelector("#priority");
  priorityContainer.className = "";
  priorityContainer.classList.add("label");
  priorityContainer.classList.add(tasks[taskIndex].priority);
  priorityContainer.innerHTML = `<span>${tasks[taskIndex].priority}</span>`;
  priorityContainer.innerHTML += `<img src="../src/img/${tasks[taskIndex].priority}-white.svg" />`;
}

function renderAssignedToContainer(taskIndex) {
  const assignedToContainer = document.querySelector("#assignedToContainer");
  const assignedPersonsContainer = document.querySelector(
    "#assignedPersonsContainer"
  );
  assignedPersonsContainer.innerHTML = "";
  if (tasks[taskIndex].assignedTo.length) {
    assignedPersonsContainer.innerHTML = renderAllAssignedPersons(taskIndex);
    assignedToContainer.className = "assigned-persons-container";
  } else {
    assignedToContainer.className = "assigned-persons-container d-none";
  }
}

function renderAllAssignedPersons(taskIndex) {
  let assignedPersonHtml = "";
  const assignedPersonArray = [...tasks[taskIndex].assignedTo];
  for (let i = 0; i < assignedPersonArray.length; i++) {
    assignedPersonHtml += generateAssignedPersonsHtml(assignedPersonArray, i);
  }
  return assignedPersonHtml;
}

function generateAssignedPersonsHtml(assignedPersonArray, assignedPersonId) {
  return `
      <div class="assigned-person">
        <span class="initials ${assignedPersonArray[assignedPersonId].color}">${assignedPersonArray[assignedPersonId].initials}</span>
        <span class="full-name">${assignedPersonArray[assignedPersonId].name}</span>
      </div>
    `;
}

function renderTaskOverlayButtons(taskIndex) {
  const taskOverlayButtonsContainer = document.querySelector("#taskOverlayButtons");
  taskOverlayButtonsContainer.innerHTML = generateTaskOverlayButtonsHtml(taskIndex);
}

function generateTaskOverlayButtonsHtml(taskIndex) {
  return `
      <div class="close-button" onclick="closeTaskOverlay()">
        <img src="../src/img/close-icon.svg" />
      </div>
      <button class="edit-icon btn-primary" onclick="renderEditTask(${taskIndex})">
        <img src="../src/img/edit-icon.svg" />
      </button>
  `;
}

function renderEditTask(taskId) {
  const taskIndex = getIndexOfArray(tasks, taskId)
  renderCurrentCategory(taskIndex);
  renderCategories();
  renderCurrentTitle(taskIndex);
  rendercurrentDescription(taskIndex);
  renderCurrentDueDate(taskIndex);
  renderCurrentPriority(taskIndex);
  renderCurrentAssignedPersons(taskIndex);
  renderEditTaskOverlayButtons(taskIndex);
  taskOverlayContentContainer.classList.add('d-none');
  taskOverlayEditContentContainer.classList.remove('d-none');
}

function renderCurrentCategory(taskIndex) {
  const currentCategoryContainer = document.querySelector('#currentCategory');
  currentCategoryContainer.innerHTML = tasks[taskIndex].label;
}

function renderCategories() {
  const categoriesContainer = document.querySelector('#categoriesContainer');
  for (let category of categories) {
    console.log(category);
  }
}

function showOrHideCategories() {
  const categoriesContainer = document.querySelector('#categoriesContainer');
  categoriesContainer.classList.toggle('d-none');
}

function renderCurrentTitle(taskIndex) {
  document.querySelector('#currentTitle').value = tasks[taskIndex].title;
}

function rendercurrentDescription(taskIndex) {
  document.querySelector('#currentDescription').value = tasks[taskIndex].description;
}

function renderCurrentDueDate(taskIndex) {
  document.querySelector('#currentDueDate').value = tasks[taskIndex].dueDate;
}

function renderCurrentPriority(taskIndex) {
  removeActiveClassFromPriorityButton();
  if (tasks[taskIndex].priority === "urgent") {
    priorityUrgentButton.classList.add('active');
    priorityUrgentButton.childNodes[3].src = "../src/img/urgent-white.svg";
  } else if (tasks[taskIndex].priority === "medium") {
    priorityMediumButton.classList.add('active');
    priorityMediumButton.childNodes[3].src = "../src/img/medium-white.svg";  
  } else if (tasks[taskIndex].priority === "low") {
    priorityLowButton.classList.add('active');
    priorityLowButton.childNodes[3].src = "../src/img/low-white.svg";
  }
}

function removeActiveClassFromPriorityButton() {
  const priorityButtons = document.querySelectorAll('.priority-button');
  for (let priorityButton of priorityButtons) {
    priorityButton.classList.remove('active');
  }
  priorityUrgentButton.childNodes[3].src = "../src/img/urgent.svg";
  priorityMediumButton.childNodes[3].src = "../src/img/medium.svg";
  priorityLowButton.childNodes[3].src = "../src/img/low.svg";
}

function renderCurrentAssignedPersons(taskIndex) {
  const assignedContacts = document.querySelector('#assignedContacts');
  assignedContacts.innerHTML = "";
  for (let assignedPerson of tasks[taskIndex].assignedTo) {
    assignedContacts.innerHTML += generateCurrentAssignedPersonsHtml(assignedPerson)
  }
}

function generateCurrentAssignedPersonsHtml(assignedPerson) {
  return `
      <div class="initials ${assignedPerson.color}">${assignedPerson.initials}</div>
  `;
}

function renderEditTaskOverlayButtons(taskIndex) {
  const taskOverlayButtonsContainer = document.querySelector("#taskOverlayButtons");
  taskOverlayButtonsContainer.innerHTML = generateEditTaskOverlayButtonsHtml(taskIndex);
}

function generateEditTaskOverlayButtonsHtml(taskIndex) {
  return `
      <div class="close-button" onclick="closeTaskOverlay()">
        <img src="../src/img/close-icon.svg" />
      </div>
      <button class="edit-icon save-button btn-primary" onclick="saveChanges(${taskIndex})">
        <span>OK</span>
        <img src="../src/img/hook.svg" />
      </button>
  `;
}

function saveChanges(taskIndex) {
  // TODO save changes
  openTaskOverlay(taskIndex);
}