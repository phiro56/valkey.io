import { ChakraProvider } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { CommandReference } from './pages/CommandReference';
import Community from './pages/Community';
import CodeOfConduct from './pages/Community/CodeOfConduct';
import FAQ from './pages/Community/FAQ';
import ShowCasePage from './pages/Community/show-case/[slug]';
import { Documentation } from './pages/Documentation';
import { Home } from './pages/Home';
import { Install } from './pages/Install';
import { ParticipantsPage } from './pages/Participants';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/install" element={<Install />} />
            <Route path="/documentation/*" element={<Documentation />} />
            <Route path="/command-reference" element={<CommandReference />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/faq" element={<FAQ />} />
            <Route path="/community/code-of-conduct" element={<CodeOfConduct />} />
            <Route path="/community/show-case/:slug" element={<ShowCasePage />} />
            <Route path="/participants" element={<ParticipantsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </MainLayout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
