package diplom.footballsiteback.models;

import lombok.Data;

@Data
public class TeamStats {

    private int win;
    private int draw;
    private int lose;
    private int goalsFor;
    private int goalsAgainst;
    private int goalsDiff;
    private double scorePercent;
    private double averageGoalsPerGame;
    private double averageScoredGoalsPerGame;
    private double winPercent;

    public TeamStats(Team team) {
        win = team.getWin();
        draw = team.getDraw();
        lose = team.getLose();
        goalsFor = team.getGoalsFor();
        goalsAgainst = team.getGoalsAgainst();
        goalsDiff = goalsFor - goalsAgainst;
        int games = win + draw + lose;
        if (games == 0) {
            scorePercent = 0;
            averageScoredGoalsPerGame = 0;
            averageGoalsPerGame = 0;
            winPercent = 0;
        } else {
            scorePercent = (double)((win * 3) + draw)/(games * 3);
            scorePercent = (double)Math.round(1000 * scorePercent) / 10;
            averageGoalsPerGame = (double)(goalsFor + goalsAgainst) / games;
            averageGoalsPerGame = (double) Math.round(10 * averageGoalsPerGame) / 10;
            averageScoredGoalsPerGame = (double) goalsFor / games;
            averageScoredGoalsPerGame = (double) Math.round(10 * averageScoredGoalsPerGame) / 10;
            winPercent = (double) win / games;
            winPercent = (double) Math.round(1000 * winPercent) / 10;
        }
    }
}
