document.addEventListener("DOMContentLoaded", () => {
  createAllUsers();
  setupEventListeners();
});

const setupEventListeners = () => {
  document.getElementById("newUser").addEventListener("click", () => {
    toggleOverlay("block");
    toggleEditPopup("none");
    toggleAddPopup("block");
  });

  document.querySelectorAll(".close").forEach((el) => {
    el.addEventListener("click", () => {
      toggleOverlay("none");
      toggleAddPopup("none");
      toggleEditPopup("none");
    });
  });

  document.querySelector("#addUserForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("/create_usr/", {
      method: "POST",
      body: formData,
    }).then(() => {
      toggleOverlay("none");
      createAllUsers();
    });
  });

  document.querySelector("#editUserForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("/update_usr/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    }).then(() => {
      toggleOverlay("none");
      createAllUsers();
    });
  });
};

const toggleOverlay = (display) => {
  document.getElementById("overlay").style.display = display;
};

const toggleAddPopup = (display) => {
  document.getElementById("popup-1").style.display = display;
};

const toggleEditPopup = (display) => {
  document.getElementById("popup-2").style.display = display;
};

const createUserList = (user) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <th scope="row">
      <div class="media align-items-center">
        <a href="#" class="avatar rounded-circle mr-3">
          <img alt="Image placeholder" src="/static/assets/img/theme/bootstrap.jpg"/>
        </a>
        <div class="media-body">
          <span class="name mb-0 text-sm">${user.name}</span>
        </div>
      </div>
    </th>
    <td class="budget">${user.country}</td>
    <td>
      <span class="badge badge-dot mr-4"><i class="bg-warning"></i><span class="status">${user.status}</span></span>
    </td>
    <td><div class="avatar-group">${user.visaType}</div></td>
    <td>
      <div class="d-flex align-items-center">
        <span class="completion mr-2">60%</span>
        <div>
          <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"></div>
          </div>
        </div>
      </div>
    </td>
    <td class="text-right">
      <div class="dropdown">
        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-ellipsis-v"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
          <a class="dropdown-item editUser" data-userid='${user.id}'  href="#">Edit</a>
          <a class="dropdown-item deleteUser" data-userid='${user.id}' href="#">Delete</a>
          <a class="dropdown-item updateStatus" data-userid='${user.id}' href="#">Update Status</a>
        </div>
      </div>
    </td>`;

  document.querySelector("#userlist").appendChild(tr);
  tr.querySelector(".editUser").addEventListener("click", (e) => {
    e.preventDefault();
    toggleOverlay("block");
    toggleAddPopup("none");
    toggleEditPopup("block");
    setUserValuesInForm(e.target.dataset.userid);
  });

  tr.querySelector(".deleteUser").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Delete user clicked", e.target.dataset.userid);
    deleteUser(e.target.dataset.userid);
  });
};

const createPagination = (currentPageIndex = 0) => {
  const ul = document.querySelector(".pagination");
  ul.innerHTML = "";
  for (let i = 0; i < Math.ceil(users.length / 10); i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPageIndex ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#" data-start="${i * 10}">${
      i + 1
    }</a>`;
    li.querySelector(".page-link").addEventListener("click", changePage);
    ul.appendChild(li);
  }
};

const changePage = (event) => {
  event.preventDefault();
  const start = parseInt(event.target.getAttribute("data-start"));
  createAllUsers(Math.floor(start / 10));
};

let users = [];
const createAllUsers = (currentPageIndex = 0) => {
  const start = currentPageIndex * 10;
  const end = start + 10;
  document.querySelector("#userlist").innerHTML = "";

  fetch("/get_usr/")
    .then((response) => response.json())
    .then((data) => {
      users = data;
      users.slice(start, end).forEach(createUserList);
      createPagination(currentPageIndex);
    });
};

const deleteUser = (id) => {
  id = parseInt(id);
  csrf = document.querySelector("input[name=csrfmiddlewaretoken]").value;
  fetch(`/delete_usr/${id}/`, {
    headers: {
      "X-CSRFToken": csrf,
    },
    method: "DELETE",
  }).then(() => {
    createAllUsers();
  });
};

const setUserValuesInForm = (userid) => {
  const user = getUser(parseInt(userid));
  document
    .querySelector("#editUserForm")
    .querySelector("#username").value = `${user.username}`;

  document
    .querySelector("#editUserForm")
    .querySelector("#name").value = `${user.name}`;

  document
    .querySelector("#editUserForm")
    .querySelector("#country").value = `${user.country}`;

  document
    .querySelector("#editUserForm")
    .querySelector("#status").value = `${user.status}`;

  document
    .querySelector("#editUserForm")
    .querySelector("#visaType").value = `${user.visaType}`;

  document
    .querySelector("#editUserForm")
    .querySelector("#address").value = `${user.address}`;

  document
    .querySelector("#editUserForm")
    .querySelector("#email").value = `${user.email}`;

  document
    .querySelector("#editUserForm")
    .querySelector("#phone").value = `${user.phone}`;

  document
    .querySelector("#editUserForm")
    .querySelector("#id").value = `${user.id}`;

  document.querySelector("#editUserForm").querySelector("#password").value = "";
};

getUser = (id) => {
  return users.find((user) => user.id === id);
};
