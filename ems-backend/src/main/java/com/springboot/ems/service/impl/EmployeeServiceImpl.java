package com.springboot.ems.service.impl;

import com.springboot.ems.Mapper.EmployeeMapper;
import com.springboot.ems.dto.EmployeeDto;
import com.springboot.ems.entity.Employee;
import com.springboot.ems.repository.EmployeeRepository;
import com.springboot.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    //Client sends a request with employee data (in DTO form).
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        //Service converts DTO → entity
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        //Entity is saved to the database using the repository.
        Employee savedEmployee = employeeRepository.save(employee);
        //Saved entity is converted back to a DTO. DTO is returned as the API response.
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }
}
