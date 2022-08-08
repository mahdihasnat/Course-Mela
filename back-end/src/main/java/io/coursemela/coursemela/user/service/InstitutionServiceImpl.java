package io.coursemela.coursemela.user.service;

import io.coursemela.coursemela.user.entity.InstitutionEntity;
import io.coursemela.coursemela.user.model.Institution;
import io.coursemela.coursemela.user.repository.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstitutionServiceImpl implements InstitutionService {

    @Autowired
    InstitutionRepository institutionRepository;

    @Override
    public Institution createInstitution(Institution institution) {
        InstitutionEntity institutionEntity=new InstitutionEntity(institution);
        institutionEntity = institutionRepository.save(institutionEntity);
        institution = new Institution(institutionEntity);
        return institution;
    }
}
