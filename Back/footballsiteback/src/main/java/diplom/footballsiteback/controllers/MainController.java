package diplom.footballsiteback.controllers;

import diplom.footballsiteback.models.*;
import diplom.footballsiteback.repos.*;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigurationPackage;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MainController {

    @Autowired
    NewsRepository newsRepository;

    @Autowired
    PlayersRepository playersRepository;

    @Autowired
    TableRepository tableRepository;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    CoachesRepository coachesRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @GetMapping("/")
    public List<News> showNewsMainPage() {
        return newsRepository.findAll(PageRequest.of(0, 6)).toList();
    }

    @GetMapping("/mainPageGoalscorers")
    public List<Player> showBestGoalscorers() {
        AggregationOperation addFields = aggregationOperationContext -> {
            Document filter = new Document();
            filter.put("input", "$seasons");
            filter.put("as", "chosen");
            filter.put("cond", new Document("$eq", Arrays.asList("$$chosen.year", 2020)));
            return new Document("$addFields", new Document("currentseason", new Document("$filter", filter)));
        };
        MatchOperation match = Aggregation.match(new Criteria("seasons.year").is(2020));
        SortOperation sort = Aggregation.sort(Sort.by(Sort.Direction.DESC, "currentseason.goals"));
        LimitOperation limit = Aggregation.limit(6);
        Aggregation aggregation = Aggregation.newAggregation(match, addFields, sort, limit);
        return mongoTemplate.aggregate(aggregation, "players", Player.class).getMappedResults();
    }

    @GetMapping("/mainPageAssistants")
    public List<Player> showBestAssistants() {
        AggregationOperation addFields = aggregationOperationContext -> {
            Document filter = new Document();
            filter.put("input", "$seasons");
            filter.put("as", "chosen");
            filter.put("cond", new Document("$eq", Arrays.asList("$$chosen.year", 2020)));
            return new Document("$addFields", new Document("currentseason", new Document("$filter", filter)));
        };
        MatchOperation match = Aggregation.match(new Criteria("seasons.year").is(2020));
        SortOperation sort = Aggregation.sort(Sort.by(Sort.Direction.DESC, "currentseason.assists"));
        LimitOperation limit = Aggregation.limit(6);
        Aggregation aggregation = Aggregation.newAggregation(match, addFields, sort, limit);
        return mongoTemplate.aggregate(aggregation, "players", Player.class).getMappedResults();
    }

    @GetMapping("/table")
    public Table showTable() {
        Table table = tableRepository.findByYear(2020).orElse(null);
        assert table != null;
        Team[] teams = table.getTeams();
        Arrays.stream(teams).forEach(team -> {
            team.setPoints(team.getWin() * 3 + team.getDraw() - team.getFine());
            team.setGoalDiff(team.getGoalsFor() - team.getGoalsAgainst());
        });
        table.setTeams(Arrays.stream(teams).sorted(Comparator.comparingInt(Team::getPoints).thenComparingInt(Team::getGoalDiff)
                .thenComparingInt(Team::getWin).reversed()).collect(Collectors.toList())
                .toArray(new Team[table.getTeams().length]));
        return table;
    }

    @GetMapping("/api/gks")
    public List<Player> sendGoalkeepers() { return playersRepository.findByPosition("Вратарь"); }

    @GetMapping("/api/dfs")
    public List<Player> sendDefenders() {
        return playersRepository.findByPosition("Защитник");
    }

    @GetMapping("/api/mfs")
    public List<Player> sendMidfielders() {
        return playersRepository.findByPosition("Полузащитник");
    }

    @GetMapping("/api/strs")
    public List<Player> sendStrikers() { return playersRepository.findByPosition("Нападающий"); }

    @GetMapping("/api/schedule")
    @ResponseBody
    public List<List<Schedule>> sendSchedule(@RequestParam String tour, @RequestParam String year) {
        System.out.println(tour);
        int y = Integer.parseInt(year);
        Query query = new Query();
        System.out.println(y);
        query.addCriteria(Criteria.where("date").gte(LocalDateTime.of(y,1,1,0,0))
                .lte(LocalDateTime.of(y + 1, 1,1,0,0)));
        List<List<Schedule>> scheduleByMonth = new ArrayList<>();
        List<Integer> numberOfMonths = new ArrayList<>();
        List<Schedule> list = mongoTemplate.find(query, Schedule.class);
        list.forEach(schedule -> {
            LocalDateTime date = schedule.getDate();
            if (!numberOfMonths.contains(date.getMonthValue()) &&
                    (schedule.getTournament().startsWith(tour) || tour.equals("Все турниры"))) {
                numberOfMonths.add(date.getMonthValue());
            }
        });
        numberOfMonths.forEach(month -> {
            List<Schedule> schedules = new ArrayList<>();
            list.forEach(schedule -> {
                if (schedule.getDate().getMonthValue() == month && tour.equals("Все турниры")) {
                    schedules.add(schedule);
                } else if (schedule.getDate().getMonthValue() == month &&
                        schedule.getTournament().startsWith(tour)) {
                    schedules.add(schedule);
                }
            });
            scheduleByMonth.add(schedules);
        });
        return scheduleByMonth;
    }

    @GetMapping("api/schedule/tournaments")
    @ResponseBody
    public List<String> sendTournaments(@RequestParam String year) {
        int y = Integer.parseInt(year);
        Query query = new Query();
        query.addCriteria(Criteria.where("date").gte(LocalDateTime.of(y,1,1,0,0))
                .lte(LocalDateTime.of(y+1, 1,1,0,0)));
        List<Schedule> schedule = mongoTemplate.find(query, Schedule.class);
        List<String> tournaments = new ArrayList<>(List.of("Все турниры"));
        for (Schedule match: schedule) {
            String tour = match.getTournament();
            int index = 0;
            char[] chrs = tour.toCharArray();
            for (int i = 0; i < chrs.length; i++) {
                if (Character.isDigit(chrs[i])) {
                    index = i;
                    break;
                }
            }
            if (index != 0) {
                tour = tour.substring(0, index);
            }
            if (!tournaments.contains(tour)) {
                tournaments.add(tour);
            }
        }
        return tournaments;
    }

    @GetMapping("/api/fieldplayers")
    public List<PlayerStats> sendFieldPlayerStats() {
        Query query = new Query();
        query.fields().include("fullname", "seasons", "position");
        query.addCriteria(Criteria.where("position").is("Защитник"));
        List<Player> players = mongoTemplate.find(query, Player.class);
        query = new Query();
        query.fields().include("fullname", "seasons", "position");
        query.addCriteria(Criteria.where("position").is("Полузащитник"));
        players.addAll(mongoTemplate.find(query, Player.class));
        query = new Query();
        query.fields().include("fullname", "seasons", "position");
        query.addCriteria(Criteria.where("position").is("Нападающий"));
        players.addAll(mongoTemplate.find(query, Player.class));
        players.forEach(System.out::println);
        List<PlayerStats> stats = new ArrayList<>();
        players.forEach(player -> {
            Season[] seasons = player.getSeasons();
            Season season = Arrays.stream(seasons).filter(s -> s.getYear() == 2020).findFirst().orElse(null);
            stats.add(new PlayerStats(player, season));
        });
        stats.sort((ps1, ps2) -> Integer.compare(ps2.getSeason().getMinutes(), ps1.getSeason().getMinutes()));
        System.out.println(stats);
        return stats;
    }

    @GetMapping("/api/gkStats")
    public List<PlayerStats> sendGkStats() {
        Query query = new Query();
        query.fields().include("fullname", "seasons", "position");
        query.addCriteria(Criteria.where("position").is("Вратарь"));
        List<Player> gks = mongoTemplate.find(query, Player.class);
        List<PlayerStats> gkStats = new ArrayList<>();
        gks.forEach(gk -> {
            Season[] seasons = gk.getSeasons();
            Season season = Arrays.stream(seasons).filter(g -> g.getYear() == 2020).findFirst().orElse(null);
            gkStats.add(new PlayerStats(gk, season));
        });
        return gkStats;
    }

    @GetMapping("/stats/matches")
    public List<Schedule> sendMatchesStats() {
        LocalDateTime date = scheduleRepository.findByNextMatch(true).get().getDate();
        Query query = new Query();
        query.addCriteria(Criteria.where("date").lt(date))
                .with(Sort.by(Sort.Direction.DESC, "date"))
                .limit(5);
        List<Schedule> previousMatches = mongoTemplate.find(query, Schedule.class);
        Collections.reverse(previousMatches);
        query = new Query();
        query.addCriteria(Criteria.where("date").gte(date))
                .with(Sort.by(Sort.Direction.ASC, "date"))
                .limit(2);
        List<Schedule> nextMatches = mongoTemplate.find(query, Schedule.class);
        previousMatches.addAll(nextMatches);
        return previousMatches;
    }

    @GetMapping("/api/gomelstats")
    public TeamStats sendGomelStats() {
        Table table = tableRepository.findByYear(2020).orElse(null);
        return new TeamStats(Objects.requireNonNull(Arrays.stream(table.getTeams())
                .filter(team -> team.getName().equals("ФК Гомель")).findFirst().orElse(null)));
    }

    @GetMapping("/api/maincoaches")
    public List<Coach> sendMainCoaches() {
        return coachesRepository.findByStatus(1);
    }

    @GetMapping("/api/reservecoaches")
    public List<Coach> sendReserveCoaches() {
        return coachesRepository.findByStatus(2);
    }

    @GetMapping("/player")
    public PlayerInfo sendChosenPlayer(@RequestParam String id) {
        Player player = playersRepository.findById(id).orElse(null);
        System.out.println(new PlayerInfo(player, 2020));
        return new PlayerInfo(player, 2020);
    }

    @GetMapping("/news/id")
    public News sendNewsPage(@RequestParam String id) {
        return newsRepository.findById(id).get();
    }

    @GetMapping("/news/id/latest")
    public List<News> sendLatestNews(@RequestParam String id) {
        Query query = new Query();
        query.fields().slice("image", 1);
        query.with(Sort.by(Sort.Direction.DESC, "date"))
                .limit(4);
        List<News> news = mongoTemplate.find(query, News.class);
        int index = -1;
        for (int i = 0; i < news.size() - 1; i++) {
            if (news.get(i).get_id().equals(id)) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            news.remove(index);
        } else {
            news.remove(3);
        }
        return news;
    }

    @GetMapping("/news")
    public List<News> getNews(@RequestParam String index, @RequestParam String step) {
        int ind = Integer.parseInt(index);
        int stp = Integer.parseInt(step);
        int skip = ind * stp;
        Query query = new Query();
        query.fields().slice("image", 1);
        query.with(Sort.by(Sort.Direction.DESC, "date"));
        query.skip(skip).limit(stp);
        return mongoTemplate.find(query, News.class);
    }

    @GetMapping("/news/count")
    public int getNewsCount() {
        return (int) newsRepository.count();
    }

    @GetMapping("/info")
    public List<Info> getInfo() {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.ASC, "year"));
        return mongoTemplate.find(query, Info.class);
    }
}
