package kr.reactSNS.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
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

    @PostMapping("/login")
    public UserBean Login(@RequestBody UserBean ub) {
        System.out.println(ub.getUserId());
        System.out.println(ub.getPassword());
        UserBean user = um.checkUser(ub.getUserId());
        System.out.println(BCrypt.checkpw(ub.getPassword(), user.getPassword()));
        // if (BCrypt.checkpw(password, um.checkUserPassword(userId))) {
        System.out.println("로그인됨?");
        // }
        user.setPassword("");
        return user;
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
        userId = "test12";
        try {
            System.out.println(um.checkUserId(userId));
            // System.out.println(BCrypt.checkpw("a1111111!",
            // um.checkUserPassword(userId)));
            return 1;
        } catch (Exception e) {
            System.out.println(e);
            return e;
        }
    }
}