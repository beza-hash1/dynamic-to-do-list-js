document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addButton = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  loadTasks();

  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    } else {
      alert("Please enter a task.");
    }
  });

  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
      } else {
        alert("Please enter a task.");
      }
    }
  });

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach(taskText => {
      addTask(taskText, false); // don’t save again
    });
  }

  function addTask(taskText, save = true) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  function removeTaskFromStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
});
