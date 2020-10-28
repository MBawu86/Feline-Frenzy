//alert('js is loaded')

// IPO Input -> Process -> Output
// Constants and State Variables (Data)
// Constant Data
const BASE_URL = 'https://api.thecatapi.com/v1/breeds?limit=15&page=3&api_key=3018d430-211b-419d-b944-5187ca34f37a'
 

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

function getData(dataset){
   console.log('dataset', dataset)
    let url;
    if (dataset === undefined){
        //we want all the kitties
        url = BASE_URL;
    }else{
        //we want single kitty image
        //Get image for kitty
        url = `https://api.thecatapi.com/v1/images/search?breed_id=${dataset.id}&limit=1&api_key=3018d430-211b-419d-b944-5187ca34f37a`;
     }
    /*const data =*/ 
    $.ajax({url: `${url}`}).then(function(data){
      console.log('data', data)
      //getting all kitties
      if(dataset === undefined){
        kittyData = data;
        render();
      } else {
          //we are getting a single kitty image
          //make copy of dataset into kittyDetail:
          //{id: "pers", kidFriendly: "2", origin: "Iran/Persia", personality:"...etc"}
          kittyDetail = {...dataset};
          //add image to KittyDetail:
          kittyDetail.image_url = data[0].url
          console.log(kittyDetail)
          //call render and tell the function it needs to display a modal
          render(true);
      }
    }, function(error){
        console.log('Error ', error);

    });

}

function handleClick(){
   // alert('a card was clicked')
    console.log(this.dataset)
    getData(this.dataset)
}

function render(showModal){
    if (showModal === true){
        console.log(kittyDetail)
        //show the modal
        //generate html for inner modal
        //call the modal on the modal element
        const $modalContent =$(`
        <img src="${kittyDetail.image_url}"
    style="width: 430px;"/>
        <h1>${kittyDetail.name}</h1>
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
        <article data-id="${kitty.id}" data-name="${kitty.name}" data-child_friendly="${kitty.child_friendly}" data-origin="${kitty.origin}" data-description="${kitty.description}" class=card flx-ctr>

            <h3>😻</h3>
        </article>
        `;
    });
    $collection.html(htmlArray);
}
    }

 getData();
