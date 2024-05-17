// Desc: Model for a job

//Imports
import ApplicantModel from "./applicant.model.js";

//Creating the JobModel class
export default class JobModel {
  // ---------------------------------------------------------

  //properties of the job model
  constructor(
    id,
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings,
    jobposted,
    recruiterEmail
  ) {
    this.id = id;
    this.jobcategory = jobcategory;
    this.jobdesignation = jobdesignation;
    this.joblocation = joblocation;
    this.companyname = companyname;
    this.salary = salary;
    this.applyby = applyby;
    this.skillsrequired = skillsrequired;
    this.numberofopenings = numberofopenings;
    this.jobposted = jobposted;
    this.recruiterEmail = recruiterEmail;
    this.applicants = [];
  }

  // ---------------------------------------------------------

  //new job posting

  static add(
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings,
    recruiterEmail
  ) {
    //create a new job object
    const newJob = new JobModel(
      jobs.length + 1,
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
      new Date().toLocaleString(),
      recruiterEmail
    );

    //add the job to the jobs array
    jobs.push(newJob);
  }

  // ---------------------------------------------------------

  //get all jobs

  static getAll() {
    return jobs;
  }

  // ---------------------------------------------------------

  //get job by id

  static getJobById(id) {
    return jobs.find((job) => job.id == id);
  }

  // ---------------------------------------------------------

  //FILTER JOB BY SEARCH QUERY

  static filterJobs(searchQuery) {
    //filter the jobs based on the search query
    //and return the jobs that match the search query
    return jobs.filter((job) => {
      return (
        job.jobcategory
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim()) ||
        job.jobdesignation
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim()) ||
        job.joblocation
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim()) ||
        job.companyname
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim()) ||
        job.skillsrequired.some((skill) => {
          return skill
            .toLowerCase()
            .trim()
            .includes(searchQuery.toLowerCase().trim());
        })
      );
    });
  }

  // ---------------------------------------------------------

  //update a job

  static updateJob(
    id,
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings
  ) {
    //find the job with the given id
    const job = jobs.find((job) => job.id == id);

    //update the job details
    job.jobcategory = jobcategory;
    job.jobdesignation = jobdesignation;
    job.joblocation = joblocation;
    job.companyname = companyname;
    job.salary = salary;
    job.applyby = applyby;
    job.skillsrequired = skillsrequired;
    job.numberofopenings = numberofopenings;
  }

  // ---------------------------------------------------------

  //check if the applicant has already applied for the job

  static checkIfApplied(jobId, email, contact) {
    //find the job with the given id
    const job = jobs.find((job) => job.id == jobId);

    //if the job has no applicants, make an empty array
    if (!job.applicants) {
      job.applicants = [];
    }

    //check if the applicant has already applied for the job
    return job.applicants.some(
      (applicant) => applicant.email === email || applicant.contact == contact
    );
  }

  // ---------------------------------------------------------

  //add a new applicant to the job

  static addApplicant(jobId, name, email, contact, resumePath) {
    //find the job with the given id
    const job = jobs.find((job) => job.id === jobId);

    //add the applicant to the applicants array of the applicant model
    const applicant = ApplicantModel.add(name, email, contact, resumePath);

    //add the applicant to the job's applicants array
    job.applicants.push(applicant);

    //send an email to the applicant
    ApplicantModel.sendEmail(jobId, email);
  }

  // ---------------------------------------------------------

  //get all applicants for the job

  static getApplicants(jobId) {
    //find the job with the given id
    const job = jobs.find((job) => job.id === jobId);

    //return the applicants array of the job
    return job.applicants;
  }

  // ---------------------------------------------------------

  //deleting a job

  static deleteJob(id) {
    //find the index of the job with the given id
    const index = jobs.findIndex((job) => job.id == id);

    //remove the job from the jobs array
    jobs.splice(index, 1);
  }

  // ---------------------------------------------------------
}

