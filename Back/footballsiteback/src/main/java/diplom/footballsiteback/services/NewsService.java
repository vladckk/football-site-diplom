package diplom.footballsiteback.services;

import diplom.footballsiteback.repos.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

}
