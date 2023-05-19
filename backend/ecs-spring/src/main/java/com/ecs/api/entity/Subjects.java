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
    @Column(name="SUBJECTS_NO")
    private int subjectsNo;

    @Column(name="SUBJECTS_NM", nullable = false)
    private String subjectsNM;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_NO")
    private Category categoryNo;
}
