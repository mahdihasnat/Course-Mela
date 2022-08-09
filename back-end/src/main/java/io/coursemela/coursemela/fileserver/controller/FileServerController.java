package io.coursemela.coursemela.fileserver.controller;


import io.coursemela.coursemela.fileserver.payload.UploadFileResponse;
import io.coursemela.coursemela.fileserver.service.FileServerService;
import io.coursemela.coursemela.fileserver.service.FileStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.PathParam;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/fileserver")
@Slf4j
public class FileServerController {
    @Autowired
    FileServerService fileServerService;

    @Autowired
    FileStorageService fileStorageService;
//    @Autowired
//    VideoServerService videoServerService;


    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/fileserver/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadVideo")
    public UploadFileResponse uploadVideo(@RequestParam("file") MultipartFile file, @RequestParam("fileName") String fileName) {
        fileName = fileStorageService.storeFile(file, fileName);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/fileserver/video/")
                .path(fileName)
                .toUriString();
        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }


    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        return Arrays.stream(files)
                .map(this::uploadFile)
                .collect(Collectors.toList());
    }


    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource

        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }


    @GetMapping(value = "/image")
    public ResponseEntity<Object> getFile(@PathParam("fileId") String fileId) throws IOException {
//        Resource resource = fileServerService.getFileByteArray(fileId);
        Resource resource = fileStorageService.loadFileAsResource(fileId);
        ResponseEntity<Object> responseEntity = ResponseEntity.ok()
//                .headers(headers)
                .contentType(MediaTypeFactory
                        .getMediaType(resource)
                        .orElse(MediaType.APPLICATION_OCTET_STREAM))
                .contentLength(resource.contentLength())
                .body(resource);

        return responseEntity;
    }

    @GetMapping("/video/{fileName}")
    ResponseEntity<ResourceRegion> getVideo(@RequestHeader HttpHeaders headers, @PathVariable("fileName") String fileName) throws IOException {
//        System.out.println(headers);

//        UrlResource video = new UrlResource("file:/mnt/disc/Course-Mela/back-end/file-bucket/video/toystory.mp4");
        Resource video = fileStorageService.loadFileAsResource(fileName);
        ResourceRegion region = fileStorageService.loadResourceAsResourceRegion(headers, video);
        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                .contentType(MediaTypeFactory
                        .getMediaType(video)
                        .orElse(MediaType.APPLICATION_OCTET_STREAM))
                .body(region);
    }

//    @GetMapping("/video/")
//    ResponseEntity<ResourceRegion> getVideo(
//                 @RequestHeader  HttpHeaders headers) throws IOException {
////        val video = UrlResource("file:$videoLocation/$name")
//        val video = new UrlResource("file:/mnt/disc/Course-Mela/back-end/file-bucket/video/toystory.mp4");
//
//
//        log.info(String.valueOf(headers));
//        return null;
////        val region = resourceRegion(video, headers);
//
////        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
////                .contentType(MediaTypeFactory
////                        .getMediaType(video)
////                        .orElse(MediaType.APPLICATION_OCTET_STREAM))
////                .body(region);
//    }


}
