// Hamburger 
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    const IsOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle("open");
    hamburger.setAttribute('aria-expanded', IsOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
        hamburger.setAttribute('aria-expanded', false);
    });
});

// Navbars resize logic
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

//Github repos
const GithubUser = "Olli-luhtanen";

const shownprojects = [
  "Object_oriented_project",
  "rpg_prototype",
  "olli-luhtanen.github.io"
];

async function fetchGithubRepos() {
  const grid = document.getElementById('github-grid');
  if (!grid) return;

  try {
    const requests = shownprojects.map(repo =>
      fetch(`https://api.github.com/repos/${GithubUser}/${repo}`)
        .then(res => {
          if (!res.ok) throw new Error(`Repo not found: ${repo}`);
          return res.json();
        })
    );

    const repos = await Promise.all(requests);

    grid.innerHTML = repos.map(repo => `
      <a class="github-card" href="${repo.html_url}" target="_blank">
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description provided.'}</p>
        <div class="github-card-footer">
          ${repo.language ? `<span>⬤ ${repo.language}</span>` : ''}
          <span>★ ${repo.stargazers_count}</span>
          <span>⑂ ${repo.forks_count}</span>
        </div>
      </a>
    `).join('');

  } catch (err) {
    grid.innerHTML = `<p class="github-error">Failed to load repos. Please try again later.</p>`;
    console.error(err);
  }
}
fetchGithubRepos();