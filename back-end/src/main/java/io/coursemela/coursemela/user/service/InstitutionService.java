package io.coursemela.coursemela.user.service;

import io.coursemela.coursemela.user.entity.InstitutionEntity;
import io.coursemela.coursemela.user.model.Institution;
import org.springframework.stereotype.Service;

@Service
public interface InstitutionService {
    Institution createInstitution(Institution institution);

    Institution getInstitutionFromInstitutionEntity(InstitutionEntity institutionEntity);
}
