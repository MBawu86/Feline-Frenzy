alert('js is loaded')

// IPO Input -> Process -> Output
// Constants and State Variables (Data)
// Constant Data
const BASE_URL = 'https://api.thecatapi.com/v1/categories?breed=20&images=20&name=20&origin=20' 
// State Data
let kittyData, kittyDetail;
// Cached Element References
const $collection = $('#collection');
// Attached Event Listeners
$collection.on('click', 'article.card', handleClick);


// Functions
function getData(){
    $.ajax(BASE_URL).then(function(data){
      kittyData = data;
      render();

    }, function(error){
        console.log('Error ', error);

    });
}

function handleClick(){
    alert('a card was clicked')
}

function render(){
    const htmlArray = kittyData.results.map(kitty => {
        return`
        <article class=card flx-ctr>
            <h3>Kitties${kitty.attach_breed}</h3>
        </article>
        `;
    });
    $collection.html(htmlArray);
}

// called immediately
//init();






/*function init() {
    getData();
}
function getData(detailURL) {
    console.log('detailURL', detailURL)
    // declare a local variable to take whichever url we need
    let url;
    if(detailURL === undefined) {
        // we want all the pokemon
        url = BASE_URL;
    } else {
        // we want a single pokemon
        url = detailURL;
    }
    // fetch data using AJAX
    $.ajax(url).then(function(data) {
        // take the returned data and assign it to a global state variable
        // call render to visualize it to the DOM
        // we are getting all the pokemon
        if(detailURL === undefined) {
            kittyData = data;
            render();
        } else {
            // we are getting a single pokemon object
            kittyDetail = data;
            // call render and tell the function that it needs to display a modal
            render(true);
        }
    }, function(error) {
        console.log('Error: ', error);
    });
}
function handleClick() {
  alert('a card was clicked')
    //getData(this.dataset.url);
}
function render(showModal) {
    if(showModal === true) {
        // show the modal
        // generate the html for the inner content for the modal
        // call the modal on the modal element
        const $modalContent = $(`
            <img src="${https://api.thecatapi.com/v1/images/search}"/>
            <h5>${kittyDetail.breed}</h5>
            <p>Name: ${kittyDetail.name.length}</p>
            <p>Origin ${kittyDetail.origin.length}</p>

        `);
        const $modal = $('#kittymodal');
        $modal.html($modalContent)
        $modal.modal();
    } else {
        // map over the objects inside of the kittyData results array
        // dynamically generate html for each element in the array
        // add that html to our collection element
        const htmlArray = kittyData.results.map(pokemon => {
            return`
            <article data-url="${pokemon.url}" class="card flex-ctr">
                <h3>${pokemon.name}</h3>
            </article>
            `;
        });
        $collection.html(htmlArray);
    }
} 

*/