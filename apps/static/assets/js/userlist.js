var users = [];
var a = 0;
var b = 10;
document.addEventListener("DOMContentLoaded", function () {
  //padd
  usr = createAllUsers();
  document.getElementById("newUser").addEventListener("click", function () {
    document.getElementById("overlay").style.display = "block";
  });
  document.getElementById("close").addEventListener("click", function () {
    document.getElementById("overlay").style.display = "none";
  });
  // addUserForm
  document
    .querySelector("#addUserForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      formData = new FormData(document.querySelector("#addUserForm"));
      fetch("/create_usr/", {
        method: "POST",
        body: formData,
      }).then((data) => {
        document.getElementById("overlay").style.display = "none";
        createAllUsers();
      });
    });
});

// Single user
function createUserList(user) {
  let tr = document.createElement("tr");
  tr.innerHTML = `
                  <th scope="row">
                      <div class="media align-items-center">
                          <a href="#" class="avatar rounded-circle mr-3">
                              <img
                                  alt="Image placeholder"
                                  src="/static/assets/img/theme/bootstrap.jpg"
                              />
                          </a>
                            <div class="media-body">
                                <span class="name mb-0 text-sm">${user.name}</span>
                            </div>
                        </div>
                    </th>
                    <td class="budget">${user.country}</td>
                        <td>
                            <span class="badge badge-dot mr-4">
                                <i class="bg-warning
                                "></i>
                                <span class="status">${user.status}</span>
                            </span>
                        </td>
                        <td>
                            <div class="avatar-group">${user.visaType}</div>
                        </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <span class="completion
                                mr-2">60%</span>
                                <div>
                                    <div class="progress">
                                        <div
                                            class="progress-bar bg-warning"
                                            role="progressbar"
                                            aria-valuenow="60"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style="width: 60%"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-right
                        ">
                            <div class="dropdown">
                                <a
                                    class="btn btn-sm btn-icon-only text-light"
                                    href="#"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i class="fas fa-ellipsis-v"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                    <a class="dropdown-item" href="#">
                                        Action
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        Another action
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </div>
                            </div>
                        </td>
                    `;
  document.querySelector("#userlist").appendChild(tr);
}
function createPagination(currentPageIndex = 0) {
  let ul = document.querySelector(".pagination");
  ul.innerHTML = ""; 
  for (let i = 0; i < Math.ceil(users.length / 10); i++) {
    let li = document.createElement("li");
    li.classList.add("page-item");
    if (i === currentPageIndex) {
      li.classList.add("active"); 
    }
    li.innerHTML = `<a class="page-link" href="#" data-start="${
      i * 10
    }" onclick="changePage(event)">${i + 1}</a>`;
    ul.appendChild(li);
  }
}

function changePage(event) {
  event.preventDefault();
  a = parseInt(event.target.getAttribute("data-start"));
  b = a + 10 < users.length ? a + 10 : users.length;

  let currentPageIndex = a / 10; 
  createAllUsers(currentPageIndex); 
}

function createAllUsers(currentPageIndex = 0) {
  document.querySelector("#userlist").innerHTML = "";
  fetch("/get_usr/")
    .then((response) => response.json())
    .then((data) => {
      users = data;
      for (let i = a; i < b && i < users.length; i++) {
        if (users[i]) {
          createUserList(users[i]);
        }
      }
      createPagination(currentPageIndex); 
    });
}
