import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import theme from './theme';

// Placeholder components for routes
const Install = () => <div>Installation Guide</div>;
const Documentation = () => <div>Documentation</div>;
const CommandReference = () => <div>Command Reference</div>;
const Blog = () => <div>Blog</div>;
const Community = () => <div>Community</div>;
const CodeOfConduct = () => <div>Code of Conduct</div>;
const PrivacyPolicy = () => <div>Privacy Policy</div>;
const TermsOfService = () => <div>Terms of Service</div>;

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/install" element={<Install />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/commands" element={<CommandReference />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/community" element={<Community />} />
            <Route path="/code-of-conduct" element={<CodeOfConduct />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </MainLayout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
