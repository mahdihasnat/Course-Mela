package io.coursemela.coursemela.course.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Topic {
    private Long id;
    private Subject subject;
    private String name;
}
