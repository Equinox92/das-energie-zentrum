// =====================================================
// [12.6.5]
// SECTION REVEAL ENGINE
// =====================================================

export function initializeSectionReveal() {

    const sections =
        document.querySelectorAll(".reveal-section");

    sections.forEach(section => {

        section.classList.remove("visible");

    });

    requestAnimationFrame(() => {

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {

                threshold:0.1

            }

        );

        sections.forEach(section => {

            observer.observe(section);

        });

    });

}