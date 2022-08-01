package io.coursemela.coursemela.user.model;

import javax.persistence.Embeddable;

import io.coursemela.coursemela.user.entity.AddressEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
public class Address {

    private String country;
    private String zilla;
    private String upazila;

    private String postcode;
    private String street;
    private String housenumber;

    public Address(AddressEntity address)
    {
        this.country = address.getCountry();
        this.zilla = address.getZilla();
        this.upazila = address.getUpazila();
        this.postcode = address.getPostcode();
        this.street = address.getStreet();
        this.housenumber = address.getHousenumber();
    }
}
