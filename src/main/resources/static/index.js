$(function(){  // kjøres når dokumentet er ferdig lastet
    hentAlle();
});

$(document).ready(function() {
    // Bind change event listener to input fields
    $('input').change(function() {
        $(this).removeClass('invalid-field');
    });
});

function regKunde() {
    const kunde = {
        navn : $("#navn").val(),
        adresse : $("#adresse").val(),
        persNr : $("#persNr").val(),
        bilskilt : $("#bilskilt").val(),
        bilMerke : $("#bilMerke").val(),
        bilModell : $("#bilModell").val()
    };

    // Validate all fields to ensure they are not empty
    let invalidFields = [];
    if (kunde.navn.trim() === '') {
        invalidFields.push('navn');
    }
    if (kunde.adresse.trim() === '') {
        invalidFields.push('adresse');
    }
    if (kunde.persNr.trim() === '' || !validatePersonNr(kunde.persNr)) {
        invalidFields.push('persNr');
    }
    if (kunde.bilskilt.trim() === '' || !/^[A-Za-z]{2}\d{5}$/.test(kunde.bilskilt)) {
        invalidFields.push('bilskilt');
    }
    if (kunde.bilMerke.trim() === '') {
        invalidFields.push('bilMerke');
    }
    if (kunde.bilModell.trim() === '') {
        invalidFields.push('bilModell');
    }

    if (invalidFields.length > 0) {
        alert("Vennligst fyll ut alle felt korrekt");
        invalidFields.forEach(field => {
            $(`#${field}`).addClass('invalid-field');
        });
        return;
    }

    // Clear invalid field highlighting
    $('.invalid-field').removeClass('invalid-field');

    // Validate persNr to ensure it contains only numbers
    if (!/^\d+$/.test(kunde.persNr)) {
        return;
    }

    // Validate bilskilt to contain first 2 letters followed by 5 numbers
    if (!/^[A-Za-z]{2}\d{5}$/.test(kunde.bilskilt)) {
        return;
    }

    const url = "/lagre";
    $.post(url, kunde, function(resultat){
        hentAlle();
    });
    $("#navn").val(""); //tøm input-feltene
    $("#adresse").val("");
    $("#persNr").val("");
    $("#bilskilt").val("");
    $("#bilMerke").val("");
    $("#bilModell").val("");
}


function validatePersonNr(personNr) {
    // Check if personnummer is 11 digits
    if (personNr.length !== 11) {
        return false;
    }

    const individualNumber = personNr.substring(6, 11);

    // Check if individualNumber is between 00001 and 99999
    const individualNumberInt = parseInt(individualNumber, 10);
    if (isNaN(individualNumberInt) || individualNumberInt < 1 || individualNumberInt > 99999) {
        return false;
    }

    const day = parseInt(personNr.substring(0, 2), 10);
    const month = parseInt(personNr.substring(2, 4), 10);
    let year = parseInt(personNr.substring(4, 6), 10);

    // Add 1900 to the year if it's less than 30, 2000 if less than 100, 1800 if between 100 and 130
    year += year < 30 ? 2000 : (year < 100 ? 1900 : (year >= 100 && year < 130 ? 1800 : 0));

    // Check if the birthdate is valid
    if (
        isNaN(day) || isNaN(month) || isNaN(year) ||
        day < 1 || day > 31 ||
        month < 1 || month > 12 ||
        (year < 1800 || (year >= 1800 && year <= 1899) || (year >= 2100))
    ) {
        return false;
    }

    const k1 = parseInt(personNr.charAt(9), 10);
    const k2 = parseInt(personNr.charAt(10), 10);

    const weights = [3, 7, 6, 1, 8, 9, 4, 5, 2];

    const checksum = weights.reduce((sum, weight, index) => {
        return sum + weight * parseInt(personNr.charAt(index), 10);
    }, 0);

    const remainder = checksum % 11;
    const expectedCheckDigit = remainder === 0 ? 0 : 11 - remainder;

    return k1 === expectedCheckDigit && k2 === (k1 === 10 ? 0 : k2 === 10 ? 0 : k2);
}

