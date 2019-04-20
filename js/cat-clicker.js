let cats;
if (localStorage.getItem("catClickerData")) {
    catsText = localStorage.getItem("catClickerData");
    cats = JSON.parse(catsText);
} else {
    cats = {
        "totalClicks": 0,
        cats: [
            {
                "id": 1,
                "name": "Placekitten's Cat",
                "picUrl": "https://placekitten.com/400/300",
                "picProvider": "Photo by placekitten.com",
                "clicks": 0
            },
            {
                "id": 2,
                "name": "Pacto's Cat",
                "picUrl": "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eb029e07f8e81d2f7332382b88f2746c&auto=format&fit=crop&w=2550&q=80",
                "picProvider": "Photo by Pacto Visual on Unsplash",
                "clicks": 0
            },
            {
                "id": 3,
                "name": "Krista's Cat",
                "picUrl": "./images/krista-mangulsone-53122-unsplash.jpg",
                "picProvider": "Photo by Krista Mangulsone on Unsplash",
                "clicks": 0
            },
            {
                "id": 4,
                "name": "Emre's Cat",
                "picUrl": "./images/emre-gencer-228223-unsplash.jpg",
                "picProvider": "Photo by Emre Gencer on Unsplash",
                "clicks": 0
            },
            {
                "id": 5,
                "name": "Alex's Cat",
                "picUrl": "./images/alex-perez-550765-unsplash.jpg",
                "picProvider": "Photo by Alex Perez on Unsplash",
                "clicks": 0
            },
        ]
    };
}

// total clicks
document.getElementsByClassName("totalClicks")[0].textContent = cats.totalClicks;

// create list
for (let i = 0; i < cats.cats.length; i++) {
    let content = document.querySelector("#list").content;
    content.querySelector("li").id = "list-" + cats.cats[i].name;
    content.querySelector("li").textContent = cats.cats[i].name;
    document.querySelector("#list-container").appendChild(document.importNode(content, true));
}

// show clicked cat pic
$("li").on("click", function (event) {
    for (let i = 0; i < cats.cats.length; i++) {

        // identify clicked cat
        if (event.target.id === "list-" + cats.cats[i].name) {

            // remove existing cat pic if present
            let figureDoc = document.querySelector("figure");
            if (figureDoc) {
                figureDoc.remove();
            }
            // create clicked cat pic
            let content = document.querySelector("#picture").content;
            content.querySelector("img").id = "image-" + cats.cats[i].name;
            content.querySelector("img").src = cats.cats[i].picUrl;
            content.querySelector("footer").textContent = cats.cats[i].picProvider;
            content.querySelector("figcaption").textContent = "My name is " + cats.cats[i].name;
            content.querySelector("p").id = "text-" + cats.cats[i].name;
            content.querySelector("p").textContent = "I have " + cats.cats[i].clicks + " clicks so far.";
            document.querySelector("#picture-container").appendChild(document.importNode(content, true));

            // create event for cat pic to handle clicks
            $(".catPic").on("click", function (event) {
                cats.totalClicks++;
                for (let i = 0; i < cats.cats.length; i++) {
                    if (event.target.id === "image-" + cats.cats[i].name) {
                        cats.cats[i].clicks++;
                        document.getElementById("text-" + cats.cats[i].name).textContent = "I have " + cats.cats[i].clicks + " clicks so far.";
                    }
                }
                let catsJson = JSON.stringify(cats);
                localStorage.setItem("catClickerData", catsJson);
                document.getElementsByClassName("totalClicks")[0].textContent = cats.totalClicks;
            });
        }

    }
});

