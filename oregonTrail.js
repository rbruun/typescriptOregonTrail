(function () {
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    /*
    * Classes
    */
    //The traveler class that implements the ITraveler interface
    var Traveler = (function () {
        function Traveler(name) {
            this.name = name;
            this.food = getRandom(0, 100);
            console.log("Start food: " + this.food);
            this.isHealthy = this.food >= 20 ? true : false;
        }
        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value
        Traveler.prototype.hunt = function () {
            if (Math.random() > .5) {
                this.food += 100;
            }
            return this.food;
        };
        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        Traveler.prototype.eat = function () {
            if (this.food >= 20) {
                this.food -= 20;
                if (this.food < 20) {
                    this.isHealthy = false;
                }
            }
            return this.isHealthy;
        };
        return Traveler;
    }());
    ;
    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    var Wagon = (function () {
        function Wagon() {
            this.passengerArray = [];
        }
        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        Wagon.prototype.addPassenger = function (traveler) {
            if (this.passengerArray.length < this.capacity) {
                this.passengerArray.push(traveler);
                return "added";
            }
            else {
                return "sorry";
            }
        };
        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        Wagon.prototype.isQuarantined = function () {
            var quarantined = false;
            for (var i = 0; i < this.passengerArray.length; i++) {
                if (!this.passengerArray[i].isHealthy) {
                    quarantined = true;
                    break;
                }
            }
            return quarantined;
        };
        //Return the total amount of food among all passengers of the wagon.
        Wagon.prototype.getFood = function () {
            var totalFood = 0;
            for (var i = 0; i < this.passengerArray.length; i++) {
                totalFood += this.passengerArray[i].food;
            }
            return totalFood;
        };
        return Wagon;
    }());
    /*
    * Play the game
    *
    * Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    */
    var passenger1 = new Traveler("Mary Mary");
    var passenger2 = new Traveler("Joe Joe");
    var passenger3 = new Traveler("Nancy Nanci");
    var passenger4 = new Traveler("Goober Pyle");
    var passenger5 = new Traveler("Gomer Pyle");
    /*
    *
    * Create wagon with an empty passenger list and a capacity of 4.
    *
    */
    var myPassengers = [];
    var myWagon = new Wagon();
    myWagon.capacity = 4;
    /*
    * Make 3 of 5 the travelers eat by calling their eat methods
    */
    console.log("Passenger 1 eat:  " + passenger1.eat());
    console.log("Passenger 3 eat:  " + passenger3.eat());
    console.log("Passenger 5 eat:  " + passenger5.eat());
    /*
    * Make the remaining 2 travelers hunt
    */
    console.log("Passenger 2 hunt: " + passenger2.hunt());
    console.log("Passenger 4 hunt: " + passenger4.hunt());
    /*
    * Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    * of attempting to be being added to the wagon using the wagons addPassenger method.
    */
    myPassengers = [passenger1, passenger2, passenger3, passenger4, passenger5];
    for (var i = 0; i < myPassengers.length; i++) {
        if (Math.random() > .5) {
            console.log("Trying to add passenger " + myPassengers[i].name + " to wagon: " + myWagon.addPassenger(myPassengers[i]));
        }
    }
    /*
    * Run the isQuarantined method for the wagon
    */
    console.log("Is wagon quarantined:  " + myWagon.isQuarantined());
    /*
    * Run the getFood method for the wagon
    */
    console.log("The total wagon food is: " + myWagon.getFood());
    /*
    * the return values of all the methods should be displayed in the console using console.log()
    * the console.log statements should not live inside any methods on the objects
    *
    */
})();
