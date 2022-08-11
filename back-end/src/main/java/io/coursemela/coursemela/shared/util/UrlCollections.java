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

    public static String getVideoServerUrl(String id){
        /// NOT TESTED
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("/fileserver/video/" + id + ".mp4").toUriString();
    }
}
