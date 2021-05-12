package diplom.footballsiteback.repos;

import diplom.footballsiteback.models.Player;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PlayersRepository extends MongoRepository<Player, String> {
    List<Player> findByPosition(String position);
}
