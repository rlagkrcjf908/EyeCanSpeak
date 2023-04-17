package com.ecs.api.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "Drawing")
@Getter
@Setter
public class Draw {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int DRAW_NO;

    @Column(nullable = false)
    String DRAW_DRAWING;

    @LastModifiedDate
    private LocalDateTime DRAW_DATE;
    @Column(nullable = false)
    boolean DRAW_POST_TF;

    @ManyToOne
    @JoinColumn(name = "USERS_NO")
    private Users USERS_NO;

    @OneToMany(mappedBy = "DRAW_NO",cascade = CascadeType.REMOVE)
    private List<Category> categories = new ArrayList<>();


    @OneToMany(mappedBy = "DRAW_NO",cascade = CascadeType.REMOVE)
    private List<Likes> likes = new ArrayList<>();

}
