package io.coursemela.coursemela.user.entity;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.Entity;

import io.coursemela.coursemela.user.model.Address;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
public class AddressEntity {

    private String country;
    private String zilla;
    private String upazila;

    private String postcode;
    private String street;
    private String housenumber;
    
    public AddressEntity(Address address)
    {
        this.country = address.getCountry();
        this.zilla = address.getZilla();
        this.upazila = address.getUpazila();
        this.postcode = address.getPostcode();
        this.street = address.getStreet();
        this.housenumber = address.getHousenumber();    
    }

}   
