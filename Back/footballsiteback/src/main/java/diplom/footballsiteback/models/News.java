package diplom.footballsiteback.models;

import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "news")
public class News {

    @Id
    private String _id;
    private String mainTitle;
    private String title;
    private String text;
    private List<Binary> image;
    private LocalDateTime date;
    private String videolink;

}
