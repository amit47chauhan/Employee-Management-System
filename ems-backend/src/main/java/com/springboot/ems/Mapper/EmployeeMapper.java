package com.springboot.ems.Mapper;

import com.springboot.ems.dto.CreateEmployeeDto;
import com.springboot.ems.dto.EmployeeDto;
import com.springboot.ems.entity.Employee;

/*
--------------Purpose-------------
This mapping helps decouple our domain model (Employee) from what we expose to the outside world (EmployeeDto).
This is a good practice because:
-It prevents leaking internal structures.
-we can control what data gets sent to the client.
-DTOs can be customized for different use cases (e.g., hiding sensitive fields).
 */

//This declares the EmployeeMapper class, which provides mapping logic between entity and DTO.
public class EmployeeMapper {

    //Takes an Employee object as input, Returns an EmployeeDto object
    public static EmployeeDto mapToEmployeeDto(Employee employee){
        //This creates and returns a new EmployeeDto by copying over selected fields from the Employee entity.
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }

    //Updating mapper to create DTO -> entity (no ID)
    public static Employee mapToEmployee(CreateEmployeeDto createEmployeeDto){
        return new Employee(
                null,
                createEmployeeDto.getFirstName(),
                createEmployeeDto.getLastName(),
                createEmployeeDto.getEmail()
        );
    }

    /*
    When we're receiving data from a client (e.g., a frontend app or API call), that data typically comes in the form of a DTO, not an Entity.
    To save it to the database, we need to convert it into an Entity — and that's where reverse mapping comes in.
     */
    public static  Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }
}
