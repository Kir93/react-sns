package kr.reactSNS.app.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<Object> Post(@RequestBody PostBean pb, HttpSession session) {
        try {
            final String regex = "#[^\\s]+";
            final String string = pb.getContent();
            final Pattern pattern = Pattern.compile(regex);
            final Matcher matcher = pattern.matcher(string);
            int size = pb.getContent().split("#").length;
            String[] hashtags = new String[size];
            int x = 0;
            Object userId = session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            pb.setUserId((int) userId);
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
            return ResponseEntity.ok(newPost);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<Object> LoadComments(@PathVariable int id) {
        try {
            PostBean post = pm.SelectPost(id);
            if (post == null) {
                return ResponseEntity.status(401).body("존재하지 않는 포스트입니다.");
            }
            Collection<CommentBean> comments = cm.LoadComments(id);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<Object> AddComment(@RequestBody CommentBean cb, @PathVariable int id, HttpSession session) {
        try {
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            PostBean post = pm.SelectPost(id);
            if (post == null) {
                return ResponseEntity.status(403).body("존재하지 않는 포스트입니다.");
            }
            cb.setUserId((int) userId);
            cb.setPostId(id);
            System.out.println(cb.getPostId());
            cm.AddComment(cb);
            CommentBean comment = cm.LoadComment(cb);
            return ResponseEntity.ok(comment);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @PostMapping("/images")
    public ResponseEntity<Object> AddImages(@RequestParam("image") List<MultipartFile> images,
            HttpServletRequest request) {
        try {
            List<String> list = new ArrayList<String>();
            String baseDir = System.getProperty("user.dir") + "/back/src/main/resources/static/uploads/";
            System.out.println(baseDir);
            for (MultipartFile image : images) {
                String ext = FilenameUtils.getExtension(image.getOriginalFilename());
                System.out.println(ext);
                String basename = FilenameUtils.getBaseName(image.getOriginalFilename()) + new Date().getTime();
                System.out.println(basename);
                File dest = new File(baseDir + basename + "." + ext);
                image.transferTo(dest);
                list.add((basename + "." + ext));
            }
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }
}
