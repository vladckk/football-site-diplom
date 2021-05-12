package diplom.footballsiteback.repos;

import diplom.footballsiteback.models.Table;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TableRepository extends MongoRepository<Table, String> {

    Optional<Table> findByYear(int year);
}
