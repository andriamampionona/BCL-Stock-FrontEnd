"use client";
// dashboard.tsx

import Sidbar from '@/components/Sidbar';
import Header from '@/components/hader';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ArticleInPage from '@/components/Article-in/page';
import ArticleOutPage from '@/components/Article-out/page';
import GroupCardPage from '@/components/groupes/page';
import UsersPage from '@/components/Users/page';
import PeriodePage from '@/components/periode/page';
import HomePage from '@/components/Dashboard/page';

const PageWithSuspense = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // protection de la page
  const searchParams = useSearchParams();
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return; // Ne rien faire si le statut est "loading"
    
    if (status === "unauthenticated") {
      router.replace("/sing-in");  // Redirection vers la page de connexion
    } else {
      const queryContent = searchParams?.get('content');
      if (queryContent) {
        setSelectedContent(queryContent);
      } else {
        setSelectedContent('dashboard'); // Valeur par défaut si `content` n'est pas dans l'URL
      }
    }
  }, [status, searchParams, router]);

  const handleLinkClick = (content: string) => {
    setSelectedContent(content);
    router.push(`?content=${content}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid min-h-screen w-full h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidbar onLinkClick={handleLinkClick} activeContent={selectedContent} />
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-3/5">
            {selectedContent === 'dashboard' && <HomePage />}
            {selectedContent === 'products' && <ArticleOutPage />}
            {selectedContent === 'orders' && <ArticleInPage />}
            {selectedContent === 'users' && <UsersPage />}
            {selectedContent === 'groups' && <GroupCardPage />}
            {selectedContent === 'analytics' && <PeriodePage />}
          </main>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PageWithSuspense />
  </Suspense>
);

export default DashboardPage;
