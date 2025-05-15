package com.springboot.ems.service;

import com.springboot.ems.dto.CreateEmployeeDto;
import com.springboot.ems.dto.EmployeeDto;

public interface EmployeeService {
    EmployeeDto createEmployee(CreateEmployeeDto createEmployeeDto);
}
