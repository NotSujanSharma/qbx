var programs=[]
document.addEventListener("DOMContentLoaded", () => {
  createAllPrograms();
});


const createProgramList = (program) => {
  const userTemplate = `<div class="card-body" data-id=${program['id']} onclick="printData(this)">
                <div class="row">
                  <div class="col-md-4">
                    <img src="${program["school"]["logo"]}" height=90 width=80 alt="Program Image" />
                  </div>
                  <div class="col-md-8">
                    <h2>${program["name"]}</h2>
                    <h4>${program["school"]["name"]}</h4>
                    <hr>
                    <h3>${program["formattedTuition"]}</h3>
                  </div>
                </div>
              </div>`;

  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = userTemplate;
  document.querySelector(".available-programs").appendChild(div);

};

// Rest of the pagination and changePage function remains the same
const createAllPrograms = async (currentPageIndex = 0) => {
  try {
    const response = await fetch("/api/get_data/?page=1");
    const data = await response.json();
    programs = data;
    document.querySelector(".available-programs").innerHTML = "";
    programs["programs"]
      .forEach(createProgramList);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

// const createAllPrograms = async (currentPage=1, additionalData) => { 
//   try {
//     var response;
//     if (additionalData) {
      
//        response = await fetch(`https://www.applyboard.com:443/api/dsj/v1/pws-spa/search?sort=relevance&page%5Bnumber%5D=${currentPage}&${additionalData}`);
//     }
//     else {
      
//        response = await fetch(`https://www.applyboard.com:443/api/dsj/v1/pws-spa/search?sort=relevance&page%5Bnumber%5D=${currentPage}`);
//     }
//     const data = await response.json();
//     programs = data;
//     document.querySelector(".available-programs").innerHTML = "";
//     programs["programs"]
//       .forEach(createProgramList);
//   } catch (error) {
//     console.error("Failed to fetch users:", error);
//   }
// };


function printData(element) {
  const programId = element.getAttribute("data-id");
  program = getProgramDetails(programId);
  program.then((program) => {
    let programDetails = document.querySelector(".program-details");
    // get child with id program-name and change innerHTML
    programDetails.querySelector("#program-name").innerHTML = program["name"];
    programDetails.querySelector("#school-name").innerHTML = program["school"]["name"];
    programDetails.querySelector("#program-description").innerHTML = program["programSummary"];
    programDetails.querySelector("#programId").value = programId;
  });
  
};

const getProgramDetails = async (programId) => {
  
  const program = programs["programs"].filter((program) => program.id == programId)[0];
  return program;

};

const test = async (urlData) => {
  try {

    const response = await fetch(`/test/${urlData}`);
    const data = await response.json();
    programs = data;
    document.querySelector(".available-programs").innerHTML = "";
    programs["programs"]
      .forEach(createProgramList);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};


function getCheckedValues() {
  const checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked');
  const values = {}; 

  checkboxes.forEach(checkbox => {
    const name = checkbox.name;
    const value = checkbox.value;

    if (!values[name]) {
      values[name] = [];
    }
    values[name].push(value);
  });

  
  for (const key in values) {
    values[key] = values[key].join(',');
  }
  let searchdata = document.getElementById('search').value;
  let urldata = `page[number]=1${values["location"] ? `&locations=${values["location"]}` : ''}`;
  // let urldata = `${values["location"] ? `&locations=${values["location"]}` : ''}`;
  urldata += `${values["fees"] ? `&tuitions=${values["fees"]}&tuitionCurrency=USD` : ''}`;
  urldata += `${searchdata ? `&q=${searchdata}` : ''}`;
  // console.log(`urldata: ${urldata}`);
  // createAllPrograms(1, urldata);
  test(urldata);
  return values;
}
