package diplom.footballsiteback.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Admin {

    @Id
    public String id;
    private String username;
    private String password;
    private int role;

    public Admin(String username, String password, int role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
