package diplom.footballsiteback.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "info")
public class Info {

    @Id
    private String _id;
    private int year;
    private String info;
}
