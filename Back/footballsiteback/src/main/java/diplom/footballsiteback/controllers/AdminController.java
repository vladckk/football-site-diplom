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
    public int addUser(@RequestBody Admin admin) {
        try {
            mongoTemplate.insert(admin);
        } catch (Exception exception) {
            return -1;
        }
        System.out.println(admin.getUsername() + " - " + admin.getPassword() + " - " + admin.getRole());
        return admin.getRole();
    }

    @GetMapping("/login")
    public Admin loginUser(Admin admin) {
        /*
        int role = admin.getRole();
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(admin.getUsername()).and("password").is(admin.getPassword()));
        Admin adm = mongoTemplate.findOne(query, Admin.class);
        if (adm == null) {
            role = -1;
        }*/
        return admin;
    }
}
