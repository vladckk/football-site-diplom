package diplom.footballsiteback.models;

import lombok.Data;

import java.text.DecimalFormat;

@Data
public class PlayerStats {

    private String fullname;
    private String position;
    private int ga;
    private int gapergame;
    private Season season;

    public PlayerStats(Player player, Season season) {
        fullname = player.getFullname();
        position = player.getPosition();
        this.season = season;
        ga = season.getGoals() + season.getAssists();
        if (position.equals("Вратарь")) {
            gapergame = - (int) Math.round((double) season.getMinutes() / season.getGoalsconceded());
        } else {
            if (ga == 0) {
                gapergame = 0;
            } else {
                double gapergame1 = (double) season.getMinutes() / ga;
                gapergame = (int) Math.round(gapergame1);
            }
        }
    }
}
