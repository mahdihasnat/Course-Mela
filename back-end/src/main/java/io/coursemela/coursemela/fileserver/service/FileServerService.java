package io.coursemela.coursemela.fileserver.service;

import io.coursemela.coursemela.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.nio.file.Path;

@Service
public class FileServerService {
    @Autowired
    StorageService storageService;

    public Resource getFileByteArray(String fileId) {
        Path path = storageService.load(fileId);

        Resource resource = storageService.loadAsResource(fileId);

        System.out.println(path);

        System.out.println(resource);

        return resource;
    }
}
