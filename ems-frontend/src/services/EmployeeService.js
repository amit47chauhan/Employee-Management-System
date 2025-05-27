import axios from "axios";

const REST_API_BASE_URL = "/api/employees";

//calls list of employees
export const listEmployees = () => {
  return axios.get(REST_API_BASE_URL);
};

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);