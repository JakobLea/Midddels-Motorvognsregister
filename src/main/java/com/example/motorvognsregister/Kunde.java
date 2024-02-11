package com.example.motorvognsregister;

public class Kunde {
    private int id;
    private String navn;
    private String adresse;
    private String persNr;
    private String bilskilt;
    private String bilMerke;
    private String bilModell;


    public Kunde() {
    }

    public Kunde(int id, String navn, String adresse, String persNr, String bilskilt, String bilMerke, String bilModell) {
        this.id = id;
        this.navn = navn;
        this.adresse = adresse;
        this.persNr = persNr;
        this.bilskilt = bilskilt;
        this.bilMerke = bilMerke;
        this.bilModell = bilModell;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getPersNr() {
        return persNr;
    }

    public void setPersNr(String persNr) {
        this.persNr = persNr;
    }

    // Getter and setter for bilskilt
    public String getBilskilt() {
        return bilskilt;
    }

    public void setBilskilt(String bilskilt) {
        this.bilskilt = bilskilt;
    }

    public String getBilMerke() {
        return bilMerke;
    }

    public void setBilMerke(String bilMerke) {
        this.bilMerke = bilMerke;
    }

    public String getBilModell() {
        return bilModell;
    }

    public void setBilModell(String bilModell) {
        this.bilModell = bilModell;
    }
}