const capitalCities = require('./capitalCities'); // m

const moment = require('moment-timezone'); // m

// dans la doc, c'est marqué que pour changer de langue d'affichage, on a juste à appeler cette méthode, directement sur l'objet moment
// je teste et je valide : ça marche
moment.locale('fr'); // m

const cityTime = {
    getCityTime: (cityName) => {
        // old school, long et moche
        /*
        let theRightCapital;
        for (let capital of capitalCities) {
            // pour ne plus dépendre de la casse, je vais passer le paramètre de l'url ET le nom de la capitale en cours en minuscules
            if (cityName.toLowerCase() === capital.name.toLowerCase()) {
                theRightCapital = capital;
            }
        }*/

        // stylé, glamour et esthétique
        let theRightCapital = capitalCities.filter((city) => city.name.toLowerCase() === cityName.toLowerCase()).pop();


        // ou false si la ville n'est pas trouvée
        if (!theRightCapital) {
            return false;
        }

        // 2. récupérer la timezone de cette ville
        let theRightTimezone = theRightCapital.tz;

        // 3. formater la date et l'heure pour un affichage correct
        

        // retournera un objet Moment pour la ville demandée
        let theMoment = moment().tz(theRightTimezone);
        // finalement, un objet, qu'il vienne d'un module ou pas, reste un objet, donc on peut lui ajouter une nouvelle prop ou une nouvelle méthode si on le souhaite
        theMoment.city = theRightCapital.name;
        return theMoment;
    }
};

module.exports = cityTime;