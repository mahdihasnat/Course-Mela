package io.coursemela.coursemela.payment.controller;

import io.coursemela.coursemela.payment.model.Promo;
import io.coursemela.coursemela.payment.service.PromoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("promo")
public class PromoController {

    @Autowired
    PromoService promoService;

    @GetMapping("/")
    List<Promo> getPromos() {
        return promoService.getPromos();
    }

    @PostMapping("create")
    Promo createPromo(@RequestBody Promo promo) {
        return promoService.createPromo(promo);
    }

    @GetMapping("my")
    List<Promo> getMyPromo(@RequestParam Long studentId) {
        return promoService.getPromosOfStudent(studentId);
    }
}
