// ======================================
// HORIZON
// Main Script
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

const fullscreenBtn =
document.getElementById("fullscreenBtn");

const closePlayer =
document.getElementById("closePlayer");

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

let requests =
JSON.parse(localStorage.getItem("requests"))
|| [];

let customGames =
JSON.parse(localStorage.getItem("customGames"))
|| [];

// ======================================
// LOAD GAMES
// ======================================

async function loadGames() {

    try {

        const response =
        await fetch("games.json");

        const data =
        await response.json();

        games =
        [...data, ...customGames];

        renderGames(games);

        renderFeatured();

        buildCategories();

        renderFavorites();

        renderRecent();

        renderAdmin();

    }

    catch(error) {

        console.error(error);

    }

}

loadGames();

// ======================================
// GAME CARD
// ======================================

function createGameCard(game){

    const card =
    document.createElement("div");

    card.className =
    "game-card";

    card.innerHTML = `

        <img src="${game.thumbnail}">

        <div class="game-info">

            <h4>${game.name}</h4>

            <div class="game-category">
                ${game.category}
            </div>

            <div class="card-actions">

                <button
                    class="play-btn">
                    Play
                </button>

                <button
                    class="favorite-btn">
                    ⭐
                </button>

            </div>

        </div>

    `;

    const playBtn =
    card.querySelector(".play-btn");

    playBtn.onclick =
    () => launchGame(game);

    const favBtn =
    card.querySelector(".favorite-btn");

    favBtn.onclick =
    (e) => {

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

function renderGames(gameList){

    gamesContainer.innerHTML = "";

    gameList.forEach(game => {

        gamesContainer.appendChild(
            createGameCard(game)
        );

    });

}

// ======================================
// FEATURED
// ======================================

function renderFeatured(){

    featuredContainer.innerHTML = "";

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

    favoritesContainer.innerHTML = "";

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
    recent.slice(0,20);

    localStorage.setItem(
        "recent",
        JSON.stringify(recent)
    );

    renderRecent();

}

function renderRecent(){

    recentContainer.innerHTML = "";

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

    gameFrame.src =
    game.url;

    playerOverlay.style.display =
    "block";

    addRecent(game);

}

closePlayer.onclick =
() => {

    gameFrame.src = "";

    playerOverlay.style.display =
    "none";

};

// ======================================
// FULLSCREEN
// ======================================

fullscreenBtn.onclick =
() => {

    if(gameFrame.requestFullscreen){

        gameFrame.requestFullscreen();

    }

};

// ======================================
// SEARCH
// ======================================

searchInput.addEventListener(
    "input",
    () => {

        const value =
        searchInput.value
        .toLowerCase();

        const filtered =
        games.filter(game =>

            game.name
            .toLowerCase()
            .includes(value)

        );

        renderGames(filtered);

    }
);

// ======================================
// CATEGORIES
// ======================================

function buildCategories(){

    categoriesContainer.innerHTML =
    "";

    const categories =

    [...new Set(

        games.map(
            g => g.category
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
                    g =>
                    g.category
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
// PAGE NAVIGATION
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
                b =>
                b.classList.remove("active")
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

            const target =
            btn.dataset.page;

            document
            .getElementById(
                target + "Page"
            )
            .classList.add(
                "active-page"
            );

        }
    );

});

// ======================================
// THEMES
// ======================================

const themeSelect =
document.getElementById(
    "themeSelect"
);

const themeToggle =
document.getElementById(
    "themeToggle"
);

function applyTheme(theme){

    document.body.classList.remove(
        "light",
        "midnight"
    );

    if(theme !== "dark"){

        document.body.classList.add(
            theme
        );

    }

    localStorage.setItem(
        "theme",
        theme
    );

}

const savedTheme =
localStorage.getItem("theme")
|| "dark";

themeSelect.value =
savedTheme;

applyTheme(savedTheme);

themeSelect.onchange =
() => {

    applyTheme(
        themeSelect.value
    );

};

themeToggle.onclick =
() => {

    const current =
    localStorage.getItem("theme")
    || "dark";

    if(current === "dark"){

        applyTheme("light");

        themeSelect.value =
        "light";

    }

    else{

        applyTheme("dark");

        themeSelect.value =
        "dark";

    }

};

// ======================================
// REQUESTS
// ======================================

const requestForm =
document.getElementById(
    "requestForm"
);

const requestList =
document.getElementById(
    "requestList"
);

function renderRequests(){

    requestList.innerHTML =
    "";

    requests.forEach(req => {

        const card =
        document.createElement("div");

        card.className =
        "request-card";

        card.innerHTML = `

            <strong>
                ${req.name}
            </strong>

            <p>
                ${req.reason}
            </p>

        `;

        requestList.appendChild(
            card
        );

    });

}

requestForm.addEventListener(
    "submit",
    e => {

        e.preventDefault();

        const name =
        document.getElementById(
            "requestName"
        ).value;

        const reason =
        document.getElementById(
            "requestReason"
        ).value;

        requests.push({

            name,
            reason

        });

        localStorage.setItem(

            "requests",

            JSON.stringify(
                requests
            )

        );

        renderRequests();

        requestForm.reset();

    }
);

renderRequests();

// ======================================
// ADMIN PANEL
// ======================================

const adminForm =
document.getElementById(
    "adminForm"
);

const adminGames =
document.getElementById(
    "adminGames"
);

function renderAdmin(){

    adminGames.innerHTML =
    "";

    customGames.forEach(
        (game,index) => {

        const card =
        document.createElement("div");

        card.className =
        "admin-card";

        card.innerHTML = `

            <span>
                ${game.name}
            </span>

            <button
                class="delete-btn">
                Delete
            </button>

        `;

        card
        .querySelector(
            ".delete-btn"
        )
        .onclick = () => {

            customGames.splice(
                index,
                1
            );

            localStorage.setItem(

                "customGames",

                JSON.stringify(
                    customGames
                )

            );

            location.reload();

        };

        adminGames.appendChild(
            card
        );

    });

}

adminForm.addEventListener(
    "submit",
    e => {

        e.preventDefault();

        const game = {

            name:
            document
            .getElementById(
                "gameName"
            ).value,

            category:
            document
            .getElementById(
                "gameCategory"
            ).value,

            thumbnail:
            document
            .getElementById(
                "gameImage"
            ).value,

            url:
            document
            .getElementById(
                "gameUrl"
            ).value

        };

        customGames.push(game);

        localStorage.setItem(

            "customGames",

            JSON.stringify(
                customGames
            )

        );

        location.reload();

    }
);

// ======================================
// END
// ======================================
