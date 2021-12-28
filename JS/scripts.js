//---------Fetch the data from the API-----------
let fetchData = async() => {
    let users;
    let val = search_val.value;
    try{
        const data = await fetch(
            `https://api.nationalize.io/?name=${val}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }

            });

        users = await data.json();

    } catch(err){
        console.log(err);
    }
    
    //---------Call function dataFilter()-----------
    dataFilter(users.country);

}




//---------function dataFilter()-----------
let dataFilter = async(countries) => {

    //---------Delete previously created table along with its parent div, if any-----------
    if(document.getElementById("div_container")){
        let delete_container = document.getElementById("div_container")
        delete_container.parentNode.removeChild(delete_container);
    }

    //---------Sort the countries according to the probability and reduce the number of countries to two-----------
    if(countries){
        let filtered_countries = countries.sort((a,b) => a-b);
        filtered_countries.pop();
        //---------Call function displayDetails()-----------
        displayDetails(filtered_countries);
    }
}


//---------function displayDetails()-----------
let displayDetails = async(details) => {

    let container = document.createElement("div");
    container.id = "div_container";
    container.className = "container";
    document.body.appendChild(container);

    //---------No matches found, then don't display table-----------
    if(details.length == 0){
        let alt_result = document.createTextNode("No matching results found :( .......");
        let alt_para = document.createElement("p");
        alt_para.id = "paragraph"
        alt_para.appendChild(alt_result);
        container.appendChild(alt_para);
    }
    
    else{
        
        //---------Table creation-----------     
        let table = document.createElement("table");
        table.id = "my_table"
        table.className = "table table-bordered table-striped";
    
        container.appendChild(table);
    
        let thead = table.createTHead();
        thead.className = "table-dark";
        let row_head = thead.insertRow();
        
        let tbody = table.createTBody();
      
        //---------Create table headings-----------
        for (let key in details[0]) {
          let th = document.createElement("th");
          let text = document.createTextNode(key);
          th.appendChild(text);
          row_head.appendChild(th);
        }
    
        //---------Dispaly the details into table-----------
        for(element of details){
            let row_data = tbody.insertRow();
            for(key in element){
                let cell = row_data.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
    }


}


//----------Heading Name--------------
let header_text = document.createElement("h1");
let head_name = document.createTextNode("Country Finder");
header_text.appendChild(head_name);
header_text.id = "header";
document.body.appendChild(header_text);

//----------Search Box--------------
let search_box = document.createElement("input");
search_box.placeholder = "Enter the name...";
search_box.type = "text";
search_box.id = "search_text";
search_box.className = "form-control";

//----------Put search box inside a div-------------
let search_container = document.createElement("div");
search_container.className = "container";

document.body.appendChild(search_container);
search_container.appendChild(search_box);

//----calls function for each character entered through keyboard---------
let search_val = document.getElementById("search_text");
search_val.addEventListener("keyup", fetchData);











