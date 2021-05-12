package diplom.footballsiteback.controllers;

import com.mongodb.MongoWriteException;
import diplom.footballsiteback.models.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    MongoTemplate mongoTemplate;

    @PostMapping("/registry")
    public boolean addUser(@RequestBody Admin admin) {
        boolean check = false;
        try {
            mongoTemplate.insert(admin);
        } catch (Exception exception) {
            check = true;
        }
        System.out.println(admin.getUsername() + " - " + admin.getPassword() + " - " + check);
        return check;
    }

    @PostMapping("/login")
    public int loginUser(@RequestBody Admin admin) {
        int role = admin.getRole();
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(admin.getUsername()).and("password").is(admin.getPassword()));
        Admin adm = mongoTemplate.findOne(query, Admin.class);
        if (adm == null) {
            role = 0;
        }
        return role;
    }
}
