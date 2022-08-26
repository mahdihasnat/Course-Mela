package io.coursemela.coursemela.user.service;

import io.coursemela.coursemela.user.entity.AddressEntity;
import io.coursemela.coursemela.user.model.Address;

public interface AddressService {
    public Address getAddressFromAddressEntity(AddressEntity addressEntity);
}
