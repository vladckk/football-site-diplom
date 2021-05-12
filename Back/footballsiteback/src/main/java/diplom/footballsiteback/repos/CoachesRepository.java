package diplom.footballsiteback.repos;

import diplom.footballsiteback.models.Coach;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CoachesRepository extends MongoRepository<Coach, String> {

    List<Coach> findByStatus(int status);
}
