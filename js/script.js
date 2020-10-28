//alert('js is loaded')

// IPO Input -> Process -> Output
// Constants and State Variables (Data)
// Constant Data
const BASE_URL = 'https://api.thecatapi.com/v1/categories?api_key=3018d430-211b-419d-b944-5187ca34f37a'
 
/*GET /api.thecatapi.com/v1/breeds?

 var dataSet = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.thecatapi.com/v1/breeds",
    "method": "GET",
    "headers":   
  }
  
  $.ajax(BASE_URL).then;
*/

// State Data
let kittyData, kittyDetail;
// Cached Element References
const $collection = $('#collection');
// Attached Event Listeners
$collection.on('click', 'article.card', handleClick);


// Functions
//call immediately

init();

function init(){
    getData()
}

function getData(detailURL){
   console.log('detailURL', detailURL)
    let url;
    if (detailURL === undefined){
        //we want all the kitties
        url = BASE_URL;
    }else{
        //we want single kitty
        url = detailURL;
     }
    /*const data =*/ 
    $.ajax({url: `${url}`}).then(function(data){
      console.log('data', data)
      //getting all kitties
      if(detailURL === undefined){
        kittyData = data;
        render();
      } else {
          //we are getting a single kitty
          kittyDetail = data;
          //call render and tell the function it needs to display a modal
          render(true);
      }
    }, function(error){
        console.log('Error ', error);

    });

}

function handleClick(){
    alert('a card was clicked')
    console.log(this.dataset.url)
    getData(this.dataset.url)
}

function render(showModal){
    if (showModal === true){
        //show the modal
        //generate html for inner modal
        //call the modal on the modal element
        const $modalContent =$(`
        <img src="https://api.thecatapi.com/v1/images/search">
        <h5>${kittyDetail.images}</h5>
        <p>Kid Friendly: ${kittyDetail.child_friendly}</p>
        <p>Origin: ${kittyDetail.origin} </p>
        <p>Personality: ${kittyDetail.description} </p>
        `);
        const $modal = $('#kittymodal');
        $modal.html($modalContent)
        $modal.modal()

    }else{ 
        //map over object inside of the kittyData resylts array
        //dynamically generate html for each element in array
        //add that html to our collection element
    const htmlArray = kittyData.map(kitty => {
        return`
        <article data-url="${kitty.url}" class=card flx-ctr>
            <h3>${kitty.name} Kitties</h3>
        </article>
        `;
    });
    $collection.html(htmlArray);
}
    }

 getData();


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