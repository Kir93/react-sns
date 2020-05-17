package kr.reactSNS.app.controller;

import java.util.Collection;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.beans.FollowBean;
import kr.reactSNS.app.beans.PostBean;
import kr.reactSNS.app.beans.UserBean;
import kr.reactSNS.app.mapper.UserMapper;

@RestController
@RequestMapping("/api/user/*")
public class UserController {

    @Autowired
    private UserMapper um;

    @GetMapping("/")
    public ResponseEntity<Object> LoadUser(HttpServletResponse res, HttpSession session) {
        try {
            Object userId = session.getAttribute("rslc");
            System.out.println(userId);
            if (userId == null) {
                Cookie rslc = new Cookie("rslc", null);
                rslc.setMaxAge(0);
                rslc.setPath("/");
                res.addCookie(rslc);
                return ResponseEntity.status(403).body("로그인 후 사용하세요.");
            }
            UserBean user = um.checkUser((int) userId);
            user.setPosts(user.getPost() != null ? user.getPost().length : 0);
            user.setFollowings(user.getFollowing() != null ? user.getFollowing().length : 0);
            user.setFollowers(user.getFollower() != null ? user.getFollower().length : 0);
            user.setPassword("");
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @PostMapping("/checkId")
    public ResponseEntity<Object> CheckId(@RequestBody UserBean ub) {
        try {
            Object result = um.checkUserId(ub.getUserId());
            if (result == null) {
                return ResponseEntity.ok(0);
            }
            return ResponseEntity.ok((int) result);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> Login(HttpSession session, @RequestBody UserBean ub) {
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
                    user.setPassword("");
                    return ResponseEntity.ok(user);
                }
            }
            return ResponseEntity.status(401).body("아이디와 패스워드를 확인하시고 다시 시도하세요.");
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @PostMapping("/")
    public ResponseEntity<Object> Signup(@RequestBody UserBean ub) {
        try {
            ub.setPassword(BCrypt.hashpw(ub.getPassword(), BCrypt.gensalt()));
            return ResponseEntity.ok(um.signUp(ub));
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> LoadOtherUser(@PathVariable int id) {
        try {
            UserBean user = um.checkUser(id);
            if (user == null) {
                return ResponseEntity.status(401).body("존재하지 않는 사용자입니다.");
            }
            user.setPosts(user.getPost() != null ? user.getPost().length : 0);
            user.setFollowings(user.getFollowing() != null ? user.getFollowing().length : 0);
            user.setFollowers(user.getFollower() != null ? user.getFollower().length : 0);
            user.setPost("");
            user.setFollowing("");
            user.setFollower("");
            user.setPassword("");
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @GetMapping("/{id}/posts")
    public ResponseEntity<Object> CheckUserId(@RequestParam int lastId, @PathVariable int id, HttpSession session) {
        try {
            String where = "WHERE u.id=#{id} AND p.delYn = 'N' AND p.RetweetId IS NULL";
            if(lastId != 0){ 
                where = "WHERE u.id=#{id} AND p.delYn = 'N' AND p.RetweetId IS NULL AND p.id <" + lastId;
            }
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null && id == 0) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            if(id == 0){
                id = (int) userId;
            }
            UserBean user = um.checkUser(id);
            if (user == null) {
                return ResponseEntity.status(401).body("존재하지 않는 사용자입니다.");
            }
            Collection<PostBean> loadUserPosts = um.LoadUserPosts(id, where);
            return ResponseEntity.ok(loadUserPosts);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @PostMapping("/{id}/follow")
    public ResponseEntity<Object> Follow(@PathVariable int id, HttpSession session){
        try {
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            um.Follow((int) userId, id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @GetMapping("/{id}/followings")
    public ResponseEntity<Object> LoadFollowings(@PathVariable int id, HttpSession session, @RequestParam int offset, @RequestParam int limit){
        try {
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            if(id == 0){
                id = (int) userId;
            }
            Collection<FollowBean> followings = um.LoadFollowings(id, offset, limit);
            return ResponseEntity.ok(followings);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @GetMapping("/{id}/followers")
    public ResponseEntity<Object> LoadFollowers(@PathVariable int id, HttpSession session, @RequestParam int offset, @RequestParam int limit){
        try {
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            if(id == 0){
                id = (int) userId;
            }
            Collection<FollowBean> followers = um.LoadFollowers(id, offset, limit);
            return ResponseEntity.ok(followers);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @DeleteMapping("/{id}/follower")
    public ResponseEntity<Object> RemoveFollower(@PathVariable int id, HttpSession session){
        try {
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            um.RemoveFollower((int) userId, id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @DeleteMapping("/{id}/follow")
    public ResponseEntity<Object> Unfollow(@PathVariable int id, HttpSession session){
        try {
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            um.Unfollow((int) userId, id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @PatchMapping("/nickname")
    public ResponseEntity<Object> EditNickname(@RequestBody UserBean ub, HttpSession session){
        try {
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            if(!um.EditNickname(ub.getNickname(), (int) userId)){
                return ResponseEntity.status(403).body("문제가 발생했습니다.");
            }
            return ResponseEntity.ok(ub.getNickname());
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }
}