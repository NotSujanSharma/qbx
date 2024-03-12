document.addEventListener("DOMContentLoaded", () => {
  createAllUsers();
  setupEventListeners();
});

const setupEventListeners = () => {
  const overlay = document.getElementById("overlay");
  const popupAdd = document.getElementById("popup-1");
  const popupEdit = document.getElementById("popup-2");

  document.getElementById("newUser").addEventListener("click", () => {
    toggleOverlayDisplay(true);
    toggleDisplay(popupEdit, false);
    toggleDisplay(popupAdd, true);
  });

  document
    .querySelectorAll(".close")
    .forEach((el) =>
      el.addEventListener("click", () => toggleOverlayDisplay(false))
    );

  const formSubmitHandler = (url, method) => (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fetchOptions = {
      method,
      body: url.includes("update")
        ? JSON.stringify(Object.fromEntries(formData))
        : formData,
    };
    if (url.includes("update"))
      fetchOptions.headers = { "Content-Type": "application/json" };

    fetch(url, fetchOptions).then(() => {
      toggleOverlayDisplay(false);
      createAllUsers();
    });
  };

  document
    .querySelector("#addUserForm")
    .addEventListener("submit", formSubmitHandler("/create_usr/", "POST"));
  document
    .querySelector("#editUserForm")
    .addEventListener("submit", formSubmitHandler("/update_usr/", "POST"));
};

const toggleOverlayDisplay = (isVisible) => {
  document.getElementById("overlay").style.display = isVisible
    ? "block"
    : "none";
  if (!isVisible) {
    ["popup-1", "popup-2"].forEach((popupId) =>
      toggleDisplay(document.getElementById(popupId), false)
    );
  }
};

const toggleDisplay = (element, isVisible) => {
  element.style.display = isVisible ? "block" : "none";
};

const createUserList = (user) => {
  const userTemplate = `
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

  const tr = document.createElement("tr");
  tr.innerHTML = userTemplate;
  document.querySelector("#userlist").appendChild(tr);

  tr.querySelector(".editUser").addEventListener("click", editUserClick);
  tr.querySelector(".deleteUser").addEventListener("click", deleteUserClick);
};

const editUserClick = (e) => {
  e.preventDefault();
  toggleOverlayDisplay(true);
  toggleDisplay(document.getElementById("popup-1"), false);
  toggleDisplay(document.getElementById("popup-2"), true);
  setUserValuesInForm(e.target.dataset.userid);
};

const deleteUserClick = (e) => {
  e.preventDefault();
  deleteUser(e.target.dataset.userid);
};

// Rest of the pagination and changePage function remains the same
const createAllUsers = async (currentPageIndex = 0) => {
  try {
    const response = await fetch("/get_usr/");
    const data = await response.json();
    users = data;
    document.querySelector("#userlist").innerHTML = "";
    users
      .slice(currentPageIndex * 10, (currentPageIndex + 1) * 10)
      .forEach(createUserList);
    createPagination(currentPageIndex);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

const deleteUser = async (id) => {
  try {
    const csrf = document.querySelector(
      "input[name=csrfmiddlewaretoken]"
    ).value;
    await fetch(`/delete_usr/${id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": csrf,
      },
    });
    createAllUsers();
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

const setUserValuesInForm = (userid) => {
  const user = users.find((u) => u.id.toString() === userid);
  if (!user) return;
  const form = document.querySelector("#editUserForm");
  Object.keys(user).forEach((key) => {
    if (form.elements[key]) form.elements[key].value = user[key];
  });
  form.elements["password"].value = ""; // Clear password field
};

const createPagination = (currentPageIndex = 0) => {
  const ul = document.querySelector(".pagination");
  ul.innerHTML = ""; // Clear existing pagination links

  const totalPages = Math.ceil(users.length / 10);
  for (let i = 0; i < totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPageIndex ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#" data-start="${i * 10}">${
      i + 1
    }</a>`;
    ul.appendChild(li);
  }

  // Add click event listeners to the newly created page links
  document.querySelectorAll(".pagination .page-link").forEach((link) => {
    link.addEventListener("click", changePage);
  });
};

const changePage = (event) => {
  event.preventDefault();
  const pageIndex = parseInt(event.target.getAttribute("data-start")) / 10;
  createAllUsers(pageIndex);
};
