package diplom.footballsiteback.controllers;

import diplom.footballsiteback.models.*;
import diplom.footballsiteback.repos.*;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RestController
public class AdminController {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    PlayersRepository playersRepository;

    @Autowired
    CoachesRepository coachesRepository;

    @Autowired
    NewsRepository newsRepository;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    TableRepository tableRepository;

    @PostMapping("/admin/player/add")
    public String addPlayer(@RequestBody Player player, @RequestParam String id) {
        if (!id.equals("undefined")) {
            Binary image = playersRepository.findById(id).get().getImage();
            player.setImage(image);
        }
        if (player.getBio() != null) {
            player.setBio(player.getBio().replace("\n", "<br><br>"));
        }
        System.out.println(player);
        player = playersRepository.save(player);
        return player.get_id();
    }

    @PostMapping("/admin/player/image")
    public void uploadImage(@RequestParam(value = "image") MultipartFile file, @RequestParam String id) throws IOException {
        Player player = playersRepository.findById(id).get();
        player.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        System.out.println(player);
        playersRepository.save(player);
    }

    @GetMapping("/admin/player")
    public Player getPlayer(@RequestParam String id) {
        return playersRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/admin/player/delete")
    public void deletePlayer(@RequestParam String id) {
        playersRepository.deleteById(id);
    }

    @GetMapping("/admin/coach")
    public Coach getCoach(@RequestParam String id) { return coachesRepository.findById(id).orElse(null);}

    @PostMapping("/admin/coach/add")
    public String addCoach(@RequestBody Coach coach, @RequestParam String id) {
        if (!id.equals("undefined")) {
            Binary image = coachesRepository.findById(id).get().getImage();
            coach.setImage(image);
        }
        if (coach.getBio() != null) {
            coach.setBio(coach.getBio().replace("\n", "<br><br>"));
        }
        System.out.println(coach);
        coach = coachesRepository.save(coach);
        return coach.get_id();
    }

    @PostMapping("/admin/coach/photo")
    public void uploadCoachImage(@RequestParam(value = "image") MultipartFile file, @RequestParam String id) throws IOException {
        Coach coach = coachesRepository.findById(id).get();
        coach.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        System.out.println(coach);
        coachesRepository.save(coach);
    }

    @DeleteMapping("/admin/coach/delete")
    public void deleteCoach(@RequestParam String id) {
        coachesRepository.deleteById(id);
    }

    @GetMapping("/admin/news")
    public News getNews(@RequestParam String id) {
        return newsRepository.findById(id).orElse(null);
    }

    @PostMapping("/admin/news/add")
    public String setNews(@RequestBody News news, @RequestParam String id) {
        if (!id.equals("add")) {
            List<Binary> images = newsRepository.findById(id).get().getImage();
            news.setImage(images);
        }
        if (news.getText() != null) {
            news.setText(news.getText().replace("\n", "<br><br>"));
        }
        System.out.println(news);
        news = newsRepository.save(news);
        return news.get_id();
    }

    @PostMapping("/admin/news/photos")
    public void appendImagesNews(@RequestParam(value = "image") MultipartFile files, @RequestParam String id) throws IOException {
        System.out.println(files);
        News news = newsRepository.findById(id).get();
        List<Binary> images = news.getImage();
        if (images == null) {
            images = new ArrayList<>();
        }
        images.add(new Binary(BsonBinarySubType.BINARY, files.getBytes()));
        news.setImage(images);
        System.out.println(news);
        newsRepository.save(news);
    }

    @DeleteMapping("/admin/news/delete")
    public void deleteNews(@RequestParam String id) {
        newsRepository.deleteById(id);
    }

    @PostMapping("/admin/info/add")
    public void addInfo(@RequestBody Info info) {
        info.setInfo(info.getInfo().replace("\n", "<br><br>"));
        mongoTemplate.save(info);
    }

    @DeleteMapping("/admin/info/delete")
    public void deleteInfo(@RequestParam String id) {
        mongoTemplate.remove(new Query().addCriteria(Criteria.where("_id").is(id)), Info.class);
    }

    @GetMapping("/admin/info/get")
    public Info getInfo(@RequestParam String id) {
        return mongoTemplate.findOne(new Query().addCriteria(Criteria.where("_id").is(id)), Info.class);
    }

    @GetMapping("/admin/schedule/get")
    public List<Schedule> getSchedule(@RequestParam String year) {
        int y = Integer.parseInt(year);
        Query query = new Query();
        query.addCriteria(Criteria.where("date").gte(LocalDateTime.of(y,1,1,0,0))
                .lte(LocalDateTime.of(y+1, 1,1,0,0)));
        query.with(Sort.by(Sort.Direction.ASC, "date"));
        List<Schedule> schedules = mongoTemplate.find(query, Schedule.class);
        System.out.println(schedules);
        return schedules;
    }

    @PostMapping("/admin/schedule/add")
    public void addSchedule(@RequestBody Schedule schedule, @RequestParam String year) {
        schedule.setResult(schedule.defineResult());
        System.out.println(schedule);
        updateTable(schedule, year);
        scheduleRepository.save(schedule);
    }

    public void updateTable(Schedule schedule, String year) {
        Table table = tableRepository.findByYearAndName(Integer.parseInt(year), schedule.getTournament()).orElse(null);
        Team gomel = table.getTeams().stream().filter(team -> team.getName().equals("ФК Гомель")).findFirst().orElse(null);
        Query query = new Query();
        query.addCriteria(Criteria.where("date").gte(LocalDateTime.of(Integer.parseInt(year),1,1,0,0))
                .lte(LocalDateTime.of(Integer.parseInt(year)+1, 1,1,0,0)));
        query.addCriteria(Criteria.where("tournament").is(schedule.getTournament()));
        gomel = resetStats(gomel);
        List<Schedule> schedules = mongoTemplate.find(query, Schedule.class);
        schedules.add(schedule);
        Team finalGomel = gomel;
        schedules.forEach(s -> {
            String result = s.defineResult();
            switch (result) {
                case "win" -> finalGomel.setWin(finalGomel.getWin() + 1);
                case "draw" -> finalGomel.setDraw(finalGomel.getDraw() + 1);
                case "lose" -> finalGomel.setLose(finalGomel.getLose() + 1);
            }
            if (!s.getScore().equals("-:-")) {
                String score = s.getScore();
                int index = score.indexOf(":");
                int score1 = Integer.parseInt(score.substring(0, index));
                int score2 = Integer.parseInt(score.substring(index + 1));
                if (s.isHomeGame()) {
                    finalGomel.setGoalsFor(finalGomel.getGoalsFor() + score1);
                    finalGomel.setGoalsAgainst(finalGomel.getGoalsAgainst() + score2);
                } else {
                    finalGomel.setGoalsFor(finalGomel.getGoalsFor() + score2);
                    finalGomel.setGoalsAgainst(finalGomel.getGoalsAgainst() + score1);
                }
            }
        });
        tableRepository.save(table);
    }

    public Team resetStats(Team team) {
        team.setWin(0);
        team.setDraw(0);
        team.setLose(0);
        team.setGoalsFor(0);
        team.setGoalsAgainst(0);
        return team;
    }

    @DeleteMapping("/admin/schedule/delete")
    public void deleteMatch(@RequestParam String id) {
        scheduleRepository.deleteById(id);
    }

    @PostMapping("/admin/team/edit")
    public void editTeam(@RequestBody Team team, @RequestParam String name, @RequestParam String tournament,
                         @RequestParam String year) {
        System.out.println(name + " - " + tournament + " - " + year);
        Table table = tableRepository.findByYearAndName(Integer.parseInt(year), tournament).get();
        List<Team> teams = table.getTeams();
        teams = teams.stream().map(t -> {
           if (t.getName().equals(name)) {
               t = team;
               System.out.println(t);
           }
           return t;
        }).collect(Collectors.toList());
        table.setTeams(teams);
        tableRepository.save(table);
    }

    @PostMapping("/admin/team/add")
    public void addTeam(@RequestBody Team team, @RequestParam String year, @RequestParam String tournament) {
        Table table = tableRepository.findByYearAndName(Integer.parseInt(year), tournament).get();
        List<Team> teams = table.getTeams();
        teams.add(team);
        table.setTeams(teams);
        tableRepository.save(table);
    }

    @DeleteMapping("/admin/team/delete")
    public void deleteTeam(@RequestParam String name, @RequestParam String year, @RequestParam String tournament) {
        Table table = tableRepository.findByYearAndName(Integer.parseInt(year), tournament).get();
        List<Team> teams = table.getTeams();
        teams.removeIf((t) -> t.getName().equals(name));
        table.setTeams(teams);
        tableRepository.save(table);
    }
}
