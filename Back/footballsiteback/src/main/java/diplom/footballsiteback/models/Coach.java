package diplom.footballsiteback.models;

import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@Data
@Document(value = "coaches")
public class Coach {

    @Id
    private String _id;
    private String fullname;
    private String position;
    private String bio;
    private LocalDate birthdate;

    @Field(name = "team-status")
    private int status;
    private String[] periods;
    private Binary image;
}
