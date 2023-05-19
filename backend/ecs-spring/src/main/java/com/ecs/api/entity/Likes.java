package com.ecs.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name = "Likes")
@Getter
@Setter
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="LIKES_NO")
    private int likesNo;
    @ManyToOne
    @JoinColumn(name = "USERS_NO")
    private Users usersNo;
    @ManyToOne
    @JoinColumn(name = "DRAW_NO")
    private Draw drawNo;
}
