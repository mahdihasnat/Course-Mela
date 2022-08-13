package io.coursemela.coursemela.payment.service;

import io.coursemela.coursemela.payment.entity.PromoEntity;
import io.coursemela.coursemela.payment.model.Promo;
import io.coursemela.coursemela.payment.repository.PromoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromoServiceImpl implements PromoService {
    @Autowired
    PromoRepository promoRepository;

    List<Promo> getPromosFromPromoEntities(List<PromoEntity> promoEntities) {
        return promoEntities.stream()
                .map(promoEntity -> getPromoFromPromoEntity(promoEntity))
                .collect(Collectors.toList());
    }

    @Override
    public List<Promo> getPromosOfStudent(Long studentId) {
//        return getPromos();
        List<PromoEntity> promoEntities = promoRepository.findByStudentPromoEntitiesStudentEntityId(studentId);
        List<Promo> promos = getPromosFromPromoEntities(promoEntities);
        return promos;
    }

    @Override
    public List<Promo> getPromos() {
        return getPromosFromPromoEntities(promoRepository.findAll());
    }


    private Promo getPromoFromPromoEntity(PromoEntity promoEntity) {
        Promo promo = Promo.builder()
                .id(promoEntity.getId())
                .promoType(promoEntity.getPromoType())
                .value(promoEntity.getValue())
                .minimumPrice(promoEntity.getMinimumPrice())
                .maximumDiscount(promoEntity.getMaximumDiscount())
                .maximumAttempt(promoEntity.getMaximumAttempt())
                .build();
        return promo;
    }

    @Override
    public Promo createPromo(Promo promo) {
        PromoEntity promoEntity = PromoEntity.builder()
                .promoType(promo.getPromoType())
                .value(promo.getValue())
                .minimumPrice(promo.getMinimumPrice())
                .maximumDiscount(promo.getMaximumDiscount())
                .maximumAttempt(promo.getMaximumAttempt())
                .build();
        promoEntity = promoRepository.save(promoEntity);
        promo = getPromoFromPromoEntity(promoEntity);
        return promo;
    }
}
