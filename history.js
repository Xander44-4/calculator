
const changeModeBtn = document.getElementById('changeMode');
var darkmode = localStorage.getItem('darkmode')

function enableDarkMode() {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

function disableDarkMode() {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if (darkmode === "active") { enableDarkMode() }


changeModeBtn.addEventListener('click', function () {
    darkmode = localStorage.getItem('darkmode')
    darkmode == "active" ? disableDarkMode() : enableDarkMode()
});


document.addEventListener('DOMContentLoaded', () => {
    const historyContainer = document.getElementById('history');
    const deleteButton = document.getElementById('delete');





    function loadHistory() {
        historyContainer.innerHTML = '';

        let list = [];

        try {
            const data = localStorage.getItem('history');
            if (data) {
                list = JSON.parse(data);
            }


            if (!Array.isArray(list)) {
                list = [];
            }
        } catch (error) {
            list = [];
            console.log('Error loading history:', error);
        }


        if (list.length === 0) {
            const noHistoryMsg = document.createElement('div');
            noHistoryMsg.textContent = 'No History';
            noHistoryMsg.style.textAlign = 'center';
            noHistoryMsg.style.padding = '10px';
            historyContainer.appendChild(noHistoryMsg);
            return;
        }


        list.forEach(entry => {
            const item = document.createElement('div');
            item.textContent = entry;
            item.style.padding = '0.5rem';
            item.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            historyContainer.appendChild(item);
        });
    }

    deleteButton.addEventListener('click', () => {
        localStorage.removeItem('history');
        loadHistory();
        console.log('History cleared');
    });


    loadHistory();
});

