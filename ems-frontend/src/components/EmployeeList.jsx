import { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate} from "react-router-dom";

const EmployeeList = () => {
  
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();
  
  useEffect(() => {
    getEmployees();
  },[])

  function getEmployees(){
    listEmployees().then((response) => {
      setEmployees(response.data)
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    })
  }

  function addNewEmployee(){
   navigator('/add/employee')
  }

  function updateEmployee(id){
    navigator(`/edit/employee/${id}`)
  }

  function removeEmployee(id) {
    deleteEmployee(id).then(() =>{
      getEmployees();
      alert("Employee deleted successfully");
    }).catch(error => {
      console.error(error);
    });
  }

  return (
    <div className="container-fluid content-wrapper">
      <h2 className="text-center fw-bold">List of Employees</h2>
      <button className="btn btn-sm btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map(employee => <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button className="btn btn-info ms-2" onClick={() => updateEmployee(employee.id)}>Edit</button>
                <button className="btn btn-danger ms-2" onClick={() => removeEmployee(employee.id)}>Delete</button>
              </td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeList;