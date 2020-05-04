package kr.reactSNS.app.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import kr.reactSNS.app.beans.HashtagBean;
import kr.reactSNS.app.beans.PostBean;

@Mapper
public interface PostMapper {

    @Insert("insert into Posts (content, UserId) value (#{content}, #{UserId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public int AddPost(PostBean pb);

    @Select("SELECT p.*, u.nickname, GROUP_CONCAT(DISTINCT i.src) as src, "
    + "GROUP_CONCAT(DISTINCT l.userId) as Likers FROM Posts AS p "
    + "JOIN Users AS u ON (p.UserId = u.id) "
    + "LEFT JOIN Images AS i ON (p.id = i.PostId) "
    + "LEFT JOIN `Like` AS l ON (p.id = l.PostId) "
    + "WHERE p.id=#{id} AND p.delYn='N'")
    public PostBean SelectPost(int id);

    @Insert("INSERT INTO Hashtags (name) value (#{name})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    public int InsertHashtag(HashtagBean hb);

    @Insert("INSERT INTO `PostHashtag` (`HashtagId`, `PostId`) VALUES (#{HashtagId}, #{PostId})")
    public int AddPostHashtag(int PostId, int HashtagId);

    @Insert("INSERT INTO Images (src, PostId) value (#{src}, #{PostId})")
    public int InsertImage(String src, int PostId);

    @Insert("INSERT INTO `Like` (PostId, UserId) value (#{PostId}, #{UserId})")
    public int InsertLike(int PostId, int UserId);

    @Delete("DELETE FROM `Like` WHERE PostId = #{PostId} AND UserId = #{UserId}")
    public int UnLike(int PostId, int UserId);
}