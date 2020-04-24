package kr.reactSNS.app.controller;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.Beans.HashtagBean;
import kr.reactSNS.app.Beans.PostBean;
import kr.reactSNS.app.mapper.PostMapper;

@RestController
@RequestMapping("/api/post/*")
public class PostController {

    @Autowired
    private PostMapper pm;

    @PostMapping("/")
    public PostBean Post(@RequestBody PostBean pb, HttpSession session) {
        try {
            final String regex = "#[^\\s]+";
            final String string = pb.getContent();
            final Pattern pattern = Pattern.compile(regex);
            final Matcher matcher = pattern.matcher(string);
            int size = pb.getContent().split("#").length;
            String[] hashtags = new String[size];
            int x = 0;
            int userId = (int) session.getAttribute("rslc");
            pb.setUserId(userId);
            pm.AddPost(pb);
            int postId = pb.getId();
            while (matcher.find()) {
                hashtags[x] = matcher.group(0).substring(1).toLowerCase();
                HashtagBean hb = pm.CheckHashtag(hashtags[x]);
                hb.setName(hashtags[x]);
                if (hb.getId() == 0) {
                    pm.InsertHashtag(hb);
                }
                pm.AddPostHashtag(postId, hb.getId());
                x++;
            }
            PostBean newPost = pm.SelectPost(postId);
            return newPost;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
}