//jobs array with predefined jobs for tech and non-tech roles
var jobs = [
  {
    id: 1,
    jobcategory: "Tech",
    jobdesignation: "Angular Developer",
    joblocation: "London UK",
    companyname: "Go Digit",
    salary: "60-70lpa",
    applyby: "Sun Jan 29 2024",
    skillsrequired: ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
    numberofopenings: 5,
    jobposted: new Date("Sun Jan 15 2024").toLocaleString(),
    recruiterEmail: "john@doe.com",
  },
  {
    id: 2,
    jobcategory: "Non-Tech",
    jobdesignation: "Manager",
    joblocation: "London UK",
    companyname: "Unilever",
    salary: "80-100lpa",
    applyby: "Mon Feb 05 2024",
    skillsrequired: ["Leadership", "Team Management", "Strategic Planning"],
    numberofopenings: 2,
    jobposted: new Date("Thu Jan 25 2024").toLocaleString(),
    recruiterEmail: "bob@unilever.com",
  },
  {
    id: 3,
    jobcategory: "Tech",
    jobdesignation: "SDE",
    joblocation: "Bangalore IND",
    companyname: "Coding Ninjas",
    salary: "14-50lpa",
    applyby: "Tue Feb 20 2024",
    skillsrequired: [
      "REACT",
      "NodeJs",
      "JS",
      "SQL",
      "MongoDB",
      "Express",
      "AWS",
    ],
    numberofopenings: 5,
    jobposted: new Date("Mon Feb 05 2024").toLocaleString(),
    recruiterEmail: "john@doe.com",
  },
  {
    id: 4,
    jobcategory: "Tech",
    jobdesignation: "SDE",
    joblocation: "San Francisco USA",
    companyname: "Google",
    salary: "40-120lpa",
    applyby: "Fri Mar 01 2024",
    skillsrequired: [
      "REACT",
      "NodeJs",
      "JS",
      "SQL",
      "MongoDB",
      "Express",
      "AWS",
    ],
    numberofopenings: 5,
    jobposted: new Date("Sat Feb 10 2024").toLocaleString(),
    recruiterEmail: "john@doe.com",
  },
  {
    id: 5,
    jobcategory: "Tech",
    jobdesignation: "SDE",
    joblocation: "Seattle USA",
    companyname: "Amazon",
    salary: "50-100lpa",
    applyby: "Sat Mar 09 2024",
    skillsrequired: ["Java", "Python", "C++", "AWS", "JavaScript"],
    numberofopenings: 5,
    jobposted: new Date("Fri Mar 01 2024").toLocaleString(),
    recruiterEmail: "john@doe.com",
  },
  {
    id: 6,
    jobcategory: "Non-Tech",
    jobdesignation: "Financial Analyst",
    joblocation: "New York USA",
    companyname: "Goldman Sachs",
    salary: "90-120lpa",
    applyby: "Sun Mar 24 2024",
    skillsrequired: [
      "Financial Modeling",
      "Data Analysis",
      "Investment Banking",
    ],
    numberofopenings: 4,
    jobposted: new Date("Thu Mar 21 2024").toLocaleString(),
    recruiterEmail: "alice@goldmansachs.com",
  },
  {
    id: 7,
    jobcategory: "Tech",
    jobdesignation: "Full Stack Developer",
    joblocation: "New York USA",
    companyname: "Tech Solutions Inc.",
    salary: "80-100lpa",
    applyby: "Sun Apr 15 2024",
    skillsrequired: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
    ],
    numberofopenings: 3,
    jobposted: new Date("Sat Apr 01 2024").toLocaleString(),
    recruiterEmail: "jane@doe.com",
  },
  {
    id: 8,
    jobcategory: "Non-Tech",
    jobdesignation: "Human Resources Manager",
    joblocation: "Chicago USA",
    companyname: "HR Connect",
    salary: "70-90lpa",
    applyby: "Mon Apr 30 2024",
    skillsrequired: [
      "Recruitment",
      "Employee Relations",
      "Performance Management",
    ],
    numberofopenings: 2,
    jobposted: new Date("Tue Apr 10 2024").toLocaleString(),
    recruiterEmail: "john@doe.com",
  },
  {
    id: 9,
    jobcategory: "Tech",
    jobdesignation: "Data Scientist",
    joblocation: "San Francisco USA",
    companyname: "Data Insight",
    salary: "100-120lpa",
    applyby: "Sat May 05 2024",
    skillsrequired: ["Python", "R", "Machine Learning", "Data Analysis"],
    numberofopenings: 4,
    jobposted: new Date("Thu Apr 20 2024").toLocaleString(),
    recruiterEmail: "john@doe.com",
  },
  {
    id: 10,
    jobcategory: "Tech",
    jobdesignation: "Cybersecurity Analyst",
    joblocation: "Washington DC USA",
    companyname: "SecureNet",
    salary: "90-110lpa",
    applyby: "Sun May 20 2024",
    skillsrequired: [
      "Cybersecurity",
      "Network Security",
      "Penetration Testing",
    ],
    numberofopenings: 2,
    jobposted: new Date("Fri May 05 2024").toLocaleString(),
    recruiterEmail: "john@doe.com",
  },
  {
    id: 11,
    jobcategory: "Non-Tech",
    jobdesignation: "Marketing Manager",
    joblocation: "Los Angeles USA",
    companyname: "Marketing Solutions Ltd.",
    salary: "80-100lpa",
    applyby: "Mon May 28 2024",
    skillsrequired: ["Digital Marketing", "SEO", "Social Media Marketing"],
    numberofopenings: 3,
    jobposted: new Date("Tue May 15 2024").toLocaleString(),
    recruiterEmail: "jane@doe.com",
  },
  {
    id: 12,
    jobcategory: "Tech",
    jobdesignation: "DevOps Engineer",
    joblocation: "London UK",
    companyname: "TechOps Ltd.",
    salary: "70-90lpa",
    applyby: "Sat Jun 10 2024",
    skillsrequired: ["DevOps", "CI/CD", "Docker", "Kubernetes", "AWS"],
    numberofopenings: 3,
    jobposted: new Date("Tue May 30 2024").toLocaleString(),
    recruiterEmail: "jane@doe.com",
  },
  {
    id: 13,
    jobcategory: "Non-Tech",
    jobdesignation: "Finance Manager",
    joblocation: "New York USA",
    companyname: "Finance Solutions Inc.",
    salary: "100-120lpa",
    applyby: "Sun Jun 25 2024",
    skillsrequired: [
      "Financial Reporting",
      "Budgeting",
      "Forecasting",
      "Financial Analysis",
    ],
    numberofopenings: 2,
    jobposted: new Date("Fri Jun 09 2024").toLocaleString(),
    recruiterEmail: "jane@doe.com",
  },
  {
    id: 14,
    jobcategory: "Tech",
    jobdesignation: "Software Engineer",
    joblocation: "San Francisco USA",
    companyname: "Tech Innovations",
    salary: "120-150lpa",
    applyby: "Tue Jul 04 2024",
    skillsrequired: ["Java", "Python", "Spring Boot", "Microservices", "SQL"],
    numberofopenings: 5,
    jobposted: new Date("Sun Jun 18 2024").toLocaleString(),
    recruiterEmail: "john@doe.com",
  },
  {
    id: 15,
    jobcategory: "Tech",
    jobdesignation: "Backend Developer",
    joblocation: "Bangalore IND",
    companyname: "Code Wizards",
    salary: "15-25lpa",
    applyby: "Mon Jul 10 2024",
    skillsrequired: ["Java", "Spring", "Hibernate", "MySQL"],
    numberofopenings: 4,
    jobposted: new Date("Tue Jun 27 2024").toLocaleString(),
    recruiterEmail: "jane@doe.com",
  },
  {
    id: 16,
    jobcategory: "Non-Tech",
    jobdesignation: "Sales Manager",
    joblocation: "Chicago USA",
    companyname: "Sales Solutions Ltd.",
    salary: "80-100lpa",
    applyby: "Thu Jul 20 2024",
    skillsrequired: [
      "Sales",
      "Business Development",
      "Client Relationship Management",
    ],
    numberofopenings: 3,
    jobposted: new Date("Sat Jul 08 2024").toLocaleString(),
    recruiterEmail: "jane@doe.com",
  },
  {
    id: 17,
    jobcategory: "Tech",
    jobdesignation: "Frontend Developer",
    joblocation: "Seattle USA",
    companyname: "Web Solutions Inc.",
    salary: "80-100lpa",
    applyby: "Wed Aug 02 2024",
    skillsrequired: ["HTML", "CSS", "JavaScript", "React", "Vue.js"],
    numberofopenings: 2,
    jobposted: new Date("Mon Jul 17 2024").toLocaleString(),
    recruiterEmail: "john@doe.com",
  },
  {
    id: 18,
    jobcategory: "Non-Tech",
    jobdesignation: "Operations Manager",
    joblocation: "San Francisco USA",
    companyname: "Operations Solutions Ltd.",
    salary: "100-120lpa",
    applyby: "Sat Aug 12 2024",
    skillsrequired: [
      "Operations Management",
      "Logistics",
      "Supply Chain Management",
    ],
    numberofopenings: 2,
    jobposted: new Date("Tue Aug 01 2024").toLocaleString(),
    recruiterEmail: "john@doe.com",
  },
  {
    id: 19,
    jobcategory: "Tech",
    jobdesignation: "Machine Learning Engineer",
    joblocation: "New York USA",
    companyname: "AI Solutions Inc.",
    salary: "120-150lpa",
    applyby: "Tue Aug 22 2024",
    skillsrequired: [
      "Machine Learning",
      "Python",
      "TensorFlow",
      "Deep Learning",
    ],
    numberofopenings: 3,
    jobposted: new Date("Thu Aug 10 2024").toLocaleString(),
    recruiterEmail: "jane@doe.com",
  },
  {
    id: 20,
    jobcategory: "Tech",
    jobdesignation: "Data Engineer",
    joblocation: "Chicago USA",
    companyname: "Data Solutions Ltd.",
    salary: "100-120lpa",
    applyby: "Fri Aug 30 2024",
    skillsrequired: ["Big Data", "Hadoop", "Spark", "Python", "SQL"],
    numberofopenings: 2,
    jobposted: new Date("Sat Aug 19 2024").toLocaleString(),
    recruiterEmail: "jane@doe.com",
  },
];
