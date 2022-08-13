package io.coursemela.coursemela;

import io.coursemela.coursemela.fileserver.property.FileStorageProperties;
import io.coursemela.coursemela.storage.StorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        StorageProperties.class,
        FileStorageProperties.class
})
public class CoursemelaApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoursemelaApplication.class, args);
    }

//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/*")
//						.allowedOrigins("http://localhost:3000");
//			}
//		};
//	}

}
