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

    @Select("SELECT * from PostHashtag WHERE HashtagId=#{hashtagId} AND PostId=#{id}")
    public Object CheckPostHashtag(int hashtagId, int id);

    @Select("SELECT p.*, u.nickname, GROUP_CONCAT(DISTINCT i.src) as src, "
    + "GROUP_CONCAT(DISTINCT l.userId) as Likers FROM PostHashtag AS ph "
    + "JOIN Posts AS p ON (ph.PostId = p.id) JOIN Users AS u ON (p.UserId = u.id) " 
    + "LEFT JOIN Images AS i ON (p.id = i.PostId) "
    + "LEFT JOIN `Like` AS l ON (p.id = l.PostId) "
    + "${where} "
    + "GROUP BY p.id ORDER BY p.createdAt DESC limit 10")
    public Collection<PostBean> LoadHashtagPosts(int HashtagId, String where);
}