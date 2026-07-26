package net.raghav.journalApp.Controller;

import net.raghav.journalApp.entity.User;
import net.raghav.journalApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
public class publicController {

    @Autowired
    private UserService userService;

    @GetMapping("/health-check")
    public String HealthCheckController() {
        return "OK";
    }

    @PostMapping("/create-user")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        try {
            userService.saveNewUSer(user);
            return new ResponseEntity<>("User created successfully", org.springframework.http.HttpStatus.CREATED);
        } catch (org.springframework.dao.DuplicateKeyException e) {
            return new ResponseEntity<>("Username already exists", org.springframework.http.HttpStatus.CONFLICT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error creating user", org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
