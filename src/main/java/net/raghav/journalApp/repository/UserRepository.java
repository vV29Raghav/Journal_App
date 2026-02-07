package net.raghav.journalApp.repository;


import net.raghav.journalApp.entity.JournalEntry;
import net.raghav.journalApp.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    User findByUserName(String userName);
}
