let currentIndex = 0; // Keeps track of the current index of the projects to be displayed
const projectsPerLoad = 6; // Number of projects to load per click

// Function to fetch JSON data and render projects
function loadProjects() {
  fetch("projects.json")
    .then((response) => response.json()) // Parse the JSON data
    .then((projects) => {
      const container = document.getElementById("fitRows-grid");
      const loadMoreButton = document.getElementById("load-more-button");

      // Render the first set of projects (6 by default)
      renderProjectBatch(projects);

      // Set up event listener for the Load More button
      loadMoreButton.addEventListener("click", function () {
        currentIndex += projectsPerLoad;
        renderProjectBatch(projects);
      });

      // Function to render the current batch of projects
      function renderProjectBatch(projects) {
        const endIndex = Math.min(
          currentIndex + projectsPerLoad,
          projects.length
        );
        for (let i = currentIndex; i < endIndex; i++) {
          const project = projects[i];

          // Create the project element
          const projectElement = document.createElement("div");
          projectElement.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");

          projectElement.innerHTML = `
            <div class="single-portfolio position-relative text-center">
              <img src="${project.image}" alt="Thumbnail" class="img-fluid" />
              <div class="portfolio-title bg-white rgb-85 d-flex flex-column justify-content-center">
                <a href="${project.link}">
                  <h3>${project.title}</h3>
                </a>
                <h5>${project.description}</h5>
                <a href="${project.link}"><i class="ti-arrow-right"></i></a>
              </div>
            </div>
          `;
          container.appendChild(projectElement);
        }

        // Disable the Load More button if all projects are loaded
        if (currentIndex >= projects.length) {
          loadMoreButton.style.display = "none";
        }
      }
    })
    .catch((error) => console.error("Error loading projects:", error));
}

// Call the function to load and render the initial set of projects
loadProjects();
