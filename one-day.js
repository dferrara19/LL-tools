(function() {
    const readyCheckbox = document.getElementById('ready');
    const moneyCheckboxes = document.querySelectorAll('input[type="checkbox"][name^="M"]');
    const honestyBox = readyCheckbox.closest('div'); 
    const submitBtn = document.querySelector('input[type="submit"]');

    // 1. Create the sub-text area for errors
    const errorMsg = document.createElement('div');
    // Added 8px margin-top and 8px padding-bottom for better vertical breathing room
    errorMsg.style.cssText = 'color: #b30000; font-weight: bold; font-size: 0.8em; margin-top: 8px; padding-bottom: 8px; display: none; padding-left: 5px; font-family: Lato, sans-serif; transition: all 0.2s ease;';
    honestyBox.appendChild(errorMsg);

    const getMoneyCount = () => {
        return Array.from(moneyCheckboxes).filter(cb => cb.checked).length;
    };

    // 2. The Checkbox Gatekeeper
    readyCheckbox.addEventListener('change', function(e) {
        const count = getMoneyCount();

        if (this.checked && count !== 5) {
            this.checked = false;
            
            errorMsg.innerText = `⚠️ Select exactly 5 Money Questions (Current: ${count})`;
            errorMsg.style.display = 'block';
            
            // RESET ANIMATION: Gentle nudge
            honestyBox.style.animation = 'none';
            honestyBox.offsetHeight; 
            honestyBox.style.animation = "gentle-nudge 0.3s ease-in-out";
            
        } else {
            errorMsg.style.display = 'none';
        }
    });

    // 3. Reset error message
    moneyCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            errorMsg.style.display = 'none';
        });
    });

    // 4. Inject the toned-down CSS
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
