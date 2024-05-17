// Desc: Model for the applicant

// Creating the ApplicantModel class
export default class ApplicantModel {
  // ---------------------------------------------------------

  //properties of the applicant model
  constructor(id, name, email, contact, resumePath) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resumePath = resumePath;
  }

  // ---------------------------------------------------------

  //to get all applicants for the job posting

  static getAll() {
    return applicants;
  }

  // ---------------------------------------------------------

  //to add an applicant

  static add(name, email, contact, resumePath) {
    //create a new applicant object
    const newApplicant = new ApplicantModel(
      applicants.length + 1,
      name,
      email,
      contact,
      resumePath
    );

    //add the applicant to the applicants array
    applicants.push(newApplicant);

    //return the new applicant
    return newApplicant;
  }

  // ---------------------------------------------------------

  //to get an applicant by id

  static getApplicantById(id) {
    //find the applicant with the given id
    return applicants.find((applicant) => applicant.id === id);
  }
  // ---------------------------------------------------------
}

//array of all applicants
//can be used to contact the applicants later about other job postings
var applicants = [];
