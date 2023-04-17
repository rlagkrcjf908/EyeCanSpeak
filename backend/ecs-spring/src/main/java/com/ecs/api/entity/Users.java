package com.ecs.api.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int USER_NO;

    private String USER_ID;

    private String USER_NAME;

    private String USER_NICKNAME;

    @CreatedDate
    private LocalDateTime USER_CREATE_DATE;

    @LastModifiedDate
    private LocalDateTime USER_RECENT_DATE;

    @OneToMany(mappedBy = "USER_NO", cascade = CascadeType.REMOVE)
    private List<Write> writes= new ArrayList<>();

    @OneToMany(mappedBy = "USER_NO", cascade = CascadeType.REMOVE)
    private List<Draw> draws= new ArrayList<>();

    @OneToMany(mappedBy = "USER_NO", cascade = CascadeType.REMOVE)
    private List<Likes> likes= new ArrayList<>();
}