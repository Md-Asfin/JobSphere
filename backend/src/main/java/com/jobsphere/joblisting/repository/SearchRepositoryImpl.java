package com.jobsphere.joblisting.repository;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.jobsphere.joblisting.model.Post;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Component
public class SearchRepositoryImpl implements SearchRepository{

    @Autowired
    MongoClient client;

    @Autowired
    MongoConverter converter;

    @Override
    public List<Post> findByText(String text) {

        final List<Post> posts = new ArrayList<>();

        MongoDatabase database = client.getDatabase("JobListing");
        MongoCollection<Document> collection = database.getCollection("JobPost");

        // Case-insensitive regex search across multiple fields
        String regex = "(?i).*" + text + ".*";
        Document matchStage = new Document("$match", new Document("$or", Arrays.asList(
                new Document("title", new Document("$regex", regex)),
                new Document("description", new Document("$regex", regex)),
                new Document("profile", new Document("$regex", regex)),
                new Document("technologies", new Document("$regex", regex)),
                new Document("company", new Document("$regex", regex)),
                new Document("location", new Document("$regex", regex))
        )));

        Document sortStage = new Document("$sort", new Document("experience", 1L));
        Document limitStage = new Document("$limit", 20L); // fetch up to 20 matching jobs

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(matchStage, sortStage, limitStage));

        result.forEach(doc -> posts.add(converter.read(Post.class, doc)));

        return posts;
    }
}
