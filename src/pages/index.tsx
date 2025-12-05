import React, { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from '../components/Auth/GoogleLogin';
import FeatureHighlights from '@site/src/components/FeatureHighlights';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          {/* Left Column */}
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Physical AI &<br />
              Humanoid Robotics
            </h1>
            <p className={styles.heroSubtitle}>
              {siteConfig.tagline}
            </p>
            
            <div className={styles.heroActions}>
              <Link
                className={styles.primaryButton}
                to="/docs/overview">
                Start Learning <span>→</span>
              </Link>
              <Link
                className={styles.secondaryButton}
                to="/about">
                About Me
              </Link>
              <div className={styles.googleButtonWrapper}>
                 <GoogleLoginButton />
              </div>
            </div>

            <div className={styles.brandsSection}>
              <p className={styles.brandsTitle}>Powered By:</p>
              <div className={styles.brandsList}>
                <span className={styles.brandBadge}>ROS 2</span>
                <span className={styles.brandBadge}>Python</span>
                <span className={styles.brandBadge}>Gazebo</span>
                <span className={styles.brandBadge}>PyTorch</span>
                <span className={styles.brandBadge}>OpenAI</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.heroVisual}>
            <img 
              src={useBaseUrl('https://img-cdn.inc.com/image/upload/f_webp,q_auto,c_fit/images/panoramic/figure-robot-start-up-inc_543614_h1rxv6.jpg')} 
              alt="Futuristic Humanoid Robot" 
              className={styles.robotImage}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const googleClientId = siteConfig.customFields?.googleClientId as string;

  return (
    <GoogleOAuthProvider clientId={googleClientId || ''}>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Bridging the gap between the digital brain and the physical body.">
        <HomepageHeader />
        <main>
          <FeatureHighlights />
        </main>
      </Layout>
    </GoogleOAuthProvider>
  );
}