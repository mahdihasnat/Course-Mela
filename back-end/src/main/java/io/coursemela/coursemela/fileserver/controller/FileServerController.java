package io.coursemela.coursemela.fileserver.controller;


import io.coursemela.coursemela.fileserver.service.FileServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/fileserver")
public class FileServerController {
    @Autowired
    FileServerService fileServerService;




    @GetMapping(value="/{fileId}",
            produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Object> getFile(@PathVariable("fileId") String fileId ) throws IOException {

        Resource resource = fileServerService.getFileByteArray(fileId);

        HttpHeaders headers = new HttpHeaders();

        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", resource.getFilename()));
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");


        ResponseEntity<Object>responseEntity = ResponseEntity.ok().headers(headers).contentLength(resource.contentLength()).body(resource);

        return responseEntity;
    }


//    ResponseBody byte[] getImageFile(){
//        return null;
//    }

}
