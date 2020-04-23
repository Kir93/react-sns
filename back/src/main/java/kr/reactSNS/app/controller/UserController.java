package kr.reactSNS.app.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.Beans.UserBean;
import kr.reactSNS.app.mapper.UserMapper;

@RestController
@RequestMapping("/api/user/*")
public class UserController {

    @Autowired
    private UserMapper um;

    @GetMapping("/")
    public UserBean LoadUser(HttpServletResponse res, HttpSession session) {
        try {
            int userId = (int) session.getAttribute("rslc");
            UserBean user = um.checkUser(userId);
            if (user == null) {
                Cookie rslc = new Cookie("rslc", null);
                rslc.setMaxAge(0);
                rslc.setPath("/");
                res.addCookie(rslc);
            }
            return user;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @PostMapping("/checkId")
    public int CheckId(@RequestBody UserBean ub) {
        try {
            int result = um.checkUserId(ub.getUserId());
            return result;
        } catch (Exception e) {
            System.out.println(e);
            return 0;
        }
    }

    @PostMapping("/login")
    public UserBean Login(HttpSession session, @RequestBody UserBean ub) {
        try {
            int result = um.checkUserId(ub.getUserId());
            UserBean user = um.checkUser(result);
            if (user != null) {
                if (BCrypt.checkpw(ub.getPassword(), user.getPassword())) {
                    user.setPassword("");
                    session.setAttribute("rslc", user.getId());
                    return user;
                }
            }
            return null;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
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
            return 1;
        } catch (Exception e) {
            System.out.println(e);
            return e;
        }
    }
}