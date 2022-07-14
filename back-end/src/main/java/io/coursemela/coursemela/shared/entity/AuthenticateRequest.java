package io.coursemela.coursemela.shared.entity;


import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class AuthenticateRequest {


    private String userName;
    private  String password;

    public AuthenticateRequest(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public AuthenticateRequest(){}

//

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "AuthenticateRequest{" +
                "userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
