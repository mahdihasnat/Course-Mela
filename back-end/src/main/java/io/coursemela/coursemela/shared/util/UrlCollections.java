package io.coursemela.coursemela.shared.util;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class UrlCollections {

    public static String getBaseUrl() {
        return
                ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
    }

    public static String getFileServerUrl() {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("/fileserver/").toUriString();
    }
}
