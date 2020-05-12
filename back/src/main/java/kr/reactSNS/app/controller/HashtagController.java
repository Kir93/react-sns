package kr.reactSNS.app.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.beans.HashtagBean;
import kr.reactSNS.app.beans.PostBean;
import kr.reactSNS.app.mapper.HashtagMapper;
import kr.reactSNS.app.mapper.PostMapper;

@RestController
@RequestMapping("/api/hashtag/*")
public class HashtagController {

    @Autowired
    HashtagMapper hm;

    @Autowired
    PostMapper pm;

    @GetMapping("/{tag}")
    public ResponseEntity<Object> hashtagPosts(@RequestParam int lastId, @PathVariable String tag) {
        try {
            String where = "WHERE ph.HashtagId=#{HashtagId} AND p.RetweetId IS NULL AND p.delYn='N'";
            if(lastId != 0){ 
                where = "WHERE ph.HashtagId=#{HashtagId} AND p.RetweetId IS NULL AND p.delYn='N' AND p.id <" + lastId;
            }
            HashtagBean hb = hm.CheckHashtag(tag);
            Collection<PostBean> loadHashtagPosts = hm.LoadHashtagPosts(hb.getId(), where);
            for(PostBean p : loadHashtagPosts){
                if(p.getRetweetId() != 0){
                    p.setRetweet(pm.SelectRetweetPost(p.getId()));
                }
            }
            return ResponseEntity.ok(loadHashtagPosts);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }
}