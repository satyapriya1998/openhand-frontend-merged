export interface EmployeeProfile {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  avatar?: string;

  employeeInformation: {
    employeeId: string;
    joiningDate: string;
    reportingManager: string;
    workLocation: string;
    employmentType: string;
  };

  personalInformation: {
    dateOfBirth: string;
    gender: string;
    maritalStatus: string;
    nationality: string;
    bloodGroup: string;
    address: string;
  };

  passportInformation: {
    passportNumber: string;
    placeOfIssue: string;
    dateOfIssue: string;
    dateOfExpiry: string;
    country: string;
  };

  otherInformation: {
    emergencyContactName: string;
    emergencyContactPhone: string;
    panNumber: string;
    aadhaarNumber: string;
    linkedIn: string;
  };
}
