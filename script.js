// Info date
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");

// Tasks Container
const tasksContainer = document.getElementById("tasksContainer");

const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString("es", { day: "numeric" });
  dateText.textContent = date.toLocaleString("es", { weekday: "long" });
  dateMonth.textContent = date.toLocaleString("es", { month: "short" });
  dateYear.textContent = date.toLocaleString("es", { year: "numeric" });
};

const addNewTask = (event) => {
  event.preventDefault();
  const { value } = event.target.taskText;
  if (!value) return;

  const task = document.createElement("div");
  task.classList.add("task", "roundBorder");
  task.addEventListener("click", changeTaskState);

  // Create task content with icon
  const taskIcon = document.createElement("i");
  taskIcon.classList.add("fas", "fa-circle-check");
  taskIcon.style.marginRight = "10px";

  const taskText = document.createElement("span");
  taskText.textContent = value;

  task.appendChild(taskIcon);
  task.appendChild(taskText);

  // Add with animation
  task.style.opacity = "0";
  task.style.transform = "translateY(20px)";
  tasksContainer.prepend(task);

  // Trigger animation after a small delay
  setTimeout(() => {
    task.style.opacity = "1";
    task.style.transform = "translateY(0)";
  }, 50);

  event.target.reset();

  // Save to localStorage
  saveTasksToLocalStorage();
};

const changeTaskState = (event) => {
  const task = event.currentTarget;
  task.classList.toggle("done");

  // Save the updated state
  saveTasksToLocalStorage();
};

const order = () => {
  const done = [];
  const toDo = [];
  tasksContainer.childNodes.forEach((el) => {
    el.classList.contains("done") ? done.push(el) : toDo.push(el);
  });
  return [...toDo, ...done];
};

const renderOrderedTasks = () => {
  order().forEach((el) => tasksContainer.appendChild(el));
  saveTasksToLocalStorage();
};

// Save tasks to localStorage
const saveTasksToLocalStorage = () => {
  const tasks = [];
  tasksContainer.childNodes.forEach((task) => {
    const taskText = task.querySelector("span").textContent;
    const isDone = task.classList.contains("done");
    tasks.push({ text: taskText, done: isDone });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Load tasks from localStorage
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);

    tasks.forEach((taskData) => {
      const task = document.createElement("div");
      task.classList.add("task", "roundBorder");
      if (taskData.done) {
        task.classList.add("done");
      }
      task.addEventListener("click", changeTaskState);

      // Create task content with icon
      const taskIcon = document.createElement("i");
      taskIcon.classList.add("fas", "fa-circle-check");
      taskIcon.style.marginRight = "10px";

      const taskText = document.createElement("span");
      taskText.textContent = taskData.text;

      task.appendChild(taskIcon);
      task.appendChild(taskText);

      tasksContainer.appendChild(task);
    });
  }
};

// Initialize
setDate();
loadTasksFromLocalStorage();
