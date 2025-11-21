(function () {
  const STATE_ACTIVE = "active";
  const DIR_NEXT = "next";
  const DIR_PREV = "prev";

  const slides = document.getElementsByClassName("slide");
  let slideIndex = 0;
  let frameIndex = 0;
  let isAnimating = false; // Flag to prevent race conditions

  const counter = document.getElementById("counter");

  /**
   * Format: "Slide X/Y" or "Slide X/Y | Frames A/B"
   */
  function updateCounter() {
    const totalSlides = slides.length;
    const currentSlide = slides[slideIndex];
    const totalFrames = currentSlide.getElementsByClassName("frame").length;

    // Always show frame count, even if 0/0
    counter.innerHTML = `
      <span>Slide ${slideIndex + 1}/${totalSlides}</span>
      <span class="count-sep">|</span>
      <span>Frame ${frameIndex}/${totalFrames}</span>`;
  }

  // Initial update
  updateCounter();

  let headerCounter = 0;
  // Alternates header alignment (left/right) for visual variety across slides
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const header = slide.querySelector("header");
    if (!header) continue;
    header.classList.add(
      headerCounter % 2 === 0 ? "r" : "l"
    );
    headerCounter++;
  }

  /**
   * Handles the transition animation between two slides.
   * Returns a Promise that resolves when the animation completes to ensure
   * subsequent actions (like frame resets) wait for the visual transition.
   */
  function executeSlideAnimation(direction, currentSlide, newSlideIndex) {
    return new Promise((resolve) => {
      isAnimating = true; // Lock navigation
      const nextSlide = slides[newSlideIndex];

      currentSlide.classList.add(`move-out-${direction}`);
      nextSlide.classList.add(`move-in-${direction}`);

      // One-time event listener to clean up classes after animation finishes
      currentSlide.addEventListener("animationend", function handler() {
        currentSlide.classList.remove(STATE_ACTIVE, `move-out-${direction}`);
        nextSlide.classList.remove(`move-in-${direction}`);
        nextSlide.classList.add(STATE_ACTIVE);

        slideIndex = newSlideIndex;
        updateCounter(); // Update counter after slide change

        currentSlide.removeEventListener("animationend", handler);
        isAnimating = false; // Unlock navigation
        resolve();
      });
    });
  }

  /**
   * Main navigation function.
   * Prioritizes revealing internal "frames" (bullet points/fragments) within the current slide.
   * If no frames remain, it triggers the transition to the next/previous slide.
   * @param {string} direction - DIR_NEXT or DIR_PREV
   * @param {boolean} ignoreFrames - If true, skips frame animations and jumps directly to the next/prev slide.
   */
  async function changeSlide(direction, ignoreFrames = false) {
    if (isAnimating) return; // Prevent rapid-fire inputs

    const currentSlide = slides[slideIndex];
    const frames = slides[slideIndex].getElementsByClassName("frame");
    let newSlideIndex;

    if (direction === DIR_NEXT) {
      newSlideIndex = (slideIndex + 1) % slides.length;
    } else if (direction === DIR_PREV) {
      newSlideIndex = (slideIndex - 1 + slides.length) % slides.length;
    }

    // Handle frames (bullet points) unless we are skipping them
    if (!ignoreFrames && frames.length > 0) {
      // Next: Reveal next frame if available
      if (direction === DIR_NEXT && frameIndex < frames.length) {
        frames[frameIndex].classList.add(STATE_ACTIVE);
        frameIndex++;
        updateCounter(); // Update counter after frame reveal
        return;
      }
      // Prev: Hide current frame if available (go back one step)
      if (direction === DIR_PREV && frameIndex > 0) {
        frameIndex--;
        frames[frameIndex].classList.remove(STATE_ACTIVE);
        updateCounter(); // Update counter after frame hide
        return;
      }
    }

    // If no frame action was taken (or we are skipping frames), transition slides

    // Reset frame index for the next slide
    frameIndex = 0;

    // Await the slide transition before resetting any frame states to avoid visual glitches
    await executeSlideAnimation(direction, currentSlide, newSlideIndex);

    // Reset all frames in the (now previous) slide so they are hidden next time we visit
    for (const item of frames) {
      item.classList.remove(STATE_ACTIVE);
    }
    // Note: updateCounter is called inside executeSlideAnimation, so we don't need it here.
  }

  // Bind keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") changeSlide(DIR_NEXT);
    if (e.key === "ArrowLeft") changeSlide(DIR_PREV);
    if (e.key === "d") changeSlide(DIR_NEXT, true); // Quick Next
    if (e.key === "a") changeSlide(DIR_PREV, true); // Quick Prev
  });
})();
