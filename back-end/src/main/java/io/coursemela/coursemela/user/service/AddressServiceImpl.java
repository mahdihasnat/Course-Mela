package io.coursemela.coursemela.user.service;

import io.coursemela.coursemela.user.entity.AddressEntity;
import io.coursemela.coursemela.user.model.Address;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {
    @Override
    public Address getAddressFromAddressEntity(AddressEntity addressEntity) {
        if (addressEntity == null)
            return Address.builder().build();
        else
            return Address.builder()
                    .country(addressEntity.getCountry())
                    .zilla(addressEntity.getZilla())
                    .upazila(addressEntity.getUpazila())
                    .postcode(addressEntity.getPostcode())
                    .street(addressEntity.getStreet())
                    .housenumber(addressEntity.getHousenumber())
                    .build();
    }
}
