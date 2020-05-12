package kr.reactSNS.app.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.beans.PostBean;
import kr.reactSNS.app.mapper.PostMapper;
import kr.reactSNS.app.mapper.PostsMapper;

@RestController
@RequestMapping("/api/posts/*")
public class PostsController {

    @Autowired
    PostMapper pom;

    @Autowired
    PostsMapper pm;

    @GetMapping("/")
    public ResponseEntity<Object> Posts(@RequestParam int lastId) {
        try {
            String where = "WHERE p.delYn = 'N'";
            if(lastId != 0){ 
                where = "WHERE p.delYn = 'N' AND p.id <" + lastId;
            }
            Collection<PostBean> loadPosts = pm.LoadMainPosts(where);
            for(PostBean p : loadPosts){
                if(p.getRetweetId() != 0){
                    p.setRetweet(pom.SelectRetweetPost(p.getId()));
                    if(p.getRetweet().get("src") != null){
                        PostBean setRetweetSrc = new PostBean();
                        setRetweetSrc.setSrc((String) p.getRetweet().get("src"));
                        p.getRetweet().put("src", setRetweetSrc.getSrc());
                    }
                }
            }
            return ResponseEntity.ok(loadPosts);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }
}