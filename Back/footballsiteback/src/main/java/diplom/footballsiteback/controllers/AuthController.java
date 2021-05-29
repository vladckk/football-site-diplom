package diplom.footballsiteback.controllers;

import diplom.footballsiteback.models.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    MongoTemplate mongoTemplate;

    @PostMapping("/registry")
    public int addUser(@RequestBody Admin admin) {
        try {
            mongoTemplate.insert(admin);
        } catch (Exception exception) {
            return -1;
        }
        System.out.println(admin.getUsername() + " - " + admin.getRole());
        return admin.getRole();
    }

    @PostMapping("/login")
    public Admin loginUser(@RequestBody Admin admin) {
        System.out.println(admin);
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(admin.getUsername()).and("password").is(admin.getPassword()));
        Admin adm = mongoTemplate.findOne(query, Admin.class);
        if (adm != null) {
            adm.setPassword(null);
        }
        System.out.println(adm);
        return adm;
    }
}
