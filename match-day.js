(function() {
    const readyCheckbox = document.getElementById('ready');
    const pointInputs = document.querySelectorAll('input.pts');
    const honestyBox = document.querySelector('.honestybox');
    const submitBtn = document.querySelector('input[type="submit"].button.primary');

    // 1. Create a dedicated sub-text area under the checkbox
    const errorMsg = document.createElement('div');
    errorMsg.style.cssText = 'color: #990000; font-weight: bold; font-size: 0.85em; margin-top: 4px; display: none; padding-left: 5px;';
    honestyBox.appendChild(errorMsg);

    const getPointStatus = () => {
        const required = [0, 1, 1, 2, 2, 3];
        const currentValues = Array.from(pointInputs)
            .map(input => parseInt(input.value, 10))
            .filter(val => !isNaN(val))
            .sort();
        
        return {
            isValid: JSON.stringify(currentValues) === JSON.stringify(required),
            currentSum: currentValues.reduce((a, b) => a + b, 0)
        };
    };

    // 2. The Checkbox Interceptor
    readyCheckbox.addEventListener('change', function(e) {
        const status = getPointStatus();

        if (this.checked && !status.isValid) {
            // Force uncheck if points are wrong
            this.checked = false;
            honestyBox.classList.remove('checked'); // LL uses this class for the green color
            
            // Show helpful sub-text
            errorMsg.innerText = `⚠️ Set points to 0,1,1,2,2,3 first (Current total: ${status.currentSum})`;
            errorMsg.style.display = 'block';
            
            // Optional: shake effect to grab attention
            honestyBox.style.animation = "shake 0.2s ease-in-out 0s 2";
        } else {
            errorMsg.style.display = 'none';
        }
    });

    // 3. Clean up the message if they start fixing points
    pointInputs.forEach(input => {
        input.addEventListener('input', () => {
            errorMsg.style.display = 'none';
        });
    });

    // CSS for the subtle shake
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(5px); }
            50% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);
})();
