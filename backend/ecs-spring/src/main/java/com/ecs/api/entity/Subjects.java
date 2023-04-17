package com.ecs.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Subjects")
@Getter
@Setter
public class Subjects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int SUBJECTS_NO;

    @Column(nullable = false)
    String SUBJECTS_NM;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_NO")
    private Category CATEGORY_NO;
}
