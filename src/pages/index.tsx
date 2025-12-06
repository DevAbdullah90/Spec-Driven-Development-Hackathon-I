import React, { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from '../components/Auth/GoogleLogin';
import FeatureHighlights from '../components/FeatureHighlights';
import { SplineSceneBasic } from '../components/SplineSceneBasic';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroSection}>
      <SplineSceneBasic />
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