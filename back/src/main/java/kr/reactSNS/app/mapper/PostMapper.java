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

    @Select("SELECT p.*, u.nickname FROM Posts AS p JOIN Users AS u ON (p.UserId = u.id) WHERE p.id=#{id}")
    public PostBean SelectPost(int id);

    @Select("SELECT IFNULL(id, COUNT(id)) AS id FROM Hashtags WHERE `name`=#{name}")
    public int CheckHashtag(String name);

    @Insert("INSERT INTO Hashtags (name) value (#{name})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    public int InsertHashtag(String name);

    @Insert("INSERT INTO `PostHashtag` (`HashtagId`, `PostId`) VALUES (#{HashtagId}, #{PostId})")
    public int AddPostHashtag(int PostId, int HashtagId);

}