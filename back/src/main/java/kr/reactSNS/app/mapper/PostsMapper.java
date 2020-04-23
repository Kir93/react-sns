package kr.reactSNS.app.mapper;

import java.util.Collection;

import org.apache.ibatis.annotations.Select;

import kr.reactSNS.app.Beans.PostBean;

public interface PostsMapper {
    @Select("SELECT p.*, u.nickname FROM Posts AS p JOIN Users AS u ON (p.UserId = u.id) ORDER BY p.createdAt DESC")
    public Collection<PostBean> LoadMainPosts();
}