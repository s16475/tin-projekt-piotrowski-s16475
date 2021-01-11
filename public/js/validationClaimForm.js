function validateForm() {

    const claimDateInput = document.getElementById('claimDate');
    const claimValueInput = document.getElementById('claimValue');
    const claimCauseInput = document.getElementById('claimCause');

    const errorClaimDate = document.getElementById('errorClaimDate');
    const errorClaimValue = document.getElementById('errorClaimValue');
    const errorClaimCause = document.getElementById('errorClaimCause');
    const errorsSummary = document.getElementById('errorsSummary');

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const charMessage = document.getElementById('errorMessage-characters').innerText;
    const dateMessage = document.getElementById('errorMessage-date').innerText;
    const fdateMessage = document.getElementById('errorMessage-fdate').innerText;
    const numberMessage = document.getElementById('errorMessage-number').innerText;
    const pnumberMessage = document.getElementById('errorMessage-pnumber').innerText;

    resetErrors([claimDateInput, claimValueInput, claimCauseInput], [errorClaimDate, errorClaimValue, errorClaimCause], errorsSummary, 
        [reqMessage, charMessage, dateMessage, fdateMessage, numberMessage, pnumberMessage]);

    let valid = true;

    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = nowDate.getFullYear();

    if (month.length < 2)
    month = '0' + month;
    if (day.length < 2)
    day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(claimDateInput.value)) {
    valid = false;
    claimDateInput.classList.add("error-input");
    errorClaimDate.innerText = reqMessage;
    } else if (!checkDate(claimDateInput.value)) {
    valid = false;
    claimDateInput.classList.add("error-input");
    errorClaimDate.innerText = dateMessage;
    } else if (checkDateIfAfter(claimDateInput.value, nowString)) {
    valid = false;
    claimDateInput.classList.add("error-input");
    errorClaimDate.innerText = fdateMessage;
    }

    if (!checkRequired(claimValueInput.value)) {
        valid = false;
        claimValueInput.classList.add("error-input");
        errorClaimValue.innerText = reqMessage;
    } else if (!checkNumber(claimValueInput.value)) {
        valid = false;
        claimValueInput.classList.add("error-input");
        errorClaimValue.innerText = numberMessage;
    } else if (!checkIfNumberPositive(claimValueInput.value)) {
        valid = false;
        claimValueInput.classList.add("error-input");
        errorClaimValue.innerText = pnumberMessage;
    }

    if (!checkRequired(claimCauseInput.value)) {
        valid = false;
        claimCauseInput.classList.add("error-input");
        errorClaimCause.innerText = reqMessage;
    } else if (!checkTextLengthRange(claimCauseInput.value, 2, 60)) {
        valid = false;
        claimCauseInput.classList.add("error-input");
        errorClaimCause.innerText = charMessage;
    }
    
    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy / Form contains errors";
    }

    return valid;

}