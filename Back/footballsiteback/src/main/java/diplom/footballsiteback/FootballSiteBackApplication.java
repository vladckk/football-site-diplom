package diplom.footballsiteback;

import diplom.footballsiteback.models.News;
import diplom.footballsiteback.repos.NewsRepository;
import org.apache.commons.io.IOUtils;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;

@SpringBootApplication
public class FootballSiteBackApplication implements CommandLineRunner {

    @Autowired
    NewsRepository newsRepository;

    public static void main(String[] args) {

        SpringApplication.run(FootballSiteBackApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        News news = newsRepository.findById("602cfc98d6580e25f8480f59").get();
        File file = new File("c://Proga//Diplom//d1//n16.jpg");
        FileInputStream input = new FileInputStream(file);
        MultipartFile mfile = new MockMultipartFile("n16.jpg", file.getName(), "image/jpeg", IOUtils.toByteArray(input));
        news.setImage(new Binary(BsonBinarySubType.BINARY, mfile.getBytes()));
        newsRepository.save(news);
        System.out.println(news);
    }
}
