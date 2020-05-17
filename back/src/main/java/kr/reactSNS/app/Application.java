package kr.reactSNS.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(value = { "classpath:${jdbc.config}" })
public class Application {

	@LocalServerPort
    private static String port;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		System.out.println("server is running on " + port);
	}

}
