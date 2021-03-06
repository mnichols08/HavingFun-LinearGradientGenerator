(function (global) {
    class Collection {
        constructor() {
            this.collection = []; // Creates an array on the parent object to store values created.
            this.prev = []; // Creates another array to store previous values on.
            this.next = []; // Creates yet another array to store the next values on.
        };
    }
    class Color extends Collection {
        constructor(degree, r, g, b, h, s, l) { // We are creating a linear gradient with Hue, Saturation, and Light
            super() // passes the arrays created on the Collection class and the this variable into this one
            this.direction = degree; // linear-gradient() degree variable
            this.hue = r; // hue variable
            this.saturation = g; // saturation variable
            this.light = b; // light variable
            this.hue2 = h; // 2nd hue variable
            this.sat = s; // 2nd saturation variable
            this.lite = l; // 2nd light variable
            delete this.collection; // removes the array from this object - do not need it.
            delete this.prev; // removes the prev array from this object - not necessary.
            delete this.next; // the next property on this object is also obsolete;
        }
        updateBody(style) {
            document.body.style.background = style; // sets the body background to the generated hsl()
            document.querySelector('h2').innerText = `background: ${style}`; // passes the value into the h2 element so user can see it.
        }
        togglePrevButton() {
            if(prev.length > 1) {
            document.getElementById('recall').classList.add('show');// applies show class to the recall button (referred to as prev throughout this lecture)
            } else {document.getElementById('recall').classList.remove('show');}
        }
        toggleNextButton() {
            if(next.length > 1) {
            document.getElementById('next').classList.add('show'); // applies show class to the next button - Needs more work to be satisfied with this.
            }else {document.getElementById('next').classList.remove('show')}
        }
        randomColor() {
            const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min); // Generates a random interval between two numbers
            const randomNum = (num) => Math.floor(Math.random() * num); // Generates a random number between 0 and single number passed in
            const happyMedium = [45, 55]; // Range to be passed into randomRange - Keeps the colors from getting to dark or too bright (they define saturation and brightness)
            const randomDeg = randomNum(360),
                randomHue = randomNum(360),
                randomSat = randomRange(...happyMedium),
                randomLgt = randomRange(...happyMedium), 
                randomH_e = randomNum(360),
                randomS_t = randomRange(...happyMedium),
                randomL_t = randomRange(...happyMedium); // put random numbers into memory for now so they don't change on us
            let thisColor = newColor(randomDeg, randomHue, randomSat, randomLgt, randomH_e, randomS_t, randomL_t); // finally creates the object using all the random numbers just set
            collection.push(thisColor); // pushes the values we created into storage on the parent to recall them later.
            prev.push(thisColor); // keeps history of previous backgrounds by pushing into another array
            next.push(thisColor); // keeps history of previous backgrounds by pushing into another array
            const style = `linear-gradient(${randomDeg}deg, hsl(${randomHue}, ${randomSat}%, ${randomLgt}%),hsl(${randomH_e},${randomS_t}%,${randomL_t}%))` // writes style str
            thisColor.updateBody(style); // passes style string to the updateBody method on this newly created object.
            Color.prototype.togglePrevButton(); // tells the previous button to appear on the screen
        }       
        recallColor() {
            Color.prototype.toggleNextButton(); // tells the next button to appear on screen 
            try{
                if (prev.length > 1) {
                    const lastColor = prev[prev.length - 2] // sets last color to the previous object in collection
                    const thisColor = newColor(lastColor.direction, lastColor.hue, lastColor.saturation, lastColor.light, lastColor.hue2, lastColor.sat, lastColor.lite); // creates a new object based on that
                    prev.pop(thisColor) // pops the values we have seen off of the previous array
                    next.push(thisColor); // sends them over to the next array so we can iterate through them 
                    const style = `linear-gradient(${thisColor.direction}deg, hsl(${thisColor.hue}, ${thisColor.saturation}%, ${thisColor.light}%),hsl(${thisColor.hue2},${thisColor.sat}%,${thisColor.lite}%))` // writes style str
                    thisColor.updateBody(style); // passes style string to the updateBody method on this newly created object.
                }
            } catch(err) {console.error(`Caught issue: ${err}, running randomGenerator Anyway`, prev);Color.prototype.randomColor()} // Noticed some bugs if the array is too close to 0. This lets it keep appearing to work but reports the issue to console as an error
        }
        nextColor() {
        try{
            if (next.length > 1) {
                next.reverse();
                const lastColor = next[next.length - 2] // sets last color to the previous object in collection
                const thisColor = newColor(lastColor.direction, lastColor.hue, lastColor.saturation, lastColor.light, lastColor.hue2, lastColor.sat, lastColor.lite); // creates a new object based on that
                next.pop(thisColor) // removes this object from the next as we move towards the end.
                prev.push(thisColor); // maintains it's position by pushing the values back over to the previous array
                const style = `linear-gradient(${thisColor.direction}deg, hsl(${thisColor.hue}, ${thisColor.saturation}%, ${thisColor.light}%),hsl(${thisColor.hue2},${thisColor.sat}%,${thisColor.lite}%))` // writes style str
                thisColor.updateBody(style); // passes style string to the updateBody method on this newly created object.
                }
            }
        catch(err){console.error(`Caught issue: ${err}, running randomGenerator Anyway`, next);Color.prototype.randomColor()} // Noticed some bugs if the array is too close to 0. This lets it keep appearing to work but reports the issue to console as an error
        }
    }
    const initCollection = new Collection() // assigns the collection variable from parent object to store colors
    const collection = initCollection.collection; // initializes collection array into memory
    let prev = initCollection.prev; // initializes the previous array into memory
    let next = initCollection.next; // initializes the next array into memory
    const newColor = (deg, r, g, b, h, s, l) => new Color(deg, r, g, b, h, s, l); // sets up the Color Constructor
    document.getElementById('change').addEventListener('click', new Color().randomColor); // listens for generate click on the button to update DOM on request.
    document.getElementById('recall').addEventListener('click', new Color().recallColor); // listens for recall click to update DOM on request
    document.getElementById('next').addEventListener('click', new Color().nextColor); // listens for recall click to update DOM on request
})(window);
