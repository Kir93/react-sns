package kr.reactSNS.app.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import kr.reactSNS.app.beans.HashtagBean;
import kr.reactSNS.app.beans.PostBean;

@Mapper
public interface PostMapper {

    @Insert("insert into Posts (content, UserId) value (#{content}, #{UserId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public int AddPost(PostBean pb);

    @Select("SELECT p.*, u.nickname, GROUP_CONCAT(DISTINCT i.src) as src, "
            + "GROUP_CONCAT(DISTINCT l.userId) as Likers FROM Posts AS p " + "JOIN Users AS u ON (p.UserId = u.id) "
            + "LEFT JOIN Images AS i ON (p.id = i.PostId) " + "LEFT JOIN `Like` AS l ON (p.id = l.PostId) "
            + "WHERE p.id=#{id} AND p.delYn='N'")
    public PostBean SelectPost(int id);

    @Insert("INSERT INTO Hashtags (name) value (#{name})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    public int InsertHashtag(HashtagBean hb);

    @Insert("INSERT INTO `PostHashtag` (`HashtagId`, `PostId`) VALUES (#{HashtagId}, #{PostId})")
    public int AddPostHashtag(int PostId, int HashtagId);

    @Insert("INSERT INTO Images (src, PostId) value (#{src}, #{PostId})")
    public int InsertImage(String src, int PostId);

    @Select("SELECT id FROM Images WHERE src=#{src}")
    public Object SelectImage(String src);

    @Insert("INSERT INTO `Like` (PostId, UserId) value (#{PostId}, #{UserId})")
    public int InsertLike(int PostId, int UserId);

    @Delete("DELETE FROM `Like` WHERE PostId = #{PostId} AND UserId = #{UserId}")
    public int UnLike(int PostId, int UserId);

    @Select("SELECT id FROM Posts WHERE UserId=#{UserId} AND RetweetId=#{retweetTargetId}")
    public Object CheckRetweet(int UserId, int retweetTargetId);

    @Insert("insert into Posts (UserId, RetweetId, content) value (#{UserId}, #{RetweetId}, 'retweetPost')")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    public int InsertRetweet(PostBean pb);

    @Select("SELECT r.*, ru.nickname, GROUP_CONCAT(DISTINCT i.src) as src FROM Posts p "
            + "JOIN Users u ON (p.UserId = u.id) " + "JOIN Posts r ON (p.RetweetId = r.id) "
            + "JOIN Users ru ON (r.UserId = ru.id) " + "LEFT JOIN Images AS i ON (p.RetweetId = i.PostId) "
            + "WHERE p.id = #{id}")
    public Map<String, Object> SelectRetweetPost(int id);

    @Update("UPDATE Posts SET delYn='Y' WHERE id=#{id}")
    public boolean RemovePost(int id);

    @Update("UPDATE Posts SET content=#{content} WHERE id=#{id}")
    public boolean EditPost(String content, int id);
}