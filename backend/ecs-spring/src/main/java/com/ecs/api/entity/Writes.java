package com.ecs.api.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Writes {
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
