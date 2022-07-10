package  io.cousemela.coursemela.status;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ServerStatusController {


    @RequestMapping("/status")
    public String getServerStatus() {
        return "Server is up and running";
    }
}