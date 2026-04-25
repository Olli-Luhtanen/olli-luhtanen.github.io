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
const GithubUser = "Olli-Luhtanen";

async function fetchGithubRepos() {
  const grid = document.getElementById('github-grid');
  if (!grid) return;

  try {
    const response = await fetch(`https://api.github.com/users/${GithubUser}/repos?per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch repositories');

    let repos = await response.json();

    // Sort by last updated, most recent first
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

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