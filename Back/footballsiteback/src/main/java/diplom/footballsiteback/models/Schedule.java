package diplom.footballsiteback.models;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
public class Schedule {

    @Id
    private String _id;
    private String homeTeam;
    private String awayTeam;
    private LocalDateTime date;
    private String tournament;
    private boolean nextMatch;
    private String score;
    private boolean homeGame;
    private String result;
    private String stadium;

    public Schedule(String homeTeam, String awayTeam, LocalDateTime date, String tournament, boolean nextMatch, String score) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.date = date;
        this.tournament = tournament;
        this.nextMatch = nextMatch;
        this.score = score;
        this.homeGame = homeTeam.equals("ФК Гомель");
        this.result = defineResult();
    }

    public String defineResult() {
        int index = score.indexOf(":");
        if (score.substring(0, index).equals("-")) {
            return "none";
        }
        int score1 = Integer.parseInt(score.substring(0, index));
        int score2 = Integer.parseInt(score.substring(index + 1));
        if (homeGame) {
            if (score1 > score2) {
                return "win";
            } else if (score1 == score2) {
                return "draw";
            } else {
                return "lose";
            }
        } else {
            if (score1 < score2) {
                return "win";
            } else if (score1 == score2) {
                return "draw";
            } else {
                return "lose";
            }
        }
    }
}
