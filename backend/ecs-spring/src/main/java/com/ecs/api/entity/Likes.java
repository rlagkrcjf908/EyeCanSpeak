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
    int LIKES_NO;
    @ManyToOne
    @JoinColumn(name = "USERS_NO")
    private Users Users_NO;
    @ManyToOne
    @JoinColumn(name = "DRAW_NO")
    private Drawing DRAW_NO;
}
