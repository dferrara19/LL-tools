(function() {
    const readyCheckbox = document.getElementById('ready');
    const pointInputs = document.querySelectorAll('input.pts');
    const honestyBox = document.querySelector('.honestybox');

    const errorMsg = document.createElement('div');
    errorMsg.style.cssText = 'color: #b30000; font-weight: bold; font-size: 0.8em; margin-top: 8px; padding-bottom: 8px; display: none; padding-left: 5px; font-family: Lato, sans-serif;';
    
    if (honestyBox) {
        honestyBox.appendChild(errorMsg);
    }

    const validateLLPoints = () => {
        const required = [0, 1, 1, 2, 2, 3];
        const currentValues = Array.from(pointInputs)
            .map(input => parseInt(input.value, 10))
            .filter(val => !isNaN(val))
            .sort();

        const isValid = JSON.stringify(currentValues) === JSON.stringify(required);
        const currentSum = currentValues.reduce((a, b) => a + b, 0);
        
        return { isValid, currentSum };
    };

    // We use 'click' instead of 'change' to intercept the state switch
    readyCheckbox.addEventListener('click', function(e) {
        const status = validateLLPoints();

        if (!status.isValid) {
            // 1. Stop the checkbox from actually checking
            // 2. Stop LL's script from adding the 'checked' class (the green color)
            e.preventDefault();
            e.stopImmediatePropagation();

            errorMsg.innerText = `⚠️ Points must be 0, 1, 1, 2, 2, 3 (Current total: ${status.currentSum})`;
            errorMsg.style.display = 'block';
            
            honestyBox.style.animation = 'none';
            honestyBox.offsetHeight; 
            honestyBox.style.animation = "gentle-nudge 0.3s ease-in-out";
        } else {
            errorMsg.style.display = 'none';
        }
    });

    pointInputs.forEach(input => {
        input.addEventListener('input', () => {
            errorMsg.style.display = 'none';
            // If they change points, we force the box back to pink/unchecked
            readyCheckbox.checked = false;
            honestyBox.classList.remove('checked');
        });
    });

    if (!document.getElementById('ll-validator-style')) {
        const style = document.createElement('style');
        style.id = 'll-validator-style';
        style.innerHTML = `
            @keyframes gentle-nudge {
                0% { transform: translateX(0); }
                25% { transform: translateX(3px); }
                50% { transform: translateX(-3px); }
                75% { transform: translateX(3px); }
                100% { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }
})();
