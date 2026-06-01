/* ======================================
   HORIZON
====================================== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

:root{

    --bg:#08111f;
    --panel:#111827;
    --card:#172033;

    --text:#ffffff;
    --accent:#4da3ff;

    --border:
    rgba(255,255,255,.08);

}

/* ======================================
   LIGHT MODE
====================================== */

body.light{

    --bg:#f1f5f9;
    --panel:#ffffff;
    --card:#e2e8f0;

    --text:#111827;
    --accent:#2563eb;

    --border:
    rgba(0,0,0,.08);

}

/* ======================================
   BODY
====================================== */

body{

    background:var(--bg);

    color:var(--text);

    font-family:
    Inter,
    Arial,
    sans-serif;

    min-height:100vh;

    display:flex;

}

/* ======================================
   SIDEBAR
====================================== */

.sidebar{

    width:240px;

    min-height:100vh;

    padding:25px;

    background:
    rgba(255,255,255,.03);

    backdrop-filter:
    blur(20px);

    border-right:
    1px solid var(--border);

}

.logo{

    margin-bottom:30px;

}

.logo h1{

    color:var(--accent);

    font-size:30px;

    letter-spacing:2px;

}

/* ======================================
   NAVIGATION
====================================== */

.nav-btn{

    width:100%;

    margin-bottom:10px;

    border:none;

    padding:14px;

    cursor:pointer;

    border-radius:14px;

    background:var(--panel);

    color:var(--text);

    transition:.25s;

}

.nav-btn:hover{

    transform:
    translateY(-2px);

}

.nav-btn.active{

    background:
    var(--accent);

    color:white;

}

/* ======================================
   MAIN
====================================== */

main{

    flex:1;

    padding:30px;

}

/* ======================================
   HEADER
====================================== */

header{

    margin-bottom:30px;

}

#search{

    width:100%;

    padding:16px;

    border:none;

    border-radius:14px;

    background:
    var(--panel);

    color:var(--text);

    font-size:16px;

}

/* ======================================
   PAGE SYSTEM
====================================== */

.page{

    display:none;

}

.active-page{

    display:block;

}

/* ======================================
   SECTION TITLES
====================================== */

h2{

    margin-bottom:20px;

}

h3{

    margin-bottom:15px;

}

/* ======================================
   CATEGORIES
====================================== */

#categories{

    display:flex;

    flex-wrap:wrap;

    gap:10px;

    margin-bottom:25px;

}

.category-btn{

    border:none;

    padding:10px 16px;

    border-radius:999px;

    background:
    var(--panel);

    color:var(--text);

    cursor:pointer;

    transition:.2s;

}

.category-btn:hover{

    background:
    var(--accent);

    color:white;

}

/* ======================================
   GAME GRID
====================================== */

.games-grid,
.featured-grid{

    display:grid;

    grid-template-columns:
    repeat(
        auto-fill,
        minmax(
            250px,
            1fr
        )
    );

    gap:20px;

}

/* ======================================
   GAME CARD
====================================== */

.game-card{

    background:
    var(--card);

    border:
    1px solid var(--border);

    border-radius:20px;

    transition:.25s;

    cursor:pointer;

    min-height:150px;

}

.game-card:hover{

    transform:
    translateY(-5px);

}

.game-info{

    padding:20px;

}

.game-info h4{

    font-size:18px;

    margin-bottom:10px;

}

.game-category{

    opacity:.7;

    margin-bottom:16px;

    font-size:14px;

}

/* ======================================
   CARD BUTTONS
====================================== */

.card-actions{

    display:flex;

    gap:10px;

}

.card-actions button{

    flex:1;

    border:none;

    border-radius:10px;

    padding:10px;

    cursor:pointer;

}

.play-btn{

    background:
    var(--accent);

    color:white;

}

.favorite-btn{

    background:
    var(--panel);

    color:var(--text);

}

/* ======================================
   FAVORITES / RECENTS
====================================== */

#favoritesContainer,
#recentContainer{

    margin-top:15px;

}

/* ======================================
   PLAYER
====================================== */

#playerOverlay{

    display:none;

    position:fixed;

    inset:0;

    background:black;

    z-index:9999;

}

.player-top{

    position:absolute;

    top:10px;

    left:10px;

    z-index:10000;

    display:flex;

    gap:10px;

}

.player-top button{

    border:none;

    padding:10px 14px;

    border-radius:10px;

    cursor:pointer;

    background:
    rgba(
        255,
        255,
        255,
        .15
    );

    color:white;

}

#gameFrame{

    width:100%;

    height:100%;

    border:none;

}

/* ======================================
   SETTINGS
====================================== */

.settings-card{

    background:
    var(--card);

    border-radius:20px;

    padding:20px;

    max-width:400px;

}

/* ======================================
   SCROLLBAR
====================================== */

::-webkit-scrollbar{

    width:10px;

}

::-webkit-scrollbar-thumb{

    background:
    var(--accent);

    border-radius:999px;

}

/* ======================================
   MOBILE
====================================== */

@media (max-width:900px){

    body{

        flex-direction:column;

    }

    .sidebar{

        width:100%;

        min-height:auto;

    }

    main{

        padding:20px;

    }

}

@media (max-width:600px){

    .games-grid,
    .featured-grid{

        grid-template-columns:
        1fr;

    }

}
