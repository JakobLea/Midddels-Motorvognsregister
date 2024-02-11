package com.example.motorvognsregister;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class KundeController {

    @Autowired
    KundeRepository rep;

    @PostMapping("/lagre")
    public void lagreKunde(Kunde innKunde){
        rep.lagreKunde(innKunde);
    }
    @GetMapping("/hentAlle")
    public List<Kunde> hentAlle(){
        return rep.hentAlleKunder();
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlleKunder();
    }
}
