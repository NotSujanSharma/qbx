document.addEventListener("DOMContentLoaded", () => {
  createAllUsers();
  setupEventListeners();
});

const setupEventListeners = () => {
  const overlay = document.getElementById("overlay");
};

const createUserList = (user) => {
  const userTemplate = `
     <th scope="row">
      <div class="media align-items-center">
        <div class="media-body">
          <span class="name mb-0 text-sm">Early Childhood Computer Programming</span>
        </div>
      </div>
    </th>
    <td class="budget">Seneca Polytechnic</td>
    <td>
      <span class="badge badge-dot mr-4"><i class="bg-green"></i><span class="status">Open</span></span>
    </td>
    <td><div class="avatar-group">Undergraduate</div></td>
    <td>
      Jan / May / Sep
    </td>
    <td>
      6.5 - 60
    </td>
    <td>
      3.5+
    </td>
    <td class="text-right" >
      <div class="dropdown">
        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Apply
        </a>
        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
          <a class="dropdown-item editUser" data-userid='${user.id}'  href="#">Jan</a>
          <a class="dropdown-item deleteUser" data-userid='${user.id}' href="#">May</a>
          <a class="dropdown-item updateStatus" data-userid='${user.id}' href="#">Sept</a>
        </div>
      </div>
    </td>`;

  const tr = document.createElement("tr");
  tr.innerHTML = userTemplate;
  document.querySelector("#userlist").appendChild(tr);

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
