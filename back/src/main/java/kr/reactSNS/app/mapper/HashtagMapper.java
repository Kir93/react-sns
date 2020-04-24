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

    @Select("SELECT p.*, u.nickname FROM PostHashtag AS ph JOIN Posts AS p ON (ph.PostId = p.id) JOIN Users AS u ON (p.UserId = u.id) WHERE ph.HashtagId=#{HashtagId} AND p.RetweetId IS NULL  ORDER BY p.createdAt DESC")
    public Collection<PostBean> LoadHashtagPosts(int HashtagId);
}