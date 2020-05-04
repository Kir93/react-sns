package kr.reactSNS.app.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.beans.PostBean;
import kr.reactSNS.app.mapper.PostsMapper;

@RestController
@RequestMapping("/api/posts/*")
public class PostsController {

    @Autowired
    PostsMapper pm;

    @GetMapping("/")
    public ResponseEntity<Object> Posts() {
        try {
            Collection<PostBean> loadPosts = pm.LoadMainPosts();
            return ResponseEntity.ok(loadPosts);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }
}