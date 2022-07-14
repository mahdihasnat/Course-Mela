package io.coursemela.coursemela.shared.entity;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class AuthenticateResponse {
    private  String jwt;


    public AuthenticateResponse(String jwt) {
        this.jwt = jwt;
    }

    public AuthenticateResponse(){}

    public String getJwt() {
        return jwt;
    }
}
