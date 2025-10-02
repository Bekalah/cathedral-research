
        // Emergency pause system - loads first for trauma safety
        window.CATHEDRAL_EMERGENCY = {
            paused: false,
            toggle: function() {
                this.paused = !this.paused;
                document.body.classList.toggle('cathedral-paused', this.paused);
                console.log(this.paused ? '🛑 Cathedral paused' : '▶️ Cathedral resumed');
            }
        };
        
        document.addEventListener('keydown', function(e) {
            if (e.code === 'Space' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                window.CATHEDRAL_EMERGENCY.toggle();
            }
        });
    