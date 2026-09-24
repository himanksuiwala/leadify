import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Toaster } from '@/components/ui/sonner';
import { MockWebhookView } from '@/components/views/MockWebhookView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />} />
        <Route path="/mock-webhook" element={<MockWebhookView />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
