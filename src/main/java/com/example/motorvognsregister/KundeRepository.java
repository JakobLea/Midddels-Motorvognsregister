package com.example.motorvognsregister;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KundeRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreKunde(Kunde kunde) {
        String sql = "INSERT INTO Kunde (navn,adresse,persNr,bilskilt,bilMerke,bilModell) VALUES(?,?,?,?,?,?)";
        db.update(sql, kunde.getNavn(), kunde.getAdresse(), kunde.getPersNr(), kunde.getBilskilt(), kunde.getBilMerke(), kunde.getBilModell());
    }

    public List<Kunde> hentAlleKunder() {
        String sql = "SELECT * FROM Kunde";
        List<Kunde> alleKunder = db.query(sql,new BeanPropertyRowMapper(Kunde.class));
        return alleKunder;
    }

    public void slettAlleKunder () {
        String sql = "DELETE FROM Kunde";
        db.update(sql);
    }
}