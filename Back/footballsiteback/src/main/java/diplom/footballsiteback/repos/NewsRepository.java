package diplom.footballsiteback.repos;

import diplom.footballsiteback.models.News;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NewsRepository extends MongoRepository<News, String> {

}
