const socket = io();

let name = prompt("Enter Your Name...");

const elJoin = document.getElementById("joins-list");
const elMessage = document.getElementById("messages-list");
const elUser = document.getElementById("users-list");

const yjl = document.createElement("li");
const yjh = document.createElement("h4");
yjh.textContent = `You joined this chat`;
yjl.appendChild(yjh);
elJoin.appendChild(yjl);

const yul = document.createElement("li");
const yuh = document.createElement("h3");
yuh.textContent = `You`;
yul.appendChild(yuh);
elUser.appendChild(yul);

name = name || "noname";

socket.emit("username", { name });

socket.on("user-joined", (data) => {
  const ojl = document.createElement("li");
  const ojh = document.createElement("h4");
  ojh.textContent = `${data.name} joined this chat`;
  ojl.appendChild(ojh);
  elJoin.appendChild(ojl);

  const oul = document.createElement("li");
  const ouh = document.createElement("h3");
  ouh.textContent = data.name;
  oul.appendChild(ouh);
  elUser.appendChild(oul);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const { sms } = e.target;

  const yml = document.createElement("li");
  const yms = document.createElement("span");
  const ymp = document.createElement("p");
  yms.textContent = "You";
  ymp.textContent = sms.value;
  yml.appendChild(yms);
  yml.appendChild(ymp);
  yml.classList.add("y-message-item");
  elMessage.appendChild(yml);

  socket.emit("message", {
    name,
    message: sms.value,
  });

  e.target.sms.value = null;
});

socket.on("new-message", ({ name, message }) => {
  const oml = document.createElement("li");
  const oms = document.createElement("span");
  const omp = document.createElement("p");
  oms.textContent = name;
  omp.textContent = message;
  oml.appendChild(oms);
  oml.appendChild(omp);
  oml.classList.add("o-message-item");
  elMessage.appendChild(oml);
});
