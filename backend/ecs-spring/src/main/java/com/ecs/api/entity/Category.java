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
    @Column(name="CATEGORY_NO")
    private int categoryNo;

    @Column(name = "CATEGORY_NM", nullable = false)
    private String categoryNM;

    @OneToMany(mappedBy = "categoryNo",cascade = CascadeType.ALL)
    private List<Draw> draws = new ArrayList<>();


    @OneToMany(mappedBy = "categoryNo",cascade = CascadeType.REMOVE)
    private List<Subjects> subjects = new ArrayList<>();

}
