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
    @Column(name="USERS_NO")
    private int usersNo;

    @Column(name="USERS_ID")
    private String usersId;

    @Column(name="USERS_NAME")
    private String usersName;

    @Column(name="USERS_NICKNAME")
    private String usersNickName;

    @CreatedDate
    @Column(name="USERS_CREATE_DATE")
    private LocalDateTime usersCreateDate;

    @LastModifiedDate
    @Column(name="USERS_RECENT_DATE")
    private LocalDateTime usersRecentDate;

    @OneToMany(mappedBy = "usersNo", cascade = CascadeType.REMOVE)
    private List<Write> writes= new ArrayList<>();

    @OneToMany(mappedBy = "usersNo", cascade = CascadeType.REMOVE)
    private List<Draw> draws= new ArrayList<>();

    @OneToMany(mappedBy = "usersNo", cascade = CascadeType.REMOVE)
    private List<Likes> likes= new ArrayList<>();
}