console.log("newJob.js loaded");

const jobCategorySelect = document.getElementById("job-category");
const jobDesignationSelect = document.getElementById("job-designation");
const skillsSelect = document.getElementById("skills");

jobCategorySelect.addEventListener("change", (e) => {
  console.log("Job category changed");
  const jobCategory = e.target.value;

  // Clear existing options
  jobDesignationSelect.innerHTML = `<option selected disabled>Select New Job Designation</option>`;
  skillsSelect.innerHTML = ""; // Clear previous skills

  if (jobCategory === "Tech") {
    // Populate job designations for Tech category
    jobDesignationSelect.innerHTML += `
      <option value="HR">HR</option>
      <option value="SDE">SDE</option>
      <option value="DevOps">DevOps</option>
      <option value="MERN Developer">MERN Developer</option>
      <option value="MEAN Developer">MEAN Developer</option>
      <option value="JAVA Developer">JAVA Developer</option>
      <option value="Front-End Developer">Front-End Developer</option>
      <option value="Back-End Developer">Back-End Developer</option>
      <option value="Full Stack Developer">Full Stack Developer</option>
    `;

    // Populate skills with checkboxes for Tech category
    const techSkills = [
      "HTML",
      "CSS",
      "JS",
      "React",
      "NodeJs",
      "Express",
      "MongoDB",
      "SQL",
      "MERN",
      "MEAN",
      "C++",
      "JAVA",
      "Python",
      "DevOps",
      "AWS",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "Jenkins",
    ];
    techSkills.forEach((skill) => {
      skillsSelect.innerHTML += `
        <li class="dropdown-item" onclick="toggleSkill('${skill}')">
          <input type="checkbox" id="${skill}" name="skillsrequired" value="${skill}" class="me-2">
          <label for="${skill}" class="ms-2">${skill}</label>
        </li>
      `;
    });
  } else if (jobCategory === "Non-Tech") {
    // Populate job designations for Non-Tech category
    jobDesignationSelect.innerHTML += `
      <option value="HR">HR</option>
      <option value="Manager">Manager</option>
      <option value="Accountant">Accountant</option>
      <option value="Receptionist">Receptionist</option>
      <option value="Sales">Sales</option>
      <option value="Marketing">Marketing</option>
      <option value="Finance">Finance</option>
      <option value="Operation">Operation</option>
      <option value="Logistics">Logistics</option>
    `;

    // Populate skills with checkboxes for Non-Tech category
    const nonTechSkills = [
      "Communication",
      "Management",
      "Accounting",
      "Sales",
      "Marketing",
      "Finance",
      "Operation",
      "Logistics",
    ];
    nonTechSkills.forEach((skill) => {
      skillsSelect.innerHTML += `
        <li class="dropdown-item" onclick="toggleSkill('${skill}')">
          <input type="checkbox" id="${skill}" name="skillsrequired" value="${skill}">
          <label for="${skill}" class="ms-2">${skill}</label>
        </li>
      `;
    });
  }
});

function toggleSkill(skillId) {
  const checkbox = document.getElementById(skillId);
  checkbox.checked = !checkbox.checked;
}
