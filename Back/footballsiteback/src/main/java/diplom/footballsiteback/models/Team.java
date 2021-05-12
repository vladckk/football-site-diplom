package diplom.footballsiteback.models;

import lombok.Data;

@Data
public class Team {

    private String name;
    private int win;
    private int draw;
    private int lose;
    private int goalsFor;
    private int goalsAgainst;
    private int fine;
    private String reason;
    private int points;
    private int goalDiff;
}
