package kr.reactSNS.app.mapper;

import java.util.Collection;

import org.apache.ibatis.annotations.Select;

import kr.reactSNS.app.beans.PostBean;

public interface PostsMapper {
    @Select("SELECT p.*, u.nickname, GROUP_CONCAT(DISTINCT i.src) as src, "
    + "GROUP_CONCAT(DISTINCT l.userId) as Likers FROM Posts AS p "
    + "JOIN Users AS u ON (p.UserId = u.id) "
    + "LEFT JOIN Images AS i ON (p.id = i.PostId) "
    + "LEFT JOIN `Like` AS l ON (p.id = l.PostId) "
    + "${where} "
    + "GROUP BY p.id ORDER BY p.createdAt DESC limit 10")
    public Collection<PostBean> LoadMainPosts(String where);
}