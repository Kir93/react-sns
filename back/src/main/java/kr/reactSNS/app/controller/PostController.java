package kr.reactSNS.app.controller;

import java.util.Collection;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.Beans.CommentBean;
import kr.reactSNS.app.Beans.HashtagBean;
import kr.reactSNS.app.Beans.PostBean;
import kr.reactSNS.app.mapper.CommentMapper;
import kr.reactSNS.app.mapper.HashtagMapper;
import kr.reactSNS.app.mapper.PostMapper;

@RestController
@RequestMapping("/api/post/*")
public class PostController {

    @Autowired
    private PostMapper pm;

    @Autowired
    private HashtagMapper hm;

    @Autowired
    private CommentMapper cm;

    @PostMapping("/")
    public Object Post(@RequestBody PostBean pb, HttpSession session) {
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
                HashtagBean hb = hm.CheckHashtag(hashtags[x]);
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
            System.err.println(e);
            return e;
        }
    }

    @GetMapping("/{id}/comments")
    public Object LoadComments(@PathVariable int id){
        try {
            PostBean post = pm.SelectPost(id);
            if(post == null){
                return "존재하지 않는 포스트입니다.";
            }
            Collection<CommentBean> comments = cm.LoadComments(id);
            return comments;
        } catch (Exception e) {
            System.err.println(e);
            return e;
        }
    }

    @PostMapping("/{id}/comment")
    public Object AddComment(@PathVariable int id, HttpSession session){
        try {
            Object user = (Object) session.getAttribute("rslc");
            if(user == null){
                return "로그인이 필요합니다.";
            }
            PostBean post = pm.SelectPost(id);
            if(post == null){
                return "존재하지 않는 포스트입니다.";
            }
            CommentBean comment = new CommentBean();
            cm.AddComment(comment);
            return comment;
        } catch (Exception e) {
            System.err.println(e);
            return e;
        }
    }
}
