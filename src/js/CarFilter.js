class CarFilter {
    constructor(element) {
        //grab the elements which will tell us filtering and ordering information

        //bringing in the car card array and setting it global to be used anywhere within the class

        this.element = element;

        //define and check for existence of all car cards
        //Using  Array.from to convert the nodlist to an array
        //for use with array methods later on
        this.cards = Array.from(this.element.querySelectorAll(".js-car-card"));
        if (this.cards.length === 0) return;

        //define and check for existence of all filters
        this.filters = Array.from(this.element.querySelectorAll(".js-car-filter"));
        if (this.filters.length === 0) return;

        // define and check for existence of both order selectors
        this.orders = this.element.querySelector(".js-car-order");
        if (this.orders == null) return;

        //define and check for the random card button
        this.randomButton = this.element.querySelector(".js-random-card");
        if (this.randomButton == null) return;

        this.resetButton = this.element.querySelector(".js-reset-cards");
        if (this.resetCards == null) return;

        // i'll define this card container becasue there are multiple time 
        // where i'll need to target all cards within the container
        
        this.cardContainer = this.element.querySelector(".js-card-container");

        this.bindEvents();
    }

    bindEvents() {
        //loop through all of my order drop down selectors
        this.filters.map(filter => {
            this.bindEvent(filter, "change", () => this.checkCards(this.cards));
        });

        //loop through dropdown order selectors
        this.bindEvent(this.orders, "click", () => {
            const { value } = this.orders;
            this.switchOrder(value, this.cards);
        });
        
        //Show random card button being clicked
        this.bindEvent(this.randomButton, "click", () => this.showRandomCard(this.cards));

        // reset cards buttom being clicked
        this.bindEvent(this.resetButton, "click", () => this.resetCards(this.cards));
    }


    bindEvent(element, type, callback) {
        element.addEventListener(type, callback);
    }

    resetCards(cards) {

        this.removeAllCards(cards);

        cards.map(card => this.cardContainer.appendChild(card));
    }

    removeAllCards(cards) {

        cards.map(card => {
            card.remove();
            card.classList.remove("is-hidden");
        })
    }



    showRandomCard(cards) {
        let randomCard = this.getRandomCard(this.cards);

        cards.filter(card => card == randomCard ? card.classList.remove("is-hidden") : card.classList.add("is-hidden"));
    }

    // randomizer function to be use for random car selector
    getRandomCard(cards) {
      // return Math.floor(Math.random() * Math.floor(max));

      let randomCard = cards[Math.floor(Math.random()*cards.length)];
      return randomCard;

    }

    checkCards(cards) {
        // destructure the return arrays of checked checkboxes
        let {checkedFilterDataArray, checkedFilterManufacturerDataArray, checkedFilterColourDataArray}  = this.checkedFilterData();

        cards.map(card => {
            let card_colour = card.getAttribute("data-colour").toLowerCase();
            let card_manufacturer = card.getAttribute("manufacturer").toLowerCase();

            /*  
                this was tricky and seems abit conveluded, too many ifs
                there must be a way of doing this using less lines of code            
            */

            
            if ( !checkedFilterManufacturerDataArray.length == false && !checkedFilterColourDataArray.length == false ) {

                //if the car has both the filters selected show it else dont
                if ( checkedFilterDataArray.includes(card_colour) && checkedFilterDataArray.includes(card_manufacturer) ) {

                        card.classList.remove("is-hidden");
                        
                } else {

                    card.classList.add("is-hidden");
                    
                }


            } else if ( checkedFilterManufacturerDataArray.length == 0 && checkedFilterColourDataArray.length == 0 ) {
                // if there are no filters selected reset and show all cars
                card.classList.remove("is-hidden");

                
            } else {
                //if the car has the filter/ filters selected show it else dont
                if ( checkedFilterDataArray.includes(card_colour) || checkedFilterDataArray.includes(card_manufacturer ) ) {

                        card.classList.remove("is-hidden");
                
                } else {

                    card.classList.add("is-hidden");
                    
                }

            }

        });
    }

    checkedFilterData() {

        // not supported by DOCKERRR - works in code pen
        // let checkBoxes = this.filters
        // const gooo = checkBoxes.filter(checkBox => (checkBox.checked));

        let checkedFilterDataArray = [];
        let checkedFilterColourDataArray = [];
        let checkedFilterManufacturerDataArray = [];

        // loop through filter checkboxes checking which ones are checked
        this.filters.map(filter => {
            if (filter.checked) {
                let checkedFilter = filter;

                //grab colour and manufacturer of checkbox[i]
                let checkedFilterManufacturerData = checkedFilter.getAttribute("data-filter-manufacturer");
                let checkedFilterColourData = checkedFilter.getAttribute("data-filter-colour");
                
                // form two arrays - one for individual filter categories and one for 
                // all filters both will be used for checks
                
                if (checkedFilterManufacturerData) {
                    checkedFilterDataArray.push(checkedFilterManufacturerData);
                    checkedFilterManufacturerDataArray.push(checkedFilterManufacturerData);
                }
                if (checkedFilterColourData) {
                    checkedFilterDataArray.push(checkedFilterColourData);
                    checkedFilterColourDataArray.push(checkedFilterColourData);
                }

            }
        });

        return {
            //labelling returned values to save time after function cal
            checkedFilterDataArray: checkedFilterDataArray,
            checkedFilterManufacturerDataArray: checkedFilterManufacturerDataArray,
            checkedFilterColourDataArray: checkedFilterColourDataArray,
        };
    }

    switchOrder(order, cards) {


        let manufacturersArray = [];

        cards.map(card => {
              //as oppose to getAttribute or querySelector to prevent cards with
            //the same manufacturer being used twice - bug spotted & preventinn
            let manufacturers = card.attributes.manufacturer.value;
            
            //form multi-dimensional array for use with sorting and element replacements
            manufacturersArray.push([manufacturers, card]);
        })

        //sort based on 
        if(order == "ascending") {
            manufacturersArray.sort();
        }
        
        else if (order == "descending") {
            manufacturersArray.sort();
            manufacturersArray.reverse();
        }

        //remove all existing cards from dom completely
        manufacturersArray.map(manufacturer => manufacturer[1].remove());
        //re-append the same elements in sorted order
        manufacturersArray.map(manufacturer => this.cardContainer.appendChild(manufacturer[1]));

    }
}


export default CarFilter;



