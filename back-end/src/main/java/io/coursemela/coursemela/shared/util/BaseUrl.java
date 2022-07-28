package io.coursemela.coursemela.shared.util;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class BaseUrl {

    public static String getBaseUrl() {
        return
                ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
    }
}
