package kr.reactSNS.app.config;

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

        http.formLogin().loginPage("http://kir93.me").loginProcessingUrl("api/user/login")
                .usernameParameter("userId").passwordParameter("password").permitAll();

        http.logout().logoutUrl("/api/user/logout").deleteCookies("rslc").invalidateHttpSession(true)
                .logoutSuccessUrl("/").clearAuthentication(true).permitAll();

        http.sessionManagement().maximumSessions(1).expiredUrl("/api/user/").maxSessionsPreventsLogin(true);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://.kir93.me");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}