const api_url = "https://www.boredapi.com/api/activity";
let savedActivities = [];

async function getActivity(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    return data;
}

const fillActivity = () => {
        const activity = document.getElementById('activity');
        const fetchButton = document.getElementById('fetch');
        const saveButton = document.getElementById('save');
        
        let suggestedActivity = {};
        
        fetchButton.addEventListener('click', async () => {
            suggestedActivity = await getActivity(api_url);
            activity.innerHTML = suggestedActivity.activity;
            colorCode(suggestedActivity.price, suggestedActivity.accessibility);
        });

        saveButton.addEventListener('click', () => {
            if (suggestedActivity.activity !== undefined) {
                savedActivities.push(suggestedActivity.activity);
                showSaved();
            }
        });
}

const colorCode = (price, accessibility) => {
    const priceBox = document.getElementById('price');
    const accessibilityBox = document.getElementById('accessibility');

    if (price <= 0.33) {
        priceBox.innerHTML = "Price: low";
        priceBox.style.backgroundColor = "lightgreen";
    } else if (price <= 0.66) {
        priceBox.innerHTML = "Price: medium";
        priceBox.style.backgroundColor = "yellow";
    } else {
        priceBox.innerHTML = "Price: high";
        priceBox.style.backgroundColor = "red";
    }
    
    if (accessibility <= 0.33) {
        accessibilityBox.innerHTML = "Accessibility: high";
        accessibilityBox.style.backgroundColor = "lightgreen";
    } else if (accessibility <= 0.66) {
        accessibilityBox.innerHTML = "Accessibility: medium";
        accessibilityBox.style.backgroundColor = "yellow";
    } else {
        accessibilityBox.innerHTML = "Accessibility: low";
        accessibilityBox.style.backgroundColor = "red";
    }
}

const showSaved = () => {
    const activityList = document.getElementById('activityList');

    activityList.innerHTML = "";
    for (let i = 0;i < savedActivities.length;i++) {
        activityList.innerHTML += `<li id="item${i}">${savedActivities[i]} <button id="button${i}" class="removeButton">X</button></li>`;
    }
    addEventListeners();
}

const addEventListeners = () => {
    for (let i = 0;i < savedActivities.length;i++) {
        document.getElementById(`button${i}`).addEventListener('click', () => {
                savedActivities.splice(i, 1);
                showSaved();        
        });
    }
}

fillActivity();
