function endGame() {
    // End the game. Wipes game data, except for the players.

    // If the game was started, set a games state for the lobby to show all players' roles
    if (localStorage.getItem('isGameStarted')) {
        localStorage.setItem('showPlayerRoles', 'true');
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

function resetGame() {        
    // Clear all local storage
    localStorage.clear();
    window.location.href = 'index.html';
}

function skipToVote() {
    // Skip to the end of the current game and go to the final vote

    // Set the gameSkipped variable to true in the Alpine data store
    Alpine.store("gameState").isGameSkipped = true;
}

function createProgressControl(controlContainerElement, methodToCall) {
    // Takes a container element for a progress button control and adds the hold/percentage effect to it.
    // Also, calls the given methodToCall when the button is held to 100%.

    const progress = controlContainerElement.querySelector("progress");
    const progressPercent = controlContainerElement.querySelector(".progress-percent");
    const progressDisplay = controlContainerElement.querySelector(".progress-display");
    const button = controlContainerElement.querySelector("button");
    let loadVal = 0;
    let loadingInterval;

    function load() {
        progress.setAttribute("value", loadVal);
        loadVal += 1;
        if (loadVal >= 100) {
            loadVal = 100;
            controlContainerElement.style.display = "none";
            // Ensure the method is called only once
            if (methodToCall) {
                methodToCall();
                methodToCall = null;
            }
        }
        progressPercent.innerHTML = loadVal + "%";
    }

    button.addEventListener("touchstart", function () {
        // Show the progress display
        progressDisplay.style.visibility = "visible";

        if (loadVal < 100) {
            loadingInterval = setInterval(load, 20);
        }
    });

    button.addEventListener("touchend", function () {
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

// Add a listener for page load
document.addEventListener("DOMContentLoaded", function () {
    const endGameControl = document.getElementById("end-game-control");
    const skipGameControl = document.getElementById("skip-game-control");

    // Add listeners for touch events if the buttons exist
    if (endGameControl) {
        createProgressControl(endGameControl, endGame);
    }

    if (skipGameControl) {
        createProgressControl(skipGameControl, skipToVote);
    }
});
