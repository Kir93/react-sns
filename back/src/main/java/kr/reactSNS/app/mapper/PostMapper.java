package kr.reactSNS.app.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import kr.reactSNS.app.Beans.PostBean;

@Mapper
public interface PostMapper {

    @Insert("insert into Posts (content, UserId) value (#{content}, #{UserId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public int AddPost(PostBean pb);

    @Select("SELECT id FROM Hashtags WHERE `name`=#{name}")
    public int CheckHashtag(String name);

    @Insert("INSERT INTO HashTags (name) value (#{name})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public int InsertHashtag(String name);

}