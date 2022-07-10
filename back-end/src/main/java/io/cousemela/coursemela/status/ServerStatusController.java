package  io.cousemela.coursemela.status;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ServerStatusController {


    @RequestMapping("/status")
    public String getServerStatus() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        return "Server is up and running @" + dateFormat.format(date) ;
    }
}