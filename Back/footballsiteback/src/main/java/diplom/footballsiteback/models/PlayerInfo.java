package diplom.footballsiteback.models;

import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class PlayerInfo {

    private String id;
    private String fullname;
    private int height;
    private int weight;
    private String position;
    private Season currentSeason;
    private List<Season> seasons;
    private LocalDate birthdate;
    private Binary image;
    private String bio;
    private String[] achievements;


    public PlayerInfo(Player player, int year) {
        id = player.get_id();
        fullname = player.getFullname();
        height = player.getHeight();
        weight = player.getWeight();
        position = player.getPosition();
        birthdate = player.getBirthdate();
        image = player.getImage();
        bio = player.getBio();
        achievements = player.getAchievements();
        Season[] seasonArray = player.getSeasons();
        seasons = Arrays.stream(seasonArray).sorted(Comparator.comparing(Season::getYear).reversed())
                .collect(Collectors.toList());
        currentSeason = seasons.stream().filter(season1 ->season1.getYear() == year).findFirst().orElse(null);
    }
}
