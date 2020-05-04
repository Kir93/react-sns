package kr.reactSNS.app.mapper;

import java.util.Collection;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import kr.reactSNS.app.beans.HashtagBean;
import kr.reactSNS.app.beans.PostBean;

@Mapper
public interface HashtagMapper {

    @Select("SELECT IFNULL(id, COUNT(id)) AS id FROM Hashtags WHERE `name`=#{name}")
    public HashtagBean CheckHashtag(String name);

    @Select("SELECT p.*, u.nickname, GROUP_CONCAT(DISTINCT i.src) as src, "
    + "GROUP_CONCAT(DISTINCT l.userId) as Likers FROM PostHashtag AS ph "
    + "JOIN Posts AS p ON (ph.PostId = p.id) JOIN Users AS u ON (p.UserId = u.id) " 
    + "LEFT JOIN Images AS i ON (p.id = i.PostId) "
    + "LEFT JOIN `Like` AS l ON (p.id = l.PostId) "
    + "WHERE ph.HashtagId=#{HashtagId} AND p.RetweetId IS NULL AND p.delYn='N' " 
    + "GROUP BY p.id ORDER BY p.createdAt DESC")
    public Collection<PostBean> LoadHashtagPosts(int HashtagId);
}