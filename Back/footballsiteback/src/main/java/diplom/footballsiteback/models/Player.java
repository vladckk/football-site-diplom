package diplom.footballsiteback.models;

import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@Document(value = "players")
public class Player {

    @Id
    private String _id;
    private String fullname;
    private int height;
    private int weight;
    private String position;
    private Season[] seasons;
    private LocalDate birthdate;
    private boolean inClub;
    private String bio;
    private String[] achievements;
    private Binary image;
}
