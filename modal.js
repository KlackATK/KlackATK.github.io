window.addEventListener("DOMContentLoaded", function () {

    this.document.querySelectorAll('.modalImg').forEach(img => {
        img.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.style.display = "block";
                document.body.style.overflow = "hidden";
            }

            const closeButtons = document.getElementsByClassName("close");

            for (let i = 0; i < closeButtons.length; i++) {
                closeButtons[i].addEventListener("click", function () {
                    const parent = this.closest(".modal");
                    if (parent) {
                        parent.style.display = "none";
                        document.body.removeAttribute('style');
                    }

                });
            }

            targetModal.addEventListener("click", function(event) {
                if (event.target === targetModal) {
                    targetModal.style.display = "none";
                    document.body.removeAttribute('style');
                }
            });
        });
    });
});