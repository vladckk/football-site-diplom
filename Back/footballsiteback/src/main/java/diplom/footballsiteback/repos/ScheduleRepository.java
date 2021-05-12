package diplom.footballsiteback.repos;

import diplom.footballsiteback.models.Schedule;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends MongoRepository<Schedule, String> {

    List<Schedule> findByDate(LocalDateTime date);

    Optional<Schedule> findByNextMatch(boolean match);

}
