package kr.reactSNS.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("http://localhost:3060");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String filePath = "file:///D:/Work/reactSNS/back/src/main/resources/static/";
        // String filePath = "file:///D:/IDE/workspace/ReactSNS/back/src/main/resources/static/";
        registry.addResourceHandler("/**").addResourceLocations(filePath);
    }

}