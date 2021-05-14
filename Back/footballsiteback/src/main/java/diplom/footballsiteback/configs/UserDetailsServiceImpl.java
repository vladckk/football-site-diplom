package diplom.footballsiteback.configs;

import diplom.footballsiteback.models.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(s));
        Admin admin = mongoTemplate.findOne(query, Admin.class);
        System.out.println(admin);
        if (admin == null) {
            return null;
        }
        if (admin.getRole() == 2) {
            admin.setRole(1);
        }
        Role role = Role.values()[admin.getRole()];
        System.out.println(role);
        Set<SimpleGrantedAuthority> authorities = role.getAuthorities();
        authorities.add(new SimpleGrantedAuthority(role.name()));
        return new User(admin.getUsername(), admin.getPassword(), authorities);
    }
}
