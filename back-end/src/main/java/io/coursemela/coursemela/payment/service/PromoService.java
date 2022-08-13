package io.coursemela.coursemela.payment.service;

import io.coursemela.coursemela.payment.model.Promo;

import java.util.List;

public interface PromoService {
    public List<Promo> getPromosOfStudent(Long studentId);

    public List<Promo> getPromos();

    public Promo createPromo(Promo promo);


}
