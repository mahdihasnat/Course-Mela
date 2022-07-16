package io.coursemela.coursemela.user.context;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserContext {
    public static String getUserName() throws Exception
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken)
            throw new Exception("Not Logged In");
        return authentication.getName();
    }
}
