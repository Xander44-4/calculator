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
            noHistoryMsg.textContent = 'No calculation history available';
            noHistoryMsg.style.textAlign = 'center';
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