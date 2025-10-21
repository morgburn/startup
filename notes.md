# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS Notes

## HTML Notes
<p> = Paragraph
<h1> – <h6>	= Headings (h1 is largest, h6 is smallest)
<ol> =	Ordered list
<ul> =	Unordered list
<li> =	List item
<div> =	Block-level container, used for grouping elements
<span> =	Inline container, does not start a new line
<a> =	Anchor tag (link)
<img> =	Image tag
<link> =	Links external resources (usually CSS)
<script> =	Embeds or links JavaScript code

Doctype declaration in html: <!DOCTYPE html>

Hyperlinked image example:
<a href="https://example.com">
  <img src="image.jpg" alt="Example Image">
</a>

To include JavaScript on an HTML page use <script> tag

## CSS Notes
Selectors:
#id = selects an element by its id
    Example: #title selects the element with id="title"
.class = selects all elements with that class
    Example: .grid selects all elements with class="grid"
element = selects all elements of that type

Box Model:
From inside out: Content → Padding → Border → Margin
Padding: space inside the element, between content and border
Margin: space outside the element, between element and other elements

Common Properties:
background-color: red; = sets background color
display values:
    block (div, p)
    inline (span, a)
    inline-block
    flex = for flexible layouts

Flexbox Example:
.container {
  display: flex;
  justify-content: space-between;
}
Images inside a flex container will line up horizontally by default.
justify-content = horizontal alignment
align-items = vertical alignment

Default CSS display property for <span> is inline

CSS Example for text coloring:
#trouble { color: green; } /* only affects element with id="trouble" */

CSS targeting all divs:
div { background-color: red; }

## JavaScript
Selecting Elements:
```
document.getElementById("byu").style.color = "green";
document.querySelector("#byu"); // Selects first element with id="byu"
document.querySelectorAll(".class"); // Selects all elements with a class
```

Event Listeners:
```
document.getElementById("btn").addEventListener("click", () => {
  alert("Button clicked!");
});
```
getElementByID("id") selects element
addEventListener("event", function) runs function only when that event occurs

Arrow Functions:
```
// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function (equivalent)
const add = (a, b) => {
  return a + b;
};

// If the function has a single expression, you can omit braces and return:
const add = (a, b) => a + b;

```
Loops:
```
for (let i = 0; i < 5; i++) { console.log(i); }

let arr = [1,2,3];
arr.map(x => x * 2); // returns [2,4,6]
```

map() - creates a new array by applying a function to each element of an existing array (doesn't modify original array)
```
const newArray = oldArray.map(function(element, index, array) {
  // return a new value for the new array
});
```
element = current element in the array
index = current index(optional)
array = original array (optional)

If/Else/While:
```
if(condition) { ... } else { ... }

while(condition) { ... }
```

Switch = like if...else statements but you have multiple possible conditions to check against a single value
Switch Example:
```
switch (expression) {
  case value1:
    // Code to execute if expression === value1
    break;
  case value2:
    // Code to execute if expression === value2
    break;
  // ... more cases
  default:
    // Code to execute if no case matches
}
```

Objects:
```
const obj = { name: "Morgan", age: 25 };
obj.newProp = "Hello"; // valid, can add properties
```

JSON:
JavaScript Object Notation = Text-based data format for sending structure data
```
{ "name": "Morgan", "age": 20 }
```

Promises:
A promise is an object that represents eventual completion (or failure) of an asynchronous operation and its resulting value. States: 
pending - initial state, not yet completed
fulfilled - operation completed successfully
rejected - operation failed
Creating a Promise:
const myPromise = new Promise((resolve, reject) => {
  if(success) resolve("Success!");
  else reject("Failure!");
});
Using a Promise:
myPromise
  .then(result => console.log(result)) // runs if resolved
  .catch(error => console.log(error))  // runs if rejected
Key Points:
- Promises are asynchronous; they do not block code.
- .then() handles resolved values, .catch() handles errors.
- map, setTimeout, fetch often use Promises.
- Can chain .then() for sequential operations:
  fetchData
    .then(data => data + " processed")
    .then(result => console.log(result));
- async/await is syntactic sugar for Promises:
async function getData() {
  const data = await fetchData;
  console.log(data);
}
getData();
```
fetch("url")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

console.log() prints to the console and can log any JavaScript value

Change an element text with id of "byu" to green:
```
// Select the element with id="byu"
const element = document.getElementById("byu");

// Change its text color to green
element.style.color = "green";
```

// Select the element with id="animal"
const animalElement = document.getElementById("animal");
// Change its text content
animalElement.textContent = "crow";


## DOM Notes
Represents HTML elements as objects in JavaScript

True statements about the DOM:
- Elements can be selected and manipulated via JS
- Event listeners can be added to elements
- DOM updates affect what the user sees immediately

Span default display: inline

## Terminal Commands
chmod = change file permissions
pwd = print working directory
cd = change directory
ls = list files (-la = list all, long format)
vim/nano = text editors
mkdir = make directory
mv = move or rename files
rm = remove files
man = show manual
ssh = remote shell login
ps = process status
wget = download files from internet
sudo = run command as superuser

Remote shell session: ssh user@hostname

## Other Notes
Domain example: banana.fruit.bozo.click
- Top-level domain (TLD): click
- Subdomain: banana
- Root domain: bozo.click
HTTPS requires a valid SSL certificate
DNS A record: points to an IP address
Reserved ports:
- 80 -> HTTP
- 443 -> HTTPS
- 22 -> SSH