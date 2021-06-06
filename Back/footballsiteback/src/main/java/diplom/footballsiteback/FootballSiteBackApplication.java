package diplom.footballsiteback;

import diplom.footballsiteback.models.*;
import diplom.footballsiteback.repos.*;
import org.apache.commons.io.IOUtils;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
public class FootballSiteBackApplication implements CommandLineRunner {

    @Autowired
    NewsRepository newsRepository;

    @Autowired
    PlayersRepository playersRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    TableRepository tableRepository;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    CoachesRepository coachesRepository;

    public static void main(String[] args) {
        SpringApplication.run(FootballSiteBackApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        /*
        Query query = new Query();
        query.addCriteria(Criteria.where("seasons.year").is(2020))
                .with(Sort.by(Sort.Direction.DESC, "seasons.assists"))
                .limit(6);
        List<Player> list = mongoTemplate.find(query, Player.class);

        Path path = Paths.get("c://Users//vladp//IdeaProjects//FCSite//src//assets//images//yus.jpg");
        setPhoto(path, "60859376cf30dc1b08614200");
        */
        /*
        Query query = new Query();
        query.fields().slice("image", 1);
        List<News> news = mongoTemplate.find(query, News.class);
        news.forEach(System.out::println);
        */
        List<Integer> list = scheduleRepository.findAll().stream().map(sched -> sched.getDate().getYear()).distinct()
                .collect(Collectors.toList());
        System.out.println(list);
    }

    public void setPhoto(Path path, String id) throws IOException {
        Coach coach = coachesRepository.findById(id).get();
        File file = new File(path.toString());
        FileInputStream input = new FileInputStream(file);
        MultipartFile mfile = new MockMultipartFile(path.getFileName().toString(), file.getName(), "image/jpeg", IOUtils.toByteArray(input));
        coach.setImage(new Binary(BsonBinarySubType.BINARY, mfile.getBytes()));
        coachesRepository.save(coach);
    }
}
