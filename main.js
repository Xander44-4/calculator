const valueToCalculate = document.getElementsByName('display')
const btnresult = document.getElementById('btnresult')
const displayLastResult = document.getElementsByName('last_result')
var lastResult
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





btnresult.addEventListener('click', function () {
    var expression = valueToCalculate[0].value;

    try {

        var result = eval(expression);
        lastResult = expression;


        valueToCalculate[0].value = result;


        if (displayLastResult.length > 0) {
            displayLastResult[0].value = lastResult;
        }


        var historyList = [];
        try {
            var storedHistory = localStorage.getItem('history');
            if (storedHistory) {
                historyList = JSON.parse(storedHistory);

                if (!Array.isArray(historyList)) {
                    historyList = [];
                }
            }
        } catch (e) {

            historyList = [];
            console.log('Error parsing history, resetting:', e);
        }

        historyList.push(expression + ' = ' + result);
        localStorage.setItem('history', JSON.stringify(historyList));

        console.log('Calculation successful:', lastResult, '=', result);

    } catch (e) {

        valueToCalculate[0].value = 'Error';
        lastResult = 'Error';
        console.log('Calculation error:', e);
    }
});
