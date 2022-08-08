package io.coursemela.coursemela.user.service;

import io.coursemela.coursemela.user.model.Institution;
import org.springframework.stereotype.Service;

@Service
public interface InstitutionService {
    Institution createInstitution(Institution institution);
}
