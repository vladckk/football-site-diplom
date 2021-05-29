package diplom.footballsiteback.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(value = "tables")
@Data
public class Table {

    @Id
    private String _id;
    private String name;
    @Indexed(unique = true)
    private int year;
    private List<Team> teams;

}
