package com.ecs.api.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="USERS_NO")
    private int usersNo;

    @Column(name="USERS_ID")
    private String usersId;

    @Column(name="USERS_NICKNAME")
    private String usersNickName;

    @CreatedDate
    @Column(name="USERS_CREATE_DATE")
    private LocalDateTime usersCreateDate;

    @LastModifiedDate
    @Column(name="USERS_RECENT_DATE")
    private LocalDateTime usersRecentDate;

    @OneToMany(mappedBy = "usersNo", cascade = CascadeType.REMOVE)
    private List<Writes> writes= new ArrayList<>();

    @OneToMany(mappedBy = "usersNo", cascade = CascadeType.REMOVE)
    private List<Draw> draws= new ArrayList<>();

    @OneToMany(mappedBy = "usersNo", cascade = CascadeType.REMOVE)
    private List<Likes> likes= new ArrayList<>();
}