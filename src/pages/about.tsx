import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './about.module.css';

// Data Snapshot from GitHub (User: DevAbdullah90)
const USER_DATA = {
  name: "Abdullah Khan",
  username: "DevAbdullah90",
  avatar: "https://avatars.githubusercontent.com/u/136432132?v=4",
  bio: "Software Developer & Tech Enthusiast from Karachi. Building digital experiences with code, coffee, and curiosity.",
  location: "Karachi, Pakistan",
  publicRepos: 67,
  followers: 17,
  following: 16,
  techStack: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3", "Node.js", "React", "Next.js"],
  repos: [
    { 
        name: "CLI-ATM-MACHINE", 
        description: "A fully functional ATM simulation accessible via command line.",
        lang: "JavaScript", 
        stars: 3, 
        url: "https://github.com/DevAbdullah90/CLI-ATM-MACHINE" 
    },
    { 
        name: "CLI-CURRENCY-CONVERTOR", 
        description: "Real-time currency conversion tool for global travelers.",
        lang: "JavaScript", 
        stars: 3, 
        url: "https://github.com/DevAbdullah90/CLI-CURRENCY-CONVERTOR" 
    },
    { 
        name: "CLI-NUMBER-GUESSING-GAME", 
        description: "Interactive game logic to test your intuition.",
        lang: "JavaScript", 
        stars: 3, 
        url: "https://github.com/DevAbdullah90/CLI-NUMBER-GUESSING-GAME" 
    },
    { 
        name: "CLI-CALCULATOR", 
        description: "Robust mathematical operations in a lightweight CLI package.",
        lang: "JavaScript", 
        stars: 3, 
        url: "https://github.com/DevAbdullah90/CLI-CALCULATOR" 
    },
    { 
        name: "CLI-WORD-COUNTER-", 
        description: "Efficient text analysis tool for writers and coders.",
        lang: "JavaScript", 
        stars: 3, 
        url: "https://github.com/DevAbdullah90/CLI-WORD-COUNTER-" 
    },
  ]
};

export default function About() {
  return (
    <Layout title="About Me" description="About Abdullah Khan">
      <div className={styles.aboutContainer}>
        
        {/* Hero Section with Animated Background */}
        <header className={styles.heroHeader}>
          <div className={styles.profileWrapper}>
            <div className={styles.avatarContainer}>
                <div className={`${styles.avatarRing} ${styles.ring1}`}></div>
                <div className={`${styles.avatarRing} ${styles.ring2}`}></div>
                <img src={USER_DATA.avatar} alt={USER_DATA.name} className={styles.avatar} />
            </div>
            <div>
              <h1 className={styles.heroTitle}>{USER_DATA.name}</h1>
              <p className={styles.heroSubtitle}>
                {USER_DATA.bio}
              </p>
              <div className={styles.socialLinks}>
                <Link to={`https://github.com/${USER_DATA.username}`} className={styles.socialBtn}>
                   GitHub Profile
                </Link>
                <Link to="mailto:contact@example.com" className={styles.socialBtn}>
                   Contact Me
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Floating Stats Cards */}
        <div className={styles.statsSection}>
          <div className={styles.cardGrid}>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>📦</span>
              <span className={styles.statValue}>{USER_DATA.publicRepos}</span>
              <span className={styles.statLabel}>Repositories</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>👥</span>
              <span className={styles.statValue}>{USER_DATA.followers}</span>
              <span className={styles.statLabel}>Followers</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>🌟</span>
              <span className={styles.statValue}>15+</span>
              <span className={styles.statLabel}>Total Stars</span>
            </div>
          </div>
        </div>

        {/* Main Content Split */}
        <main className={styles.mainContent}>
            {/* Sidebar: Tech Stack */}
            <aside className={styles.sidebar}>
                <h3 className={styles.sidebarTitle}>Tech Stack</h3>
                <div className={styles.techList}>
                    {USER_DATA.techStack.map((tech, idx) => (
                        <span key={idx} className={styles.techBadge}>{tech}</span>
                    ))}
                </div>
            </aside>

            {/* Main: Projects */}
            <section className={styles.projectsFeed}>
                <div className={styles.projectsHeader}>
                    <h2>Featured Projects</h2>
                </div>
                <div className={styles.repoGrid}>
                    {USER_DATA.repos.map((repo, idx) => (
                    <Link key={idx} to={repo.url} className={styles.repoCard}>
                        <div className={styles.repoTop}>
                            <div className={styles.folderIcon}>📂</div>
                            <span className={styles.repoName}>{repo.name}</span>
                            <p className={styles.repoDesc}>{repo.description}</p>
                        </div>
                        <div className={styles.repoMeta}>
                            <div className={styles.repoLang}>
                                <span className={styles.langDot}></span>
                                {repo.lang}
                            </div>
                            <div className={styles.repoStats}>
                                <span>★ {repo.stars}</span>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
            </section>
        </main>

      </div>
    </Layout>
  );
}