package io.coursemela.coursemela.user.entity;

import io.coursemela.coursemela.user.model.Address;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.Embeddable;

@Data
@Embeddable
@NoArgsConstructor
@Slf4j
public class AddressEntity {

    private String country;
    private String zilla;
    private String upazila;

    private String postcode;
    private String street;
    private String housenumber;
    
    public AddressEntity(Address address)
    {
        try
        {
            this.country = address.getCountry();
            this.zilla = address.getZilla();
            this.upazila = address.getUpazila();
            this.postcode = address.getPostcode();
            this.street = address.getStreet();
            this.housenumber = address.getHousenumber();
        }
        catch (NullPointerException e)
        {
            log.warn("null Address to null AddressEntity");
        }
    }

}   
