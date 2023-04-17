package com.ecs.api.entity;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Write {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int WRITE_NO;

    private String WRITE_CONTENT;

    @CreatedDate
    private LocalDateTime WRITE_DATE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO")
    private Users USER_NO;
}
