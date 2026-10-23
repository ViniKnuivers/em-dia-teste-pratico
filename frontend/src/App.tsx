import Header from './components/Header';
import Footer from './components/Footer';
import PageHeader from './components/PageHeader';
import PageCard from './components/PageCard';

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <PageHeader />
        <PageCard />
        <Footer />
      </main>
    </>
  );
}
