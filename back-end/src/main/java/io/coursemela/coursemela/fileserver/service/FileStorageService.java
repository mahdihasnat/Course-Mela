package io.coursemela.coursemela.fileserver.service;

import io.coursemela.coursemela.fileserver.exeption.FileStorageException;
import io.coursemela.coursemela.fileserver.exeption.MyFileNotFoundException;
import io.coursemela.coursemela.fileserver.property.FileStorageProperties;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRange;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

import static java.lang.Math.min;

@Service
@Slf4j
public class FileStorageService {

    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
                    ex);
        }
    }

    public String storeFile(MultipartFile file, String fileName) {
        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        return storeFile(file, fileName);
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }

    public ResourceRegion loadResourceAsResourceRegion(HttpHeaders headers, Resource video) throws IOException {
        return resourceRegion(video, headers);
    }

    private ResourceRegion resourceRegion(Resource video, HttpHeaders headers) throws IOException {
        val contentLength = video.contentLength();

        try {
            HttpRange range = headers.getRange().get(0);
            val start = range.getRangeStart(contentLength);
            val end = range.getRangeEnd(contentLength);
            val rangeLength = min(1024 * 1024, end - start + 1);
            // log.info(" file range : " + start + " -> " + rangeLength + " out of " +
            // contentLength);
            return new ResourceRegion(video, start, rangeLength);

        } catch (IndexOutOfBoundsException e) {
            log.warn("no range for the video");
            val rangeLength = min(1024 * 1024, contentLength);
            return new ResourceRegion(video, 0, rangeLength);
        }

    }
}
