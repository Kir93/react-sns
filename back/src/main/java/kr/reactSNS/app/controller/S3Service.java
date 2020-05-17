package kr.reactSNS.app.controller;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class S3Service {
    private AmazonS3 s3Client;

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;
    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.region.static}")
    private String region;

    @PostConstruct
    public void setS3Client() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);

            s3Client = AmazonS3ClientBuilder.standard()
                        .withCredentials(new AWSStaticCredentialsProvider(credentials))
                        .withRegion(this.region)
                        .build();

    }

    public List<String> uploadImage(List<MultipartFile> images){
        try {
            List<String> list = new ArrayList<String>();
            // String baseDir = System.getProperty("user.dir") + "/back/src/main/resources/static/uploads/"; // 개발환경
            for (MultipartFile image : images) {
                byte[] bytes = IOUtils.toByteArray(image.getInputStream());
                ObjectMetadata objmeta = new ObjectMetadata();
                objmeta.setContentType(image.getContentType());
                objmeta.setContentLength(bytes.length);
                ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

                String ext = FilenameUtils.getExtension(image.getOriginalFilename());
                String basename = FilenameUtils.getBaseName(image.getOriginalFilename()) + new Date().getTime();
                String newFile = basename + "." + ext;
                System.out.println("여기일듯?");
                PutObjectRequest putobj =  new PutObjectRequest(bucket, newFile, byteArrayInputStream, objmeta);
                System.out.println("맞지?");
                s3Client.putObject(putobj);
                System.out.println("맞니??");
                // File dest = new File(baseDir + basename + "." + ext); // 개발환경
                // image.transferTo(dest); // 개발환경
                list.add(s3Client.getUrl(bucket, newFile).toString());
            }
            return list;
        } catch (Exception e) {
            System.err.println(e);
            return null;
        }
    }
}