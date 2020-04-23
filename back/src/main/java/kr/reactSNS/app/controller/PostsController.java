package kr.reactSNS.app.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.Beans.PostBean;
import kr.reactSNS.app.mapper.PostsMapper;

@RestController
@RequestMapping("/api/posts/*")
public class PostsController {

    @Autowired
    PostsMapper pm;

    @GetMapping("/")
    public Collection<PostBean> Posts() {
        try {
            Collection<PostBean> loadPosts = pm.LoadMainPosts();
            return loadPosts;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
}