package kr.reactSNS.app.mapper;

import java.util.Collection;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import kr.reactSNS.app.Beans.HashtagBean;
import kr.reactSNS.app.Beans.PostBean;

@Mapper
public interface HashtagMapper {

    @Select("SELECT IFNULL(id, COUNT(id)) AS id FROM Hashtags WHERE `name`=#{name}")
    public HashtagBean CheckHashtag(String name);

    @Select("SELECT p.*, u.nickname, GROUP_CONCAT(DISTINCT i.src) as src FROM PostHashtag AS ph JOIN Posts AS p ON (ph.PostId = p.id) JOIN Users AS u ON (p.UserId = u.id) LEFT JOIN Images AS i ON (p.id = i.PostId) WHERE ph.HashtagId=#{HashtagId} AND p.RetweetId IS NULL  GROUP BY p.id ORDER BY p.createdAt DESC")
    public Collection<PostBean> LoadHashtagPosts(int HashtagId);
}