package kr.reactSNS.app.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable().cors();

        http.authorizeRequests().antMatchers("*").permitAll();

        http.formLogin().loginPage("http://localhost:3000/").loginProcessingUrl("api/user/login")
                .defaultSuccessUrl("http://localhost:3000/").usernameParameter("userId").passwordParameter("password")
                .permitAll();

        http.logout().logoutUrl("/api/user/logout").deleteCookies("auth_code", "rslc").logoutSuccessUrl("/").invalidateHttpSession(true)
                .clearAuthentication(true).permitAll();

        http.sessionManagement().invalidSessionUrl("/api/user/").maximumSessions(1).maxSessionsPreventsLogin(true).expiredUrl("/api/user/");
        ;

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedMethod("*");
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "TOKEN_ID", "X-Requested-With", "Authorization",
                "Content-Type", "Content-Length", "Cache-Control", "Set-Cookie"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}