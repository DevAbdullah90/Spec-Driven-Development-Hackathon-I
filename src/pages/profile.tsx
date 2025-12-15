import React from 'react';
import Layout from '@theme/Layout';
import { authClient } from '../lib/auth-client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';

export default function Profile() {
  const { siteConfig } = useDocusaurusContext();
  const { data: session, isPending, error } = authClient.useSession();

  // Loading State
  if (isPending) {
    return (
      <Layout title="Profile" noFooter>
        <div className="min-h-[calc(100vh-var(--ifm-navbar-height))] flex items-center justify-center bg-neutral-50 dark:bg-[#0F172A]">
          <div className="loader"></div>
        </div>
      </Layout>
    );
  }

  // Not Logged In / Profile Not Found State
  if (!session) {
    return (
      <Layout title="Profile Not Found" noFooter>
        <div className="min-h-[calc(100vh-var(--ifm-navbar-height))] flex items-center justify-center p-4 bg-neutral-50 dark:bg-[#0F172A] relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[128px]"></div>

          <div className="text-center z-10 max-w-lg">
            <div className="mb-6 inline-flex p-4 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 font-[Space Grotesk] text-slate-900 dark:text-white">Profile Not Found</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              It looks like you are not logged in or your profile info is unavailable. Please sign in to access your dashboard.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => authClient.signIn.social({ provider: 'google', callbackURL: '/profile' })}
                className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all shadow-lg hover:shadow-orange-500/25 flex items-center gap-2 cursor-pointer"
              >
                Sign In
              </button>
              <Link to="/" className="px-8 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-semibold">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Active Profile State
  return (
    <Layout title={`Profile - ${session.user.name}`} noFooter>
      <div className="min-h-[calc(100vh-var(--ifm-navbar-height))] flex items-center justify-center p-4 md:p-8 bg-neutral-50 dark:bg-[#0F172A] relative overflow-hidden font-['Inter']">

        {/* Animated Background */}
        <div className="absolute inset-0 z-0 opacity-40 animate-pulse-slow">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--ifm-color-primary)]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="w-full max-w-2xl relative z-10 perspective-1000">
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">

            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              {/* Avatar with Ring */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 shadow-xl">
                  {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-400">
                      {session.user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mb-2 font-[Space Grotesk]">
                  {session.user.name}
                </h1>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  Active User
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-mono text-sm bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-lg inline-block border border-slate-200 dark:border-slate-700">
                  {session.user.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors group">
                <p className="text-sm text-slate-400 mb-1">Account ID</p>
                <p className="font-mono text-sm truncate opacity-70 group-hover:opacity-100 transition-opacity">{session.user.id}</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors group">
                <p className="text-sm text-slate-400 mb-1">Member Since</p>
                <p className="font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                  {new Date(session.user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-4">
              <button
                onClick={async () => {
                  await authClient.signOut();
                  window.location.href = '/';
                }}
                className="px-6 py-2.5 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-all flex items-center gap-2 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                Sign Out
              </button>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}