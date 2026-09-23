package com.jobsphere.joblisting.repository;

import com.jobsphere.joblisting.model.Post;

import java.util.List;

public interface SearchRepository {

    List<Post> findByText(String text);

}
