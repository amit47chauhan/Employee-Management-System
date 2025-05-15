package com.springboot.ems.service;

import com.springboot.ems.dto.CreateEmployeeDto;
import com.springboot.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(CreateEmployeeDto createEmployeeDto);
    EmployeeDto getEmployee(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);
}
