package com.ecs.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "Category")
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int CATEGORY_NO;

    @Column(nullable = false)
    String CATEGORY_NM;

    @ManyToOne
    @JoinColumn(name = "DRAW_NO")
    private Drawing DRAW_NO;


    @OneToMany(mappedBy = "CATEGORY_NO",cascade = CascadeType.REMOVE)
    private List<Subjects> subjects = new ArrayList<>();

}
