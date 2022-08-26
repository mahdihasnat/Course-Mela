package io.coursemela.coursemela.user.entity;

import io.coursemela.coursemela.user.model.Address;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.Embeddable;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@Slf4j
public class AddressEntity {

    private String country = "Bangladesh";
    private String zilla = "Dhaka";
    private String upazila = "Shahbag";

    private String postcode = "1201";
    private String street = "12";
    private String housenumber = "Ahsanullah Hall";

    public AddressEntity(Address address) {
        try {
            this.country = address.getCountry();
            this.zilla = address.getZilla();
            this.upazila = address.getUpazila();
            this.postcode = address.getPostcode();
            this.street = address.getStreet();
            this.housenumber = address.getHousenumber();
        } catch (NullPointerException e) {
            log.warn("null Address to null AddressEntity");
        }
    }

}   
