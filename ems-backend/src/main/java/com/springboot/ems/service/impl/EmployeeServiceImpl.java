package com.springboot.ems.service.impl;

import com.springboot.ems.Mapper.EmployeeMapper;
import com.springboot.ems.dto.CreateEmployeeDto;
import com.springboot.ems.dto.EmployeeDto;
import com.springboot.ems.entity.Employee;
import com.springboot.ems.exception.ResourceNotFoundException;
import com.springboot.ems.repository.EmployeeRepository;
import com.springboot.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    //Client sends a request with employee data (in DTO form).
    @Override
    public EmployeeDto createEmployee(CreateEmployeeDto createEmployeeDto) {
        //Service converts DTO → entity
        Employee employee = EmployeeMapper.mapToEmployee(createEmployeeDto);
        //Entity is saved to the database using the repository.
        Employee savedEmployee = employeeRepository.save(employee);
        //Saved entity is converted back to a DTO. DTO is returned as the API response.
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    // Service to get an employee by id
    @Override
    public EmployeeDto getEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Employee does not exist with given id: "+ employeeId
                ));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    //service to get all the employees
    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(
                EmployeeMapper::mapToEmployeeDto
        ).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(
                        ()-> new ResourceNotFoundException(
                                "Employee does not exist with given id: " + employeeId
                        )
                );
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }
}
