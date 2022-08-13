package io.coursemela.coursemela.shared.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticateResponse {
    private String jwtToken;


    public AuthenticateResponse(String jwt) {
        this.jwtToken = jwt;
    }

    public AuthenticateResponse() {
    }

    public String getJwtToken() {
        return jwtToken;
    }
}
