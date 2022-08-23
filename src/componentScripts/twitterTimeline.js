const twitterToggle = document.getElementById("twitter-toggle");
let isTwitterExpanded = twitterToggle.getAttribute("aria-expanded") === "true";

const toggleTwitterVisibility = () => {
    console.log("clicking the twitter toggle ---jaffa", isTwitterExpanded);
    isTwitterExpanded = !isTwitterExpanded;
    localStorage.setItem("showTwitterTimeline", isTwitterExpanded);
    twitterToggle.setAttribute("aria-expanded", isTwitterExpanded);
};

twitterToggle.addEventListener("click", toggleTwitterVisibility);