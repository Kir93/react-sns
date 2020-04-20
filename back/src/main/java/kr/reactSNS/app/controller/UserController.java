package kr.reactSNS.app.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.ui.Model;
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
    public UserBean LoadUser(Model model, HttpSession session) {
        Object userId = session.getAttribute("rslc");
        System.out.println(userId);
        UserBean user = um.checkUser((String) userId);
        return user;
    }

    @PostMapping("/login")
    public UserBean Login(HttpSession session, @RequestBody UserBean ub) {
        UserBean user = um.checkUser(ub.getUserId());
        if (user != null) {
            if (BCrypt.checkpw(ub.getPassword(), user.getPassword())) {
                user.setPassword("");
                session.setAttribute("rslc", user.getUserId());
                return user;
            }
        }
        return user;
    }

    // @PostMapping("/logout")
    // public void Logout(HttpSession session) {
    // session.invalidate();
    // }

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