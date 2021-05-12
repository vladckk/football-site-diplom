package diplom.footballsiteback.models;

import lombok.Data;

@Data
public class Season {

    private int year;
    private int games;
    private int goals;
    private int assists;
    private int goalsconceded;
    private int yc;
    private int rc;
    private int number;
    private int minutes;
    private int cleansheets;
}
