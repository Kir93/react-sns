package kr.reactSNS.app.controller;

import java.util.Collection;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.Beans.PostBean;
import kr.reactSNS.app.Beans.UserBean;
import kr.reactSNS.app.mapper.UserMapper;

@RestController
@RequestMapping("/api/user/*")
public class UserController {

    @Autowired
    private UserMapper um;

    @GetMapping("/")
    public Object LoadUser(HttpServletResponse res, HttpSession session) {
        try {
            Object userId = session.getAttribute("rslc");
            if (userId == null) {
                Cookie rslc = new Cookie("rslc", null);
                rslc.setMaxAge(0);
                rslc.setPath("/");
                res.addCookie(rslc);
                return "로그인이 필요합니다.";
            }
            UserBean user = um.checkUser((int) userId);
            user.setPosts(user.getPost() != null ? user.getPost().length : 0);
            user.setFollowings(user.getFollowing() != null ? user.getFollowing().length : 0);
            user.setFollowers(user.getFollower() != null ? user.getFollower().length : 0);
            user.setPost("");
            user.setFollowing("");
            user.setFollower("");
            user.setPassword("");
            return user;
        } catch (Exception e) {
            System.err.println(e);
            return e;
        }
    }

    @PostMapping("/checkId")
    public Object CheckId(@RequestBody UserBean ub) {
        try {
            Object result = um.checkUserId(ub.getUserId());
            if (result == null) {
                return "중복된 아이디가 없습니다.";
            }
            return (int) result;
        } catch (Exception e) {
            System.err.println(e);
            return e;
        }
    }

    @PostMapping("/login")
    public Object Login(HttpSession session, @RequestBody UserBean ub) {
        try {
            Object userId = um.checkUserId(ub.getUserId());
            if (userId != null) {
                UserBean user = um.checkUser((int) userId);
                if (BCrypt.checkpw(ub.getPassword(), user.getPassword())) {
                    user.setPassword("");
                    session.setAttribute("rslc", user.getId());
                    user.setPosts(user.getPost() != null ? user.getPost().length : 0);
                    user.setFollowings(user.getFollowing() != null ? user.getFollowing().length : 0);
                    user.setFollowers(user.getFollower() != null ? user.getFollower().length : 0);
                    user.setPost("");
                    user.setFollowing("");
                    user.setFollower("");
                    user.setPassword("");
                    return user;
                }
            }
            return "아이디와 패스워드를 재확인 후 실행하세요.";
        } catch (Exception e) {
            System.err.println(e);
            return e;
        }
    }

    @PostMapping("/")
    public Object Signup(@RequestBody UserBean ub) {
        try {
            ub.setPassword(BCrypt.hashpw(ub.getPassword(), BCrypt.gensalt()));
            return um.signUp(ub);
        } catch (Exception e) {
            System.err.println(e);
            return e;
        }
    }

    @GetMapping("/{id}")
    public Object LoadOtherUser(@PathVariable int id) {
        try {
            UserBean user = um.checkUser(id);
            if(user == null){
                return "존재하지 않는 사용자입니다.";
            }
            user.setPosts(user.getPost() != null ? user.getPost().length : 0);
            user.setFollowings(user.getFollowing() != null ? user.getFollowing().length : 0);
            user.setFollowers(user.getFollower() != null ? user.getFollower().length : 0);
            user.setPost("");
            user.setFollowing("");
            user.setFollower("");
            user.setPassword("");
            return user;
        } catch (Exception e) {
            System.err.println(e);
            return e;
        }
    }

    @GetMapping("/{id}/posts")
    public Object CheckUserId(@PathVariable int id) {
        try {
            UserBean user = um.checkUser(id);
            if(user==null){
                return "존재하지 않는 사용자입니다.";
            }
            Collection<PostBean> loadUserPosts = um.LoadUserPosts(id);
            return loadUserPosts;
        } catch (Exception e) {
            System.err.println(e);
            return e;
        }
    }
}