import React, { JSX } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function FeatureHighlights(): JSX.Element {
  return (
    <section className={styles.highlightSection}>
      <div className="container">
        
        {/* Feature 1: AI Chatbot */}
        <div className={clsx(styles.highlightRow, styles.rowReverse)}>
          <div className={styles.highlightContent}>
            <div className={styles.badge}>24/7 Assistance</div>
            <Heading as="h2" className={styles.highlightTitle}>
              AI-Powered Chatbot Companion
            </Heading>
            <p className={styles.highlightDescription}>
              Don't get stuck on complex robotics concepts. Our intelligent chatbot is integrated directly into the documentation, ready to answer your questions, explain code snippets, and guide you through the learning process in real-time.
            </p>
            <ul className={styles.featureList}>
              <li>🤖 Context-aware answers based on course material</li>
              <li>⚡ Instant code debugging assistance</li>
              <li>🧠 Personalized learning path recommendations</li>
            </ul>
          </div>
          <div className={styles.highlightVisual}>
            {/* AI Chatbot Image - Abstract Tech/Network */}
            <img 
              src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop" 
              alt="AI Chatbot Interface" 
              className={styles.visualImage}
            />
          </div>
        </div>

        {/* Feature 2: Urdu Translation */}
        <div className={styles.highlightRow}>
          <div className={styles.highlightContent}>
            <div className={styles.badge}>Accessible Learning</div>
            <Heading as="h2" className={styles.highlightTitle}>
              Instant Book Translation
            </Heading>
            <p className={styles.highlightDescription}>
              We believe knowledge should have no borders. Our platform includes a powerful translation engine that instantly converts complex technical books and documentation into Urdu, making advanced robotics accessible to a wider audience.
            </p>
            <ul className={styles.featureList}>
              <li>🌏 High-accuracy neural machine translation</li>
              <li>📖 Preserves technical formatting and code blocks</li>
              <li>🔄 Switch between English and Urdu with one click</li>
            </ul>
          </div>
          <div className={styles.highlightVisual}>
             {/* Translation Image - Global Education/Book */}
             <img 
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop" 
              alt="Open Book Translation" 
              className={styles.visualImage}
            />
          </div>
        </div>

      </div>
    </section>
  );
}