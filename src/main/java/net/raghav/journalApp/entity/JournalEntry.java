package net.raghav.journalApp.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.ExistsQuery;

import java.time.LocalDateTime;
import java.util.*;

@Document(collection = "journal_entries")

@Data
@NoArgsConstructor
public class JournalEntry {

    @Id
    private ObjectId id;

    @NonNull
    private String title;

    private String content;

    private LocalDateTime date;


}
