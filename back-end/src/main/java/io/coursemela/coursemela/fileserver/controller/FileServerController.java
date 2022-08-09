package io.coursemela.coursemela.fileserver.controller;


import io.coursemela.coursemela.fileserver.payload.UploadFileResponse;
import io.coursemela.coursemela.fileserver.service.FileServerService;
import io.coursemela.coursemela.fileserver.service.FileStorageService;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
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

import static java.lang.Math.min;

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


    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        return Arrays.stream(files)
                .map(this::uploadFile)
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/image",
            produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Object> getFile(@PathParam("fileId") String fileId) throws IOException {

        Resource resource = fileServerService.getFileByteArray(fileId);

        HttpHeaders headers = new HttpHeaders();

        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", resource.getFilename()));
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");


        ResponseEntity<Object> responseEntity = ResponseEntity.ok().headers(headers).contentLength(resource.contentLength()).body(resource);

        return responseEntity;
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


//    @GetMapping("{name}")
//    public ResponseEntity<Resource> getVideoByName(@PathVariable("name") String name){
//        return ResponseEntity
//                .ok(new ByteArrayResource(videoService.getVideo(name).getData()));
//    }

//    @GetMapping(value = "/video"
//    )
//    public ResponseEntity<Resource> getVideoById(@PathVariable("videoId") String videoId){
//        return ResponseEntity.ok(
//                new ByteArrayResource(videoServerService.getVideo(videoId).getData())
//        );
//    }


//    ResponseBody byte[] getImageFile(){
//        return null;
//    }


//    @GetMapping("/video")
//    ResponseEntity<UrlResource> getFullVideo() throws MalformedURLException {
//        val video = new UrlResource("file:/mnt/disc/Course-Mela/back-end/file-bucket/video/toystory.mp4");
//        System.out.println( "video type " +
//                MediaTypeFactory
//                        .getMediaType(video)
//        );
//        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
//                .contentType(MediaTypeFactory
//                        .getMediaType(video)
//                        .orElse(MediaType.APPLICATION_OCTET_STREAM))
//                .body(video);
//    }


    @GetMapping("/video")
    ResponseEntity<ResourceRegion> getVideo(@RequestHeader HttpHeaders headers) throws IOException {
        System.out.println(headers);

        UrlResource video = new UrlResource("file:/mnt/disc/Course-Mela/back-end/file-bucket/video/toystory.mp4");

        val region = resourceRegion(video, headers);
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

    private ResourceRegion resourceRegion(UrlResource video, HttpHeaders headers) throws IOException {
        val contentLength = video.contentLength();

        try {
            HttpRange range = headers.getRange().get(0);
            val start = range.getRangeStart(contentLength);
            val end = range.getRangeEnd(contentLength);
            val rangeLength = min(1024 * 1024, end - start + 1);
            log.info(" video range : " + start + " -> " + rangeLength + " out of " + contentLength);
            return new ResourceRegion(video, start, rangeLength);

        } catch (IndexOutOfBoundsException e) {
            log.warn("no range for the video");
            val rangeLength = min(1024 * 1024, contentLength);
            return new ResourceRegion(video, 0, rangeLength);
        }


    }


}
