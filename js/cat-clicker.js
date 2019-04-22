$(function () {

    const model = {
        init: function () {
            if (!localStorage.catClickerData) {
                localStorage.catClickerData = JSON.stringify({
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
                        ],
                        currentCat: null,
                        adminVisible: false
                    }
                );
            }
        },
        getCats: function () {
            return JSON.parse(localStorage.catClickerData).cats;
        },
        saveCat: function (catObj) {
            let catClickerDataObj = JSON.parse(localStorage.catClickerData);
            let cats = catClickerDataObj.cats;
            for (let i = 0; i < cats.length; i++) {
                // identify clicked cat
                if (catObj.id === cats[i].id) {
                    cats[i] = catObj;
                    localStorage.catClickerData = JSON.stringify(catClickerDataObj);
                }
            }
        },
        getCurrentCat: function () {
            return JSON.parse(localStorage.catClickerData).currentCat;
        },
        setCurrentCat: function (cat) {
            let catClickerData = JSON.parse(localStorage.catClickerData);
            catClickerData.currentCat = cat;
            localStorage.catClickerData = JSON.stringify(catClickerData);
        },
        incrementTotalClicks: function () {
            let catClickerData = JSON.parse(localStorage.catClickerData);
            catClickerData.totalClicks++;
            localStorage.catClickerData = JSON.stringify(catClickerData);
        },
        getCounter: function () {
            return JSON.parse(localStorage.catClickerData).totalClicks;
        },
        isAdminVisible: function () {
            return JSON.parse(localStorage.catClickerData).adminVisible;
        },
        switchAdminVisible: function () {
            let catClickerData = JSON.parse(localStorage.catClickerData);
            if (catClickerData.adminVisible) {
                catClickerData.adminVisible = false;
            } else {
                catClickerData.adminVisible = true;
            }
            localStorage.catClickerData = JSON.stringify(catClickerData);
        }
    };

    const octopus = {
        saveCat: function (catObj) {
            model.saveCat(catObj);
            model.setCurrentCat(catObj);
            view.render();
        },
        getCats: function () {
            return model.getCats();
        },
        init: function () {
            model.init();
            view.init();
        },
        getCurrentCat: function () {
            return model.getCurrentCat();
        },
        setCurrentCat: function (cat) {
            model.setCurrentCat(cat);
        },
        incrementTotalClicks: function () {
            model.incrementTotalClicks();
            view.render();
        },
        getCounter: function () {
            return model.getCounter();
        },
        isAdminVisible: function () {
            return model.isAdminVisible();
        },
        switchAdminVisible: function () {
            model.switchAdminVisible();
            view.render();
        }
    };

    const view = {
        init: function () {
            document.getElementsByClassName("totalClicks")[0].textContent = octopus.getCounter();
            let cats = octopus.getCats();

            for (let i = 0; i < cats.length; i++) {
                let content = document.querySelector("#list").content;
                content.querySelector("li").id = "list-" + cats[i].id;
                content.querySelector("li").textContent = cats[i].name;
                document.querySelector("#list-container").appendChild(document.importNode(content, true));
            }
            $("li").on("click", function (event) {
                for (let i = 0; i < cats.length; i++) {
                    // identify clicked cat
                    if (event.target.id === "list-" + cats[i].id) {
                        octopus.setCurrentCat(cats[i]);
                        view.render();
                    }
                }
            });
            // admin gui buttons
            document.getElementById("adminButton").addEventListener("click", function () {
                octopus.switchAdminVisible();
                view.render();
            });
            document.getElementById("cancelButton").addEventListener("click", function () {
                view.render();
            });
            document.getElementById("saveButton").addEventListener("click", function () {
                let cat = octopus.getCurrentCat();
                cat.name = document.getElementById("admin-name").value;
                cat.picUrl = document.getElementById("admin-imageUrl").value;
                cat.clicks = document.getElementById("admin-clicks").value;
                octopus.saveCat(cat);
                view.render();
            });
            view.render();
        },
        render: function () {
            document.getElementsByClassName("totalClicks")[0].textContent = octopus.getCounter();
            let currentCat;
            currentCat = octopus.getCurrentCat();

            if (currentCat != null) {
                // remove existing cat pic if present
                let figureDoc = document.querySelector("figure");
                if (figureDoc) {
                    figureDoc.remove();
                }
                // create clicked cat pic
                let content = document.querySelector("#picture").content;
                content.querySelector("img").id = "image-" + currentCat.id;
                content.querySelector("img").src = currentCat.picUrl;
                content.querySelector("footer").textContent = currentCat.picProvider;
                content.querySelector("figcaption").textContent = "My name is " + currentCat.name;
                content.querySelector("p").id = "text-" + currentCat.id;
                content.querySelector("p").textContent = "I have " + currentCat.clicks + " clicks so far.";
                document.querySelector("#picture-container").appendChild(document.importNode(content, true));

                // create event for cat pic to handle clicks
                $(".catPic").on("click", function (event) {
                    octopus.incrementTotalClicks();
                    currentCat.clicks++;
                    octopus.saveCat(currentCat);
                });
            }

            // admin gui
            if (octopus.isAdminVisible()) {
                document.querySelector(".admin-wrapper").classList.remove("hide");
                if (currentCat) {
                    document.getElementById("admin-name").value = currentCat.name;
                    document.getElementById("admin-imageUrl").value = currentCat.picUrl;
                    document.getElementById("admin-clicks").value = currentCat.clicks;
                }
            } else {
                document.querySelector(".admin-wrapper").classList.add("hide");
            }
        }
    };

    octopus.init();
    // model.test();
});


