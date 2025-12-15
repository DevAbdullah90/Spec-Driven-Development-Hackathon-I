import React, { useState, useEffect } from 'react';
import { authClient } from '../../lib/auth-client';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function PageTranslator() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [originalContent, setOriginalContent] = useState('');
  const { data: session } = authClient.useSession();
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();

  const handleTranslatePage = async () => {
    // Auth Check
    if (!session) {
        alert("Please login or sign up to translate this page in Urdu.");
        history.push(`${siteConfig.baseUrl}login`);
        return;
    }

    if (isTranslated) {
      // Revert to original
      document.body.innerHTML = originalContent;
      
      // Remove Urdu styling
      document.body.classList.remove('urdu-mode');
      document.documentElement.dir = 'ltr';
      
      setIsTranslated(false);
      // Re-attach event listeners or hydration might be broken, but for a simple demo this works.
      // Better approach for React: force reload or just don't support revert easily without deeper state management.
      window.location.reload(); 
      return;
    }

    setIsTranslating(true);
    
    // Save original content
    setOriginalContent(document.body.innerHTML);

    try {
        // Get text nodes
        // This is a naive approach. For production, use a library like 'i18next' or proper DOM traversal.
        // Here we will just translate the main readable content to avoid breaking scripts/styles.
        
        const contentNodes = [];
        const walker = document.createTreeWalker(
            document.body, 
            NodeFilter.SHOW_TEXT, 
            null
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.trim() && node.parentElement.tagName !== 'SCRIPT' && node.parentElement.tagName !== 'STYLE') {
                contentNodes.push(node);
            }
        }
        
        // For demo purposes, we'll translate distinct chunks to avoid huge payloads
        // In a real app, you'd batch these or just translate the main container.
        // Let's try to translate the 'main' tag content if it exists, otherwise body.
        const mainElement = document.querySelector('main') || document.body;
        const textToTranslate = mainElement.innerText; 

        // Optimization: Only translate if text length is reasonable to avoid timeouts
        if (textToTranslate.length > 5000) {
            alert("Page content is too large to translate automatically.");
            setIsTranslating(false);
            return;
        }

        // Use local backend and include credentials for Auth check
        const response = await fetch('http://localhost:8000/translate-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: textToTranslate, language: 'ur' }),
            credentials: 'include' // Important: Send cookies for auth check
        });

        if (response.status === 401) {
             alert("Session expired. Please login again.");
             history.push(`${siteConfig.baseUrl}login`);
             return;
        }

        if (!response.ok) throw new Error('Translation service failed');
        
        const data = await response.json();
        
        // This is a destructive replace. It breaks React event listeners. 
        // But for a "Google Translate" style overlay effect, it visualizes the goal.
        mainElement.innerText = data.translated_text;
        
        // Apply Urdu Styling and Direction
        document.body.classList.add('urdu-mode');
        // We can toggle direction on specific container or body
        // document.documentElement.dir = 'rtl'; // This flips everything including navbar, might be too much
        mainElement.setAttribute('dir', 'rtl');
        mainElement.classList.add('urdu-mode');
        
        setIsTranslated(true);

    } catch (error) {
        console.error("Translation failed:", error);
        alert("Failed to translate page. Ensure backend is running at http://localhost:8000");
    } finally {
        setIsTranslating(false);
    }
  };

  return (
    <button
      onClick={handleTranslatePage}
      style={{
        position: 'fixed',
        bottom: '100px', // Above chatbot
        left: '30px',
        zIndex: 9998,
        padding: '12px',
        borderRadius: '50%',
        border: 'none',
        background: isTranslated ? '#10B981' : '#fff',
        color: isTranslated ? '#fff' : '#333',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50px',
        height: '50px',
        transition: 'all 0.3s ease'
      }}
      title={isTranslated ? "Revert to English" : "Translate Page to Urdu"}
    >
      {isTranslating ? (
        <span className="loader" style={{width: '20px', height: '20px', border: '2px solid #ccc', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></span>
      ) : (
        <span style={{fontSize: '20px'}}>🌐</span>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}