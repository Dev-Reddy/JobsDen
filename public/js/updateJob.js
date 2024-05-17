//Script to change the job designation and skills based on the job category selected by the user

const jobCategorySelect = document.getElementById("job-category");

jobCategorySelect.addEventListener("change", (e) => {
  const jobCategory = e.target.value;
  const jobDesignationSelect = document.getElementById("job-designation");
  const skillsSelect = document.getElementById("skills");

  //change the job designation and skills based on the job category

  //for tech jobs
  if (jobCategory === "Tech") {
    jobDesignationSelect.innerHTML = `
    <option selected>Select New Job Designation</option>
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

    skillsSelect.innerHTML = `
        <option selected disabled>Select skills required for this job</option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JS">JS</option>
        <option value="React">React</option>
        <option value="NodeJs">NodeJs</option>
        <option value="Express">Express</option>
        <option value="MongoDB">MongoDB</option>
        <option value="SQL">SQL</option>
        <option value="MERN">MERN</option>
        <option value="MEAN">MEAN</option>
        <option value="C++">C++</option>
        <option value="JAVA">JAVA</option>
        <option value="Python">Python</option>
        <option value="DevOps">DevOps</option>
        <option value="AWS">AWS</option>
        <option value="Azure">Azure</option>
        <option value="GCP">GCP</option>
        <option value="Docker">Docker</option>
        <option value="Kubernetes">Kubernetes</option>
        <option value="Jenkins">Jenkins</option>
        `;
  }
  //for non-tech jobs
  else if (jobCategory === "Non-Tech") {
    jobDesignationSelect.innerHTML = `
    <option selected>Select New Job Designation</option>
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

    skillsSelect.innerHTML = `
        <option selected disabled>Select skills required for this job</option>
        <option value="Communication">Communication</option>
        <option value="Management">Management</option>
        <option value="Accounting">Accounting</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="Finance">Finance</option>
        <option value="Operation">Operation</option>
        <option value="Logistics">Logistics</option>
        `;
  }
});
