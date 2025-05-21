
const EmployeeList = () => {
    const dummyData = [
        {
            "id" : 1,
            "firstName" : "Amit",
            "lastName" : "Chauhan",
            "email" : "amit@gmail.com"
        },
        {
            "id" : 2,
            "firstName" : "Manish",
            "lastName" : "Chauhan",
            "email" : "manish@gmail.com"
        },
        {
            "id" : 3,
            "firstName" : "Geeta",
            "lastName" : "Chauhan",
            "email" : "geeta@gmail.com"
        },
    ]
  return (
    <div>
      <h2>List of Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
          </tr>
        </thead>
        <tbody>
          {
            dummyData.map(employee => <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeList;