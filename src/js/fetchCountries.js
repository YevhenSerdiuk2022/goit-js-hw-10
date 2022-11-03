export default class ApifetchCountries {
    constructor() {
        this.trimValue = '';
    }
    fetchCountries() {
     
        const url = `https://restcountries.com/v3.1/name/${this.trimValue}?fields=name,capital,population,flags,languages`;
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        return [];
                    }
                    throw new Error(response.status);
                }
                return response.json();
                
            })
            .catch(error => {
                console.error(error);
        })
       
    }

    get provalue() {
        return this.trimValue;
    }

    set provalue(newValue) {
        this.trimValue = newValue;
    }

}