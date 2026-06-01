// ======================================
// HORIZON
// ======================================

const gamesContainer =
document.getElementById("gamesContainer");

const featuredContainer =
document.getElementById("featuredGames");

const favoritesContainer =
document.getElementById("favoritesContainer");

const recentContainer =
document.getElementById("recentContainer");

const categoriesContainer =
document.getElementById("categories");

const searchInput =
document.getElementById("search");

const gameFrame =
document.getElementById("gameFrame");

const playerOverlay =
document.getElementById("playerOverlay");

// ======================================
// STORAGE
// ======================================

let games = [];

let favorites =
JSON.parse(localStorage.getItem("favorites"))
|| [];

let recent =
JSON.parse(localStorage.getItem("recent"))
|| [];

// ======================================
// LOAD GAMES
// ======================================

async function loadGames(){

    try{

        const response =
        await fetch("games.json");

        games =
        await response.json();

        renderGames(games);

        renderFeatured();

        buildCategories();

        renderFavorites();

        renderRecent();

    }

    catch(error){

        console.error(error);

    }

}

loadGames();

// ======================================
// CREATE CARD
// ======================================

function createGameCard(game){

    const card =
    document.createElement("div");

    card.className =
    "game-card";

    card.innerHTML = `

        <div class="game-info">

            <h4>${game.name}</h4>

            <div class="game-category">
                ${game.category}
            </div>

            <div class="card-actions">

                <button class="play-btn">
                    Play
                </button>

                <button class="favorite-btn">
                    ★
                </button>

            </div>

        </div>

    `;

    card
    .querySelector(".play-btn")
    .onclick = (e) => {

        e.stopPropagation();

        launchGame(game);

    };

    card
    .querySelector(".favorite-btn")
    .onclick = (e) => {

        e.stopPropagation();

        toggleFavorite(game);

    };

    card.onclick =
    () => launchGame(game);

    return card;

}

// ======================================
// RENDER GAMES
// ======================================

function renderGames(list){

    gamesContainer.innerHTML =
    "";

    list.forEach(game => {

        gamesContainer.appendChild(

            createGameCard(game)

        );

    });

}

// ======================================
// FEATURED
// ======================================

function renderFeatured(){

    if(!featuredContainer) return;

    featuredContainer.innerHTML =
    "";

    games
    .slice(0,4)
    .forEach(game => {

        featuredContainer.appendChild(

            createGameCard(game)

        );

    });

}

// ======================================
// FAVORITES
// ======================================

function toggleFavorite(game){

    const exists =
    favorites.find(

        g => g.name === game.name

    );

    if(exists){

        favorites =
        favorites.filter(

            g => g.name !== game.name

        );

    }

    else{

        favorites.push(game);

    }

    localStorage.setItem(

        "favorites",

        JSON.stringify(favorites)

    );

    renderFavorites();

}

function renderFavorites(){

    if(!favoritesContainer) return;

    favoritesContainer.innerHTML =
    "";

    favorites.forEach(game => {

        favoritesContainer.appendChild(

            createGameCard(game)

        );

    });

}

// ======================================
// RECENT
// ======================================

function addRecent(game){

    recent =
    recent.filter(

        g => g.name !== game.name

    );

    recent.unshift(game);

    recent =
    recent.slice(0,15);

    localStorage.setItem(

        "recent",

        JSON.stringify(recent)

    );

    renderRecent();

}

function renderRecent(){

    if(!recentContainer) return;

    recentContainer.innerHTML =
    "";

    recent.forEach(game => {

        recentContainer.appendChild(

            createGameCard(game)

        );

    });

}

// ======================================
// LAUNCH GAME
// ======================================

function launchGame(game){

    if(!game.url){

        alert(
            "No URL set for this game yet."
        );

        return;

    }

    gameFrame.src =
    game.url;

    playerOverlay.style.display =
    "block";

    addRecent(game);

}

// ======================================
// CLOSE PLAYER
// ======================================

const closeBtn =
document.getElementById("closePlayer");

if(closeBtn){

    closeBtn.onclick = () => {

        playerOverlay.style.display =
        "none";

        gameFrame.src =
        "";

    };

}

// ======================================
// SEARCH
// ======================================

if(searchInput){

    searchInput.addEventListener(

        "input",

        () => {

            const value =
            searchInput.value
            .toLowerCase();

            renderGames(

                games.filter(game =>

                    game.name
                    .toLowerCase()
                    .includes(value)

                )

            );

        }

    );

}

// ======================================
// CATEGORIES
// ======================================

function buildCategories(){

    if(!categoriesContainer)
    return;

    categoriesContainer.innerHTML =
    "";

    const categories =

    [...new Set(

        games.map(
            game =>
            game.category
        )

    )];

    const allBtn =
    document.createElement("button");

    allBtn.className =
    "category-btn";

    allBtn.textContent =
    "All";

    allBtn.onclick =
    () => renderGames(games);

    categoriesContainer.appendChild(
        allBtn
    );

    categories.forEach(category => {

        const btn =
        document.createElement("button");

        btn.className =
        "category-btn";

        btn.textContent =
        category;

        btn.onclick =
        () => {

            renderGames(

                games.filter(

                    game =>
                    game.category
                    === category

                )

            );

        };

        categoriesContainer.appendChild(
            btn
        );

    });

}

// ======================================
// FULLSCREEN
// ======================================

const fullscreenBtn =
document.getElementById(
    "fullscreenBtn"
);

if(fullscreenBtn){

    fullscreenBtn.onclick =
    () => {

        if(
            gameFrame.requestFullscreen
        ){

            gameFrame.requestFullscreen();

        }

    };

}

// ======================================
// NAVIGATION
// ======================================

document
.querySelectorAll(".nav-btn")
.forEach(btn => {

    btn.addEventListener(

        "click",

        () => {

            document
            .querySelectorAll(".nav-btn")
            .forEach(

                b => b.classList.remove(
                    "active"
                )

            );

            btn.classList.add(
                "active"
            );

            document
            .querySelectorAll(".page")
            .forEach(

                page =>
                page.classList.remove(
                    "active-page"
                )

            );

            const pageName =
            btn.dataset.page;

            const target =
            document.getElementById(

                pageName +
                "Page"

            );

            if(target){

                target.classList.add(
                    "active-page"
                );

            }

        }

    );

});

// ======================================
// END
// ======================================
