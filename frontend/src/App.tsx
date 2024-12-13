import { Header } from './components/Header';
import { RecommendationSection } from './components/RecommendationSection';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ProfileProvider } from './context/ProfileContext';
import { mockSections } from './data/mockSections';

function App() {
  return (
    <ProfileProvider>
      <CartProvider>
        <FavoritesProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {mockSections.map((section, index) => (
                <RecommendationSection key={index} section={section} />
              ))}
            </main>
          </div>
        </FavoritesProvider>
      </CartProvider>
    </ProfileProvider>
  );
}

export default App;
