document.addEventListener("DOMContentLoaded", function () {
  //padd
  createAllUsers();
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
        console.log(data);
        document.getElementById("overlay").style.display = "none";
        createAllUsers();
      });
    });
});

function createAllUsers() {
  document.querySelector("#userlist").innerHTML = "";
  fetch("/get_usr/")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        createUserList(user);
      });
    });
}

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

/*
  .overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 10000;
  }
  .popup{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 30px;
    width:60vw;
    z-index: 50000;
    
  }
  .modal-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  .modal-header h5{
    margin: 0;
  }
  .modal-header button{
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  .modal-body{
    padding: 20px 0;
  }
  .modal-body .form-group{
    margin-bottom: 20px;
  }
  .modal-body .form-group label{
    margin-bottom: 10px;
  }
  .modal-body .form-group input{
    width: 100%;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
  }
  .modal-body .form-group input:focus{
    outline: none;
  }
  .modal-body .form-group button{
    padding: 10px 20px;
    border: none;
    background: #007bff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  .modal-body .form-group button:hover{
    background: #0056b3;
  }
  .modal-body .form-group button:focus{
    outline: none;
  }
  .modal-body .form-group button:active{
    transform: scale(0.98);
  }
  .modal-body .form-group button[type="submit"]{
    background: #28a745;
  }
  .modal-body .form-group button[type="submit"]:hover{
    background: #218838;
  }
  .modal-body .form-group button[type="submit"]:focus{
    outline: none;
  }
  .modal-body .form-group button[type="submit"]:active{
    transform: scale(0.98);
  }
  .modal-body .form-group button[type="submit"]:disabled{
    background: #6c757d;
    cursor: not-allowed;
  }
  .modal-body .form-group button[type="submit"]:disabled:hover{
    background: #5a6268;
  }
  .modal-body .form-group button[type="submit"]:disabled:focus{
    outline: none;
  }
  .modal-body .form-group button[type="submit"]:disabled:active{
    transform: scale(0.98);
  }

*/
