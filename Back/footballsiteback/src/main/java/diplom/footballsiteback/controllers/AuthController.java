package diplom.footballsiteback.controllers;

import diplom.footballsiteback.models.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/registry")
    public int addUser(@RequestBody Admin admin) {
        try {
            admin.setPassword(passwordEncoder.encode(admin.getPassword()));
            System.out.println(admin.getPassword());
            mongoTemplate.insert(admin);
        } catch (Exception exception) {
            return -1;
        }
        System.out.println(admin.getUsername() + " - " + admin.getRole());
        return admin.getRole();
    }

    @PostMapping("/login")
    public Admin loginUser(@RequestBody Admin admin) {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(admin.getUsername()));
        Admin adm = mongoTemplate.findOne(query, Admin.class);
        boolean match = false;
        if (adm != null) {
            match = passwordEncoder.matches(admin.getPassword(), adm.getPassword());
            System.out.println(match);
        }
        if (match) {
            adm.setPassword(null);
            return adm;
        } else {
            return null;
        }
    }
}
