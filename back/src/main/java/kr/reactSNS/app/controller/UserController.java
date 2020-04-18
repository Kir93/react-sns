package kr.reactSNS.app.controller;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.Beans.UserBean;
import kr.reactSNS.app.mapper.UserMapper;

@RestController
@RequestMapping("/api/user/*")
public class UserController {

    @Autowired
    private UserMapper um;

    @GetMapping("/")
    public String User() {
        return "User";
    }

    @PostMapping("/")
    public int Signup(@RequestBody UserBean ub) {
        try {
            ub.setPassword(BCrypt.hashpw(ub.getPassword(), BCrypt.gensalt()));
            return um.signUp(ub);
            // return Integer.toString(result);
        } catch (Exception e) {
            System.out.println(e);
            return 0;
        }
    }

    @GetMapping("/test")
    public Object CheckUserId(String userId) {
        try {
            System.out.println(um.checkUserId(userId));
            return 1;
        } catch (Exception e) {
            System.out.println(e);
            return e;
        }
    }
}