function hentAlle() {
    $.get( "/hentAlle", function( data ) {
        formaterData(data);
    });
}

function formaterData(kunder){
    var ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Navn</th><th>Adresse</th><th>Personnummer</th><th>Bilskilt</th><th>Bilmerke</th><th>Bilmodell</th>" +
        "</tr>";
    for(let i in kunder ){
        ut+="<tr><td>"+kunder[i].navn+"</td><td>"+kunder[i].adresse+"</td><td>"+kunder[i].persNr+"</td><td>"+kunder[i].bilskilt+"</td><td>"+kunder[i].bilMerke+"</td><td>"+kunder[i].bilModell+"</td></tr>";
    }
    $("#kundene").html(ut);
}

function slettKundene() {
    $.get( "/slettAlle", function( data ) {
        hentAlle();
    });
}

const carModels = {
    acura: ['MDX', 'RDX', 'TLX', 'ILX', 'NSX', 'RLX'],
    alfa_romeo: ['Giulia', 'Stelvio', '4C'],
    aston_martin : ['DB11', 'DBS Superleggera', 'Vantage', 'Rapide', 'Valhalla'],
    audi: ['A4', 'A6', 'Q5', 'Q7', 'Q3', 'A3', 'A8', 'Q8', 'e-tron', 'RS6 Avant', 'TT', 'R8'],
    bentley: ['Bentayga', 'Continental GT', 'Flying Spur', 'Mulsanne', 'Bacalar'],
    bmw: ['3 Series', '5 Series', '7 Series', 'iX', 'X3', 'X5', 'X1', '4 Series', 'X7', '2 Series', '8 Series', 'Z4', 'i3'],
    bugatti: ['Chiron', 'Divo', 'Centodieci', 'La Voiture Noire'],
    buick: ['Encore', 'Enclave', 'Envision', 'Regal', 'Cascada'],
    cadillac: ['XT5', 'Escalade', 'XT4', 'CT5', 'CT4', 'ATS', 'XT6'],
    chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Camaro', 'Tahoe', 'Traverse', 'Colorado', 'Blazer', 'Suburban', 'Trailblazer', 'Spark', 'Impala'],
    chrysler: ['Pacifica', 'Voyager', '300', 'Aspen'],
    dodge: ['Durango', 'Charger', 'Challenger', 'Journey', 'Viper'],
    ferrari: ['F8 Tributo', '812 Superfast', 'Roma', 'SF90 Stradale', 'Portofino'],
    fiat: ['500', '500X', '500L', '124 Spider'],
    fisker: ['Ocean', 'Emotion'],
    ford: ['F-150', 'Focus', 'Escape', 'Explorer', 'Mustang', 'Edge', 'Ranger', 'Fusion', 'Expedition', 'Bronco', 'Mach-E', 'Transit'],
    genesis: ['G80', 'G90', 'GV80', 'GV70'],
    gmc: ['Sierra 1500', 'Yukon', 'Acadia', 'Terrain', 'Canyon', 'Denali'],
    honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V', 'Ridgeline', 'Insight', 'Passport', 'S2000'],
    hyundai: ['Elantra', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Sonata', 'Venue', 'Ioniq', 'Veloster', 'Genesis', 'Nexo'],
    infiniti: ['QX60', 'QX50', 'Q50', 'QX80', 'QX30', 'Q60', 'QX70'],
    jaguar: ['F-PACE', 'E-PACE', 'I-PACE', 'XF', 'XJ', 'XE'],
    jeep: ['Grand Cherokee', 'Cherokee', 'Wrangler', 'Compass', 'Renegade', 'Gladiator', 'Wagoneer', 'Grand Wagoneer'],
    kia: ['Seltos', 'Sportage', 'Telluride', 'Sorento', 'Forte', 'Soul', 'Niro', 'Cadenza', 'Stinger', 'Rio', 'Optima', 'K900'],
    koenigsegg: ['Jesko', 'Gemera', 'Regera', 'Ragnarok'],
    lamborghini: ['Urus', 'Huracán', 'Aventador', 'Sián FKP 37', 'Essenza SCV12'],
    land_rover: ['Range Rover', 'Discovery', 'Defender', 'Range Rover Sport', 'Range Rover Velar', 'Evoque'],
    lexus: ['RX', 'NX', 'ES', 'UX', 'GX', 'IS', 'LS', 'LC', 'LX', 'RC', 'CT', 'LFA'],
    lincoln: ['Navigator', 'Aviator', 'Corsair', 'Nautilus', 'Continental', 'MKZ'],
    lotus: ['Evora', 'Elise', 'Exige', 'Elan', 'Esprit'],
    lucid: ['Air', 'Air Touring', 'Air Grand Touring', 'Air Dream Edition'],
    maserati: ['Levante', 'Ghibli', 'Quattroporte', 'GranTurismo', 'MC20'],
    mazda: ['CX-5', 'Mazda3', 'CX-9', 'Mazda6', 'MX-5 Miata', 'CX-30', 'RX-7', 'RX-8', 'Mazdaspeed3'],
    mclaren: ['720S', '570S', 'GT', 'Speedtail', 'Artura'],
    mercedes_benz: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class', 'CLA', 'GLA', 'G-Class', 'GLS', 'SLC', 'SL'],
    mini: ['Cooper', 'Countryman', 'Clubman', 'Paceman'],
    nissan: ['Rogue', 'Altima', 'Sentra', 'Murano', 'Pathfinder', 'Titan', 'Maxima', 'Armada', 'Versa', 'Kicks', '370Z', 'Leaf'],
    pagani: ['Huayra', 'Huayra Roadster', 'Huayra BC', 'Huayra Roadster BC'],
    polestar: ['Polestar 2'],
    porsche: ['911', 'Cayenne', 'Panamera', 'Macan', 'Taycan', 'Boxster', 'Cayman', '718 Spyder', '911 GT3'],
    ram: ['1500', '2500', '3500', 'ProMaster', 'ProMaster City', 'Rebel TRX'],
    rivian: ['R1T', 'R1S'],
    rolls_royce : ['Phantom', 'Cullinan', 'Ghost', 'Wraith', 'Dawn'],
    subaru: ['Outback', 'Forester', 'Crosstrek', 'Ascent', 'Impreza', 'Legacy', 'BRZ', 'WRX', 'XV Crosstrek'],
    tesla: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck', 'Roadster', 'Model X Plaid', 'Model S Plaid'],
    toyota: ['Camry', 'Corolla', 'Rav4', 'Highlander', 'Prius', 'Sienna', 'Tacoma', 'Tundra', '4Runner', 'Land Cruiser', 'Supra', 'Yaris'],
    volkswagen: ['Golf', 'Passat', 'Tiguan', 'Atlas', 'Jetta', 'Arteon', 'ID.4', 'Touareg', 'Atlas Cross Sport', 'Taos', 'Beetle', 'CC'],
    volvo: ['XC90', 'XC60', 'S60', 'S90', 'V60', 'V90', 'XC40', 'C40', 'Polestar 2', 'V60 Cross Country'],
};
function updateModellList() {
    const selectedBrand = document.getElementById('bilMerke').value.toLowerCase();
    const modelList = document.getElementById('bilModellList');
    modelList.innerHTML = ''; // Clear previous options

    if (carModels[selectedBrand]) {
        carModels[selectedBrand].forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            modelList.appendChild(option);
        });
    }
}

function fillFields() {
    // Predefined values
    const predefinedValues = {
        navn: "John Doe",
        adresse: "123 Main St",
        persNr: "07032918993",
        bilskilt: "AB12345",
        bilMerke: "Toyota",
        bilModell: "Camry"
    };

    // Fill out each field with predefined value
    Object.keys(predefinedValues).forEach(field => {
        $("#" + field).val(predefinedValues[field]);
    });
}
