const cards = document.querySelectorAll(".card");

console.log(cards);
console.log(cards[4]);

var cur_color = "#3aa13a";

var init_func = function()  { 
    
}

var color_arr = ["green", "teal", "yellow", "red", "orange", "purple", "blue", "cyan", "lime", "pink", "violet", "indigo", "brown"];

var number = Math.floor(10.1);

var original_colors = Array.from({length:16}, x => 0);

var grid_index = Array.from({length:16}, (x , i)=> i);
console.log(grid_index);
var picked_colors = new Set();

//random color generator
for(let i = 0; i < 8; i++){
    
    //pick a random color
    var color_index = Math.floor(Math.random() * color_arr.length);
    var color = color_arr[color_index];
    color_arr.splice(color_index, 1);
    
    //pick first grid index
    var index = Math.floor(Math.random() * grid_index.length);
    cards[grid_index[index]].style.backgroundColor = color;
    cards[grid_index[index]].id = grid_index[index];
    original_colors[grid_index[index]] = color;
    grid_index.splice(index, 1);

    //pick second grid index
    index = Math.floor(Math.random() * grid_index.length);
    
    cards[grid_index[index]].style.backgroundColor = color;
    cards[grid_index[index]].id = grid_index[index];
    original_colors[grid_index[index]] = color;
    grid_index.splice(index, 1);
    //remove color from array
    picked_colors.add(color);
    
}
var block_click = true;

setTimeout(() => {
    for(let i = 0; i< cards.length; i++){
        cards[i].style.backgroundColor = "grey";
        cards[i].style.cursor = "pointer";
        block_click = false;

    }
}, 6000);

var clicked_grid = null;
var count_ = 0;


for(let i = 0; i < cards.length; i++){
    //cards[i].id = i;
    //var color_index = Math.floor(Math.random() * color_arr.length);
   // original_colors[cards[i].id] = cards[i].style.backgroundColor = color_arr[color_index];

    
    
    cards[i].addEventListener("click", (mouse_event) => {
        const target = mouse_event.target;
        if(block_click || target.blockclick) return;
        
        
        console.log("parameter:",mouse_event);
        console.log("clicked target:",mouse_event.target);
        console.log("clicked object class:", mouse_event.target.attributes);
        console.log("get unset attribute:", target.getAttribute('has_clicked'));
        var result = mouse_event.target.style.backgroundColor.match(/[+-]?\d+(\.\d+)?/g);
        
        if(result) console.log(typeof result[0]);
        
        if(!target.has_clicked) {
            target.style.backgroundColor = original_colors[target.id];
            target.has_clicked = true;
            console.log(target.has_clicked);
            count_ += 1;
            if(clicked_grid){
                
                console.log("verifying:",target.style.backgroundColor !== clicked_grid.style.backgroundColor);
                console.log("color1:",target.style.backgroundColor, "color2", clicked_grid.style.backgroundColor);
                if(target.style.backgroundColor !== clicked_grid.style.backgroundColor){
                    block_click = true;
                    target.style.cursor = "auto";
                    clicked_grid.style.cursor = "auto";
                    console.log(target.style);
                    console.log("here!!!!")
                    setTimeout(()=>{
                        target.style.backgroundColor = "grey";
                        clicked_grid.style.backgroundColor = "grey";
                        target.style.cursor = "pointer";
                        clicked_grid.style.cursor = "pointer";
                        target.has_clicked = false;
                        clicked_grid.has_clicked = false;
                        block_click = false;
                        clicked_grid = null;
                        count_ -= 2;
                    }, 1000);
                }
                else{
                    target.blockclick = true;
                    clicked_grid.blockclick = true;
                    block_click = false;
                    clicked_grid = null;
                    
                }
            }else{
                clicked_grid = cards[target.id];
            }
        }
        else{
                count_ -= 1;
                target.style.backgroundColor = "grey";
                target.has_clicked = false;
                if(clicked_grid.id == target.id){
                    clicked_grid = null;
                }
                console.log(target.has_clicked);
            
        }

        console.log("count:",count_);
        if(count_ == 16){
    
            setTimeout(()=>{
                alert("you win!");
                document.location.reload();},100);
            
       }
        console.log(original_colors);
        console.log(target.style.backgroundColor);
        
    });
}

console.log(original_colors);