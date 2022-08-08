package io.coursemela.coursemela.user.model;

import javax.persistence.Embeddable;

import io.coursemela.coursemela.user.entity.AddressEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.extern.slf4j.XSlf4j;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@Embeddable
@NoArgsConstructor
@Slf4j
public class Address {

    private String country;
    private String zilla;
    private String upazila;

    private String postcode;
    private String street;
    private String housenumber;

    @Autowired


    public Address(AddressEntity address)
    {
        try {
            this.country = address.getCountry();
            this.zilla = address.getZilla();
            this.upazila = address.getUpazila();
            this.postcode = address.getPostcode();
            this.street = address.getStreet();
            this.housenumber = address.getHousenumber();
        } catch (NullPointerException e) {
            log.warn("null AddressEntity to null Address");
        }

    }
}
