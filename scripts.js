// End the game. Keeps the players, but wipes their roles and abilities.
function endGame() {
    // const storedPlayers = JSON.parse(localStorage.getItem('players'));
    // if (storedPlayers) {
    //     // Reset all players to their initial state
    //     const resetPlayers = storedPlayers.map(player => ({ ...player, role: '', usedAbility: false }));
    //     localStorage.setItem('players', JSON.stringify(resetPlayers));        
    // }

    // If the game was started, set a games state for the lobby to show all players' roles
    if (localStorage.getItem('isGameStarted')) {
        localStorage.setItem('showPlayerRoles', 'yes');
    }

    // Reset extra roles and game state variables
    localStorage.removeItem('extraRoles');
    localStorage.removeItem('isSecondHalf');
    localStorage.removeItem('firstGossip');
    localStorage.removeItem('secondGossip');
    localStorage.removeItem('isGameStarted');
    localStorage.removeItem('remainingTime');
    localStorage.removeItem('isGameOver');
    localStorage.removeItem('isScanStarted');
    window.location.href = 'setup.html';
}

let resetButton = document.getElementById("end-game"),
    progress = document.getElementById("progress-bar"),    
    progressPercent = document.getElementById("progress-percent"),
    progressDisplay = document.getElementsByClassName("progress-display")[0],
    loadVal = 0,
    loadingInterval;

function load() {
    progress.setAttribute("value", loadVal);
    loadVal += 1;
    if (loadVal >= 100) {
        loadVal = 100;
        resetButton.style.display = "none";
        endGame();
    }
    progressPercent.innerHTML = loadVal + "%";
}

// Add listeners for touch events and the buttons exist

if (resetButton) {
    resetButton.addEventListener("touchstart", function () {
        // Show the progress display
        progressDisplay.style.visibility = "visible";

        if (loadVal < 100) {
            loadingInterval = setInterval(load, 20);
        }
    });

    resetButton.addEventListener("touchend", function () {
        // Hide the progress display
        progressDisplay.style.visibility = "hidden";

        if (loadVal < 100) {
            loadVal = 0;
            clearInterval(loadingInterval);
            progress.setAttribute("value", loadVal);
            progressPercent.innerHTML = 0 + "%";
        }
    });
}

function useAorAn(word) {
    // Depending on the first letter of the word, return 'a' or 'an'
    return ['a', 'e', 'i', 'o', 'u'].includes(word[0].toLowerCase()) ? 'an' : 'a';
}
