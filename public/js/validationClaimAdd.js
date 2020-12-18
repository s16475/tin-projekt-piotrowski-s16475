function validateForm2() {

    const claimDateInput = document.getElementById('claimDate');
    const claimValueInput = document.getElementById('claimValue');
    const claimCauseInput = document.getElementById('claimCause');
    const claimPolicyInput = document.getElementById('claimPolicy');
    const claimEmployeeInput = document.getElementById('claimEmployee');

    const errorClaimDate = document.getElementById('errorClaimDate');
    const errorClaimValue = document.getElementById('errorClaimValue');
    const errorClaimCause = document.getElementById('errorClaimCause');
    const errorClaimPolicy = document.getElementById('errorClaimPolicy');
    const errorClaimEmployee = document.getElementById('errorClaimEmployee');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([claimDateInput, claimValueInput, claimCauseInput, claimPolicyInput, claimEmployeeInput], 
        [errorClaimDate, errorClaimValue, errorClaimCause, errorClaimPolicy, errorClaimEmployee], errorsSummary);

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
    errorClaimDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(claimDateInput.value)) {
    valid = false;
    claimDateInput.classList.add("error-input");
    errorClaimDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(claimDateInput.value, nowString)) {
    valid = false;
    claimDateInput.classList.add("error-input");
    errorClaimDate.innerText = "Data nie może być z przyszłości";
    }

    if (!checkRequired(claimValueInput.value)) {
        valid = false;
        claimValueInput.classList.add("error-input");
        errorClaimValue.innerText = "Pole jest wymagane";
    } else if (!checkNumber(claimValueInput.value)) {
        valid = false;
        claimValueInput.classList.add("error-input");
        errorClaimValue.innerText = "Pole powinno być liczbą";
    } else if (!checkIfNumberPositive(claimValueInput.value)) {
        valid = false;
        claimValueInput.classList.add("error-input");
        errorClaimValue.innerText = "Liczba musi być dodatnia";
    }

    if (!checkRequired(claimCauseInput.value)) {
        valid = false;
        claimCauseInput.classList.add("error-input");
        errorClaimCause.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(claimCauseInput.value, 2, 60)) {
        valid = false;
        claimCauseInput.classList.add("error-input");
        errorClaimCause.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
    
    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    if (!checkRequired(claimPolicyInput.value)) {
        valid = false;
        claimPolicyInput.classList.add("error-input");
        errorClaimPolicy.innerText = "Pole jest wymagane";
    } else if (!checkNumber(claimPolicyInput.value)) {
        valid = false;
        claimPolicyInput.classList.add("error-input");
        errorClaimPolicy.innerText = "Pole powinno być liczbą";
    } else if (!checkIfNumberPositive(claimPolicyInput.value)) {
        valid = false;
        claimPolicyInput.classList.add("error-input");
        errorClaimPolicy.innerText = "Liczba musi być dodatnia";
    }

    if (!checkRequired(claimEmployeeInput.value)) {
        valid = false;
        claimEmployeeInput.classList.add("error-input");
        errorClaimEmployee.innerText = "Pole jest wymagane";
    } else if (!checkNumber(claimEmployeeInput.value)) {
        valid = false;
        claimEmployeeInput.classList.add("error-input");
        errorClaimEmployee.innerText = "Pole powinno być liczbą";
    } else if (!checkIfNumberPositive(claimEmployeeInput.value)) {
        valid = false;
        claimEmployeeInput.classList.add("error-input");
        errorClaimEmployee.innerText = "Liczba musi być dodatnia";
    }

    return valid;

}