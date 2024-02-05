import { AlertsClass } from "./AlertsClass.js";
import { FuncsClass } from "./FuncsClass.js";


const fc = new FuncsClass();


const {isNil, isEmptyArr} = fc;



class ApiClass {
    instanceAxios = null;
    alertClass = null;
    baseURL = 'https://www.thecocktaildb.com/api/json/v1/1'
    prefij = 'search.php?'

    constructor(){
        this.createInstanceAxios();
        this.initInstances();
    }
    
    initInstances () {
        this.alertClass = new AlertsClass();
    }

    createInstanceAxios () {
        this.instanceAxios = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
            // headers: {'X-Custom-Header': 'foobar'}
          });
    }

    async getRandomDrinks (data = {}) {
        try {
            
            let arrDrinks = [];
            for (let i = 0; i < data.qty; i++) {
                const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
                if (isNil(response) === false && response?.status === 200) {
                    if (isNil(response?.data?.drinks) === false) {
                        arrDrinks = [...arrDrinks, ...response.data.drinks];
                    }
                }
                               
            }
            return arrDrinks;

        } catch (error) {
            this.alertClass.simpleAlert({
                title: 'Ouh!',
                text: 'We had a problem. Try again please',
                icon: 'info', 
                confirmButtonText:'Ok'});
        } finally {

        }
        


    }

    async getCocktailByLetter (data = {}) {
        try {
            
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${data.letter}`);

            let dataResponse = null;

            if (isNil(response) === false && response?.status === 200) {
                if (isNil(response?.data) === false) {
                    dataResponse = response.data;
                }
            }

            return dataResponse;

        } catch (error) {
            this.alertClass.simpleAlert({
                title: 'Ouh!',
                text: 'We had a problem. Try again please',
                icon: 'info', 
                confirmButtonText:'Ok'});
        } finally {

        }
        


    }

    async getCocktailsWithAlcohol (data = {}) {
        try {
            
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`);

            let dataResponse = null;

            if (isNil(response) === false && response?.status === 200) {
                if (isNil(response?.data) === false) {
                    dataResponse = response.data;
                }
            }

            if (dataResponse?.drinks?.length > 15) {
                dataResponse = dataResponse?.drinks?.slice(0, 15);
            }

            const fullInfoDrinks = await this.getCocktailByID(dataResponse);
            return fullInfoDrinks;

        } catch (error) {
            this.alertClass.simpleAlert({
                title: 'Ouh!',
                text: 'We had a problem. Try again please',
                icon: 'info', 
                confirmButtonText:'Ok'});
        } finally {

        }
        


    }

    
    async getCocktailsWithouthAlcohol (data = {}) {
        try {
            
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`);

            let dataResponse = null;

            if (isNil(response) === false && response?.status === 200) {
                if (isNil(response?.data) === false) {
                    dataResponse = response.data;
                }
            }

            if (dataResponse?.drinks?.length > 15) {
                dataResponse = dataResponse?.drinks?.slice(0, 15);
            }

            const fullInfoDrinks = await this.getCocktailByID(dataResponse);
            return fullInfoDrinks;

        } catch (error) {
            this.alertClass.simpleAlert({
                title: 'Ouh!',
                text: 'We had a problem. Try again please',
                icon: 'info', 
                confirmButtonText:'Ok'});
        } finally {

        }
        


    }

    async getCocktailByName (data = {}) {
        try {
            // this.instanceAxios.get('s=margarita')
            const response = await this.instanceAxios.get(`${this.prefij}s=${data.name}`)

            let dataResponse = null;

            if (isNil(response) === false && response?.status === 200) {
                if (isNil(response?.data) === false) {
                    dataResponse = response.data;
                }
            }

            return dataResponse;

        } catch (error) {
            this.alertClass.simpleAlert({
                title: 'Ouh!',
                text: 'We had a problem. Try again please',
                icon: 'info', 
                confirmButtonText:'Ok'});
        } finally {

        }
        


    }

    async getCocktailByID (data = []) {
        let dataResponse = [];
        try {
            const lengthValues = data.length;
            for (let i = 0; i < lengthValues; i++) {
                const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${data[i].idDrink}`);
                const objResult = response.data.drinks[0];
                dataResponse = [...dataResponse, objResult];
            }

            return dataResponse;
            
        } catch (error) {
            console.log(error);
            
            this.alertClass.simpleAlert({
                title: 'Ouh!',
                text: 'We had a problem. Try again please',
                icon: 'info', 
                confirmButtonText:'Ok'});
        } finally {
            
        }
        


    }

    async getCocktailByIngredient (data = {}) {
        try {
            // this.instanceAxios.get('s=margarita')
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${data.ingredient}`);

            let dataResponse = null;
            
            if (isNil(response) === false && response?.status === 200) {
                if (isNil(response?.data) === false ) {
                    dataResponse = response.data;
                }
            }

            return dataResponse;

        } catch (error) {
            console.log('error', error);
            this.alertClass.simpleAlert({
                title: 'Ouh!',
                text: 'We had a problem. Try again please',
                icon: 'info', 
                confirmButtonText:'Ok'});
        } finally {

        }
        


    }
}

export {ApiClass};