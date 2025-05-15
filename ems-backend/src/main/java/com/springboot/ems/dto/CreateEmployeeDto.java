package com.springboot.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


// DTO includes a default id value (0), and your mapping function passes that to the entity.
//Prevents accidentally trying to save with id = 0 or null.

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateEmployeeDto {
    private String firstName;
    private String lastName;
    private String email;
}
