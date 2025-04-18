package com.mural.recados.repository;

import com.mural.recados.entity.Recado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecadoRepository extends JpaRepository<Recado, Long> {
}
