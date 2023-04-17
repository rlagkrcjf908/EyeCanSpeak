package com.ecs.api.entity;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Write {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="WRITE_NO")
    private int writeNo;

    @Column(name="WRITE_CONTENT")
    private String writeContent;

    @CreatedDate
    @Column(name="WRITE_DATE")
    private LocalDateTime writeDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USERS_NO")
    private Users usersNo;
}
