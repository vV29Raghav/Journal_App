package net.raghav.journalApp.Controller;

import net.raghav.journalApp.entity.JournalEntry;
import net.raghav.journalApp.entity.User;
import net.raghav.journalApp.repository.UserRepository;
import net.raghav.journalApp.services.JournalEntryService;
import net.raghav.journalApp.services.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    UserRepository userRepository;

//    @GetMapping
//    public List<User> getAllUser() {
//        return  userService.getAll();
//    }



    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        //SecutityContextHolder holds the credentials of authenticated user automatically
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
       User userInDb = userService.findByUserName(userName);
       if(userInDb != null) {
           userInDb.setUserName(user.getUserName());
           userInDb.setPassword(user.getPassword());
           userService.saveNewUSer(userInDb);
       }
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @DeleteMapping
    public ResponseEntity<?> deleteUser() {
        //SecutityContextHolder holds the credentials of authenticated user automatically
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userRepository.deleteByUserName(authentication.getName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
