(function (global) {
    class Collection {
        constructor() {
            this.collection = []; // Creates an array on the parent object to store values created.
            this.prev = this.collection.map(item => item);
            this.next = [];
        };
    }
    class Color extends Collection {

        constructor(degree, r, g, b, hue, sat, light) { // We are creating a linear gradient with Hue, Saturation, and Light
            super()
            this.direction = degree; // linear-gradient() degree variable
            this.hue = r; // hue variable
            this.saturation = g; // saturation variable
            this.light = b; // light variable
            this.hue2 = hue; // 2nd hue variable
            this.sat = sat; // 2nd saturation variable
            this.lite = light; // 2nd light variable
            delete this.collection; // removes the array from this object - do not need it.
            delete this.prev;
            delete this.next;
        }
        updateBody(style) {
            document.body.style.background = style; // sets the body background to the generated hsl()
            document.querySelector('h2').innerText = `background: ${style}`; // passes the value into the h2 element so user can see it.
        }
        addButton() {
            document.querySelector('div:first-of-type #recall').classList.add('show')
            document.querySelector('div:first-of-type #next').classList.add('show')
        }
        rememberValues(values) {
            Collection.prototype.oldCollection = values.map(val => val);
        }
        randomColor() {
            const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min); // Generates a random interval between two numbers
            const randomNum = (num) => Math.floor(Math.random() * num); // Generates a random number between 0 and single number passed in
            const happyMedium = [45, 55]; // Range to be passed into randomRange - Keeps the colors from getting to dark or too bright (they define saturation and brightness)
            const randomDeg = randomNum(360),
                randomHue = randomNum(360),
                randomSat = randomRange(...happyMedium),
                randomLgt = randomRange(...happyMedium); // put numbers into
            const randomH_e = randomNum(360),
                randomS_t = randomRange(...happyMedium),
                randomL_t = randomRange(...happyMedium); // memory for now
            let thisColor = newColor(randomDeg, randomHue, randomSat, randomLgt, randomH_e, randomS_t, randomL_t); // finally creates the object using all the random numbers just set
            collection.push(thisColor); // pushes the values we created into storage on the parent to recall them later.
            prev.push(thisColor);
            const style = `linear-gradient(${randomDeg}deg, hsl(${randomHue}, ${randomSat}%, ${randomLgt}%),hsl(${randomH_e},${randomS_t}%,${randomL_t}%))` // writes style str
            thisColor.updateBody(style); // passes style string to the updateBody method on this newly created object.
            collection.length > 1 ?  Color.prototype.addButton() : console.log('init'); // runs the addButton method on Color object
            console.log('randomColor',collection);
        }
        recallColor() {
            if (prev.length >= 2 && prev.length !== 0) {
                const lastColor = prev[prev.length - 2] // sets last color to the previous object in collection
                const thisColor = newColor(lastColor.direction, lastColor.hue, lastColor.saturation, lastColor.light, lastColor.hue2, lastColor.sat, lastColor.lite); // creates a new object based on that
                prev.pop(thisColor) // pops the values we recalled from storage on parent.
                next.push(thisColor);
                const style = `linear-gradient(${thisColor.direction}deg, hsl(${thisColor.hue}, ${thisColor.saturation}%, ${thisColor.light}%),hsl(${thisColor.hue2},${thisColor.sat}%,${thisColor.lite}%))` // writes style str
                thisColor.updateBody(style); // passes style string to the updateBody method on this newly created object.
                console.log('recallColor',prev,next);
            }
        }
        nextColor() {        
            if (next.length >= 2 && next.length !== 0) {
                const lastColor = next[next.length - 2] // sets last color to the previous object in collection
                const thisColor = newColor(lastColor.direction, lastColor.hue, lastColor.saturation, lastColor.light, lastColor.hue2, lastColor.sat, lastColor.lite); // creates a new object based on that
                next.pop(thisColor) // pops the values we recalled from storage on parent.
                prev.push(thisColor);
                const style = `linear-gradient(${thisColor.direction}deg, hsl(${thisColor.hue}, ${thisColor.saturation}%, ${thisColor.light}%),hsl(${thisColor.hue2},${thisColor.sat}%,${thisColor.lite}%))` // writes style str
                thisColor.updateBody(style); // passes style string to the updateBody method on this newly created object.
                console.log('randomColor',collection);
            }

        }
    }

    const initCollection = new Collection() // assigns the collection variable from parent object to store colors
    const collection = initCollection.collection;
    let prev = initCollection.prev;
    let next = initCollection.next;
    const newColor = (deg, r, g, b, hue, sat, light) => new Color(deg, r, g, b, hue, sat, light); // sets up the Color Constructor

    global.collection = collection; // passes the collection array to the global scope
    global.prev = prev;
    global.next = next;

    document.getElementById('change').addEventListener('click', new Color().randomColor); // listens for generate click on the button to update DOM on request.
    document.getElementById('recall').addEventListener('click', new Color().recallColor); // listens for recall click to update DOM on request
    document.getElementById('next').addEventListener('click', new Color().nextColor); // listens for recall click to update DOM on request
})(window)



// if (collection.length >= 2 && collection.length !== 0) {
//     console.log(prev, collection)
    
//     const lastColor = collection[collection.length - 2] // sets last color to the previous object in collection
//     const thisColor = newColor(lastColor.direction, lastColor.hue, lastColor.saturation, lastColor.light, lastColor.hue2, lastColor.sat, lastColor.lite); // creates a new object based on that
//     // prev.of(thisColor) // pops the values we recalled from storage on parent.

//     const style = `linear-gradient(${thisColor.direction}deg, hsl(${thisColor.hue}, ${thisColor.saturation}%, ${thisColor.light}%),hsl(${thisColor.hue2},${thisColor.sat}%,${thisColor.lite}%))` // writes style str
//     thisColor.updateBody(style); // passes style string to the updateBody method on this newly created object.
// } else if (collection.length === 1) {} else {
//     Color.prototype.randomColor()
// }; // If the parent has more than one color, proceed with recall, do nothing if 0 and return randomColor 