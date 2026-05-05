import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Search, 
  MapPin, 
  ShoppingBasket, 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft, 
  Heart, 
  Recycle, 
  Timer, 
  Store, 
  CheckCircle,
  Navigation,
  Compass,
  ClipboardList,
  User,
  Star,
  Sprout,
  HandHelping
} from 'lucide-react';
import { Screen, MOCK_ITEMS, type StoreItem } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
  const [selectedItem, setSelectedItem] = useState<StoreItem>(MOCK_ITEMS[0]);

  const navigate = (screen: Screen) => setCurrentScreen(screen);

  return (
    <div className="max-w-md mx-auto h-screen bg-background relative overflow-hidden flex flex-col font-body selection:bg-primary-fixed">
      <AnimatePresence mode="wait">
        {currentScreen === Screen.WELCOME && (
          <WelcomeScreen key="welcome" onStart={() => navigate(Screen.LOGIN)} />
        )}
        {currentScreen === Screen.LOGIN && (
          <LoginScreen key="login" onLogin={() => navigate(Screen.EXPLORE)} />
        )}
        {currentScreen === Screen.EXPLORE && (
          <ExploreScreen 
            key="explore" 
            onSelectItem={(item) => {
              setSelectedItem(item);
              navigate(Screen.DETAIL);
            }} 
          />
        )}
        {currentScreen === Screen.DETAIL && (
          <DetailScreen 
            key="detail" 
            item={selectedItem} 
            onBack={() => navigate(Screen.EXPLORE)}
            onReserve={() => navigate(Screen.SUMMARY)}
          />
        )}
        {currentScreen === Screen.SUMMARY && (
          <SummaryScreen 
            key="summary" 
            item={selectedItem} 
            onConfirm={() => navigate(Screen.CONFIRMATION)}
          />
        )}
        {currentScreen === Screen.CONFIRMATION && (
          <ConfirmationScreen 
            key="confirmation" 
            onDone={() => navigate(Screen.EXPLORE)} 
          />
        )}
      </AnimatePresence>

      {/* Global Bottom Nav (only on core screens) */}
      {[Screen.EXPLORE, Screen.CONFIRMATION].includes(currentScreen) && (
        <BottomNav current={currentScreen} onNavigate={navigate} />
      )}
    </div>
  );
}

// --- Screens ---

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-between organic-bg relative"
    >
      <div className="w-full flex-grow flex flex-col items-center justify-center px-5 pt-8">
        <div className="relative w-full max-w-sm aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80" 
            alt="Fresh produce" 
          />
          <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-white/70 rounded-2xl p-4 border border-white/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm">
              <Leaf size={24} fill="currentColor" />
            </div>
            <div>
              <p className="font-sans font-bold text-xl text-primary leading-tight">12.5k kg</p>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Comida salvada hoy</p>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full bg-surface-container-lowest rounded-t-[48px] px-5 pt-10 pb-12 flex flex-col items-center shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary-container mb-1">REFOOD</h1>
          <p className="text-2xl font-semibold text-on-surface leading-tight">Alimenta personas, no vertederos.</p>
          <div className="mt-4 h-1 w-12 bg-primary-container/20 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="p-4 bg-secondary-container/30 rounded-2xl border border-secondary-container/50">
            <Navigation className="text-secondary mb-2" size={20} />
            <p className="text-xs font-bold text-on-secondary-container">Buscar excedentes locales</p>
          </div>
          <div className="p-4 bg-tertiary-fixed/20 rounded-2xl border border-tertiary-fixed/40">
            <HandHelping className="text-tertiary mb-2" size={20} />
            <p className="text-xs font-bold text-on-tertiary-fixed-variant">Compartir con vecinos</p>
          </div>
        </div>

        <button 
          onClick={onStart}
          className="w-full h-16 bg-primary-container text-white rounded-full font-bold text-xl flex items-center justify-center gap-3 active:scale-95 transition-transform duration-200 shadow-lg"
        >
          Comenzar
          <ArrowRight size={24} />
        </button>
        <p className="mt-6 text-sm font-medium text-outline">
          ¿Ya tienes cuenta? <span className="text-primary font-bold">Inicia sesión</span>
        </p>
      </section>
    </motion.main>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <motion.main 
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-5 py-8"
    >
      <header className="w-full max-w-md mb-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-4 shadow-xl">
          <Recycle size={40} className="text-on-primary-container" />
        </div>
        <h1 className="text-4xl font-bold text-primary-container tracking-tight">REFOOD</h1>
        <p className="text-sm font-medium text-outline mt-1">Reduciendo desperdicios, alimentando comunidades.</p>
      </header>

      <div className="w-full bg-surface-container-lowest rounded-3xl p-6 shadow-xl border border-zinc-100">
        <h2 className="text-2xl font-bold text-on-surface mb-6">Bienvenido de nuevo</h2>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface-variant ml-1">Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="nombre@ejemplo.com"
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-on-surface-variant">Contraseña</label>
              <button type="button" className="text-xs font-bold text-primary">¿Olvidaste tu contraseña?</button>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-primary-container text-white py-4 rounded-2xl font-bold text-lg shadow-md hover:brightness-110 active:scale-95 transition-all mt-4"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="relative my-8 flex items-center">
          <div className="flex-grow border-t border-outline-variant"></div>
          <span className="mx-4 text-[10px] font-bold text-outline uppercase tracking-widest">O continúa con</span>
          <div className="flex-grow border-t border-outline-variant"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-2xl text-xs font-bold hover:bg-surface-container transition-colors">
            <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-2xl text-xs font-bold hover:bg-surface-container transition-colors">
            <div className="w-5 h-5 bg-[#1877F2] rounded-full flex items-center justify-center text-white text-[10px]">f</div>
            Facebook
          </button>
        </div>
      </div>

      <footer className="mt-8 text-center">
        <p className="text-sm font-medium text-on-surface-variant">
          ¿No tienes cuenta? <button className="text-primary font-bold ml-1">Regístrate</button>
        </p>
      </footer>
    </motion.main>
  );
}

function ExploreScreen({ onSelectItem }: { onSelectItem: (item: StoreItem) => void }) {
  const categories = ['Todas', 'Verduras', 'Panadería', 'Lácteos', 'Carnes'];
  const [activeCat, setActiveCat] = useState('Todas');

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col pt-16 pb-24 overflow-y-auto no-scrollbar"
    >
      <header className="fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md z-50 border-b border-zinc-100 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container overflow-hidden border border-primary/10">
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-extrabold text-primary tracking-tight">REFOOD</h1>
        </div>
        <button className="p-2 text-primary hover:bg-zinc-50 rounded-full"><Search size={24} /></button>
      </header>

      {/* Map View Placeholder */}
      <div className="relative w-full h-64 bg-surface-container overflow-hidden">
         <img 
          src="https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80" 
          alt="Map" 
          className="w-full h-full object-cover grayscale brightness-110 opacity-40" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 bg-white/80 backdrop-blur rounded-2xl border border-primary/20 shadow-xl flex items-center gap-3">
            <MapPin className="text-primary" size={24} />
            <span className="font-bold text-primary">Estás cerca de 12 excedentes</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 py-4 flex gap-2 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
              activeCat === cat ? 'bg-primary text-white shadow-md' : 'bg-white border border-outline-variant text-on-surface'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Listings */}
      <section className="px-5 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Disponibles cerca de ti</h2>
            <p className="text-sm font-medium text-outline">A menos de 2km de tu ubicación</p>
          </div>
          <button className="text-primary text-xs font-bold flex items-center gap-1">Ver todo <ChevronRight size={14} /></button>
        </div>

        <div className="grid gap-6">
          {MOCK_ITEMS.map(item => (
            <div 
              key={item.id} 
              onClick={() => onSelectItem(item)}
              className="bg-white rounded-3xl overflow-hidden border border-secondary-container/50 shadow-[0_8px_24px_rgba(45,106,79,0.05)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="relative h-48">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-primary text-[10px] font-bold shadow-sm">
                  {item.distance}
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-primary text-white rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-on-surface">{item.store}</h3>
                  <div className="flex items-center gap-1 text-secondary">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{item.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-outline mb-4 line-clamp-1">{item.name}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-outline line-through">${item.originalPrice.toFixed(2)}</span>
                    <span className="text-xl font-bold text-primary">${item.price.toFixed(2)}</span>
                  </div>
                  <button className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md">
                    Rescatar Bolsa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Tip */}
      <div className="mx-5 my-8 p-6 bg-primary-fixed rounded-3xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
          <Sprout size={28} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-primary">Tu comunidad ahorró</h4>
          <p className="text-xs font-medium text-primary opacity-80">142kg de CO2 esta semana. ¡Sigue así!</p>
        </div>
      </div>
    </motion.main>
  );
}

function DetailScreen({ item, onBack, onReserve }: { item: StoreItem, onBack: () => void, onReserve: () => void }) {
  return (
    <motion.main 
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      className="flex-1 flex flex-col pt-16 pb-32 overflow-y-auto no-scrollbar"
    >
      <header className="fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md z-50 border-b border-zinc-100 px-5 flex items-center justify-between">
        <button onClick={onBack} className="p-2 text-outline"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-extrabold text-primary tracking-tight">REFOOD</h1>
        <button className="p-2 text-outline"><Heart size={24} /></button>
      </header>

      <section className="relative w-full aspect-square overflow-hidden mb-6">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-primary/20">
          <Timer size={16} className="text-primary" />
          <span className="text-xs font-bold text-primary">Termina en 02:45:12</span>
        </div>
      </section>

      <section className="px-5">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-wider">
              {item.category.toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold text-on-surface">{item.name}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-outline line-through">${item.originalPrice.toFixed(2)}</p>
            <p className="text-3xl font-extrabold text-primary">${item.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl p-4 mb-8 border border-outline-variant/30">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-on-surface-variant font-bold text-sm">
              <Leaf size={18} className="text-primary" fill="currentColor" />
              Estado: Excedente
            </div>
            <span className="text-xs font-bold text-primary">{item.freshness}% Calidad Restante</span>
          </div>
          <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${item.freshness}%` }}></div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-2">Descripción</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {item.description}
          </p>
          <div className="mt-4 flex gap-2">
            <div className="px-3 py-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-xl text-[10px] font-bold flex items-center gap-2">
               <Recycle size={14} /> Ideal para Compost
            </div>
            <div className="px-3 py-2 bg-secondary-fixed text-on-secondary-fixed rounded-xl text-[10px] font-bold flex items-center gap-2">
               <Heart size={14} /> Seguro para Mascotas
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface-container-low p-4 rounded-2xl border border-zinc-100 flex flex-col gap-1">
            <Navigation className="text-primary" size={20} />
            <p className="text-[10px] font-bold text-outline">DISTANCIA</p>
            <p className="font-bold">{item.distance} de ti</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl border border-zinc-100 flex flex-col gap-1">
            <ShoppingBasket className="text-primary" size={20} />
            <p className="text-[10px] font-bold text-outline">PESO EST.</p>
            <p className="font-bold">{item.weight}</p>
          </div>
          <div className="col-span-2 bg-surface-container-low p-4 rounded-2xl border border-zinc-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-tertiary shadow-sm">
              <Store size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{item.store}</p>
              <p className="text-[10px] font-medium text-outline uppercase">{item.pickupInfo}</p>
            </div>
            <ChevronRight className="text-outline" size={20} />
          </div>
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-zinc-100 p-5 flex gap-4 z-50">
        <button className="w-14 h-14 rounded-2xl border-2 border-primary/20 flex items-center justify-center text-primary active:scale-95 transition-all">
          <Heart size={24} />
        </button>
        <button 
          onClick={onReserve}
          className="flex-1 h-14 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg"
        >
          <ShoppingBasket size={20} />
          Reservar Ahora
        </button>
      </footer>
    </motion.main>
  );
}

function SummaryScreen({ item, onConfirm }: { item: StoreItem, onConfirm: () => void }) {
  return (
     <motion.main 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex-1 flex flex-col pt-20 px-5 pb-32"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-primary mb-1">Resumen del Pedido</h1>
        <p className="text-sm font-medium text-outline">Revisa tu selección antes de confirmar</p>
      </header>

      <div className="bg-surface-container-lowest rounded-3xl p-4 border border-secondary-container/30 shadow-sm mb-6">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex justify-between">
              <h3 className="font-bold text-primary">{item.name}</h3>
              <p className="font-bold text-primary">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2 text-secondary">
               <Leaf size={14} fill="currentColor" />
               <span className="text-[10px] font-bold">Ahorra 2.4kg de CO2</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-3xl p-6 space-y-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <Store size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest leading-none">MÉTODO</p>
            <p className="font-bold text-primary">Recogida en tienda</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
            <MapPin size={20} />
          </div>
          <div>
             <p className="text-[10px] font-bold text-outline uppercase tracking-widest leading-none">UBICACIÓN</p>
             <p className="font-bold text-on-surface">{item.store}</p>
             <p className="text-xs text-outline leading-tight mt-1">124 Calle Orgánica, Distrito Sostenible, Ciudad Verde</p>
          </div>
        </div>
      </div>

      <div className="bg-surface-container rounded-3xl p-6 space-y-3 mb-8">
        <div className="flex justify-between text-sm text-on-surface-variant font-medium">
          <span>Subtotal</span>
          <span>${item.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-on-surface-variant font-medium">
          <span>Tarifa de servicio</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between text-sm text-secondary font-bold">
          <span>Descuento sostenible</span>
          <span>-$2.00</span>
        </div>
        <div className="pt-3 border-t border-outline-variant/30 flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
          <span className="text-2xl font-extrabold text-primary">${(item.price - 2).toFixed(2)}</span>
        </div>
      </div>

      <button 
        onClick={onConfirm}
        className="w-full h-16 bg-primary-container text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
      >
        Confirmar Pedido
        <ArrowRight size={24} />
      </button>
    </motion.main>
  );
}

function ConfirmationScreen({ onDone }: { onDone: () => void }) {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-5 pt-20"
    >
      <div className="relative mb-12">
        <div className="w-32 h-32 bg-primary-container rounded-full flex items-center justify-center shadow-2xl">
          <CheckCircle size={64} className="text-white" fill="none" strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-tertiary-fixed rounded-full flex items-center justify-center border-4 border-background text-tertiary shadow-md">
          <Leaf size={24} fill="currentColor" />
        </div>
      </div>

      <div className="text-center space-y-2 mb-12">
        <h1 className="text-4xl font-extrabold text-primary">¡Pedido Confirmado!</h1>
        <p className="text-lg font-medium text-on-surface-variant max-w-[280px] mx-auto leading-tight">
          Gracias por ayudarnos a reducir el desperdicio de alimentos hoy.
        </p>
      </div>

      <div className="w-full space-y-4">
        <div className="bg-white p-5 rounded-3xl border border-zinc-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-secondary-container/50 rounded-2xl text-secondary">
             <ClipboardList size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest">ID DEL PEDIDO</p>
            <p className="text-xl font-bold">RF-8829-XQ</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-zinc-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-primary-fixed/50 rounded-2xl text-primary">
             <Timer size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest">LÍMITE DE RECOGIDA</p>
            <p className="text-xl font-bold text-primary">Hoy antes de las 8:00 PM</p>
          </div>
        </div>
      </div>

      <div className="w-full gap-3 flex flex-col mt-12 pb-24">
        <button className="w-full h-16 bg-primary-container text-white rounded-full font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95">
          <Navigation size={20} />
          Ver direcciones
        </button>
        <button onClick={onDone} className="w-full h-16 bg-white border-2 border-primary/10 text-primary rounded-full font-bold active:scale-95">
          Volver al Inicio
        </button>
      </div>

      <div className="flex items-center gap-3 px-6 py-4 bg-secondary-container/20 rounded-full absolute bottom-32">
        <Leaf size={18} className="text-secondary" fill="currentColor" />
        <span className="text-xs font-bold text-secondary">¡Acabas de ahorrar 2.4kg de CO2!</span>
      </div>
    </motion.main>
  );
}

// --- Global UI Components ---

function BottomNav({ current, onNavigate }: { current: Screen, onNavigate: (s: Screen) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-24 bg-white/95 backdrop-blur-lg border-t border-zinc-100 px-8 flex justify-around items-center z-50 rounded-t-[32px] shadow-2xl">
      <NavItem 
        active={current === Screen.EXPLORE} 
        icon={<Compass size={24} fill={current === Screen.EXPLORE ? 'currentColor' : 'none'} />} 
        label="Explorar"
        onClick={() => onNavigate(Screen.EXPLORE)}
      />
      <NavItem 
        active={current === Screen.SUMMARY} 
        icon={<ClipboardList size={24} />} 
        label="Pedidos"
        onClick={() => {}}
      />
      <NavItem 
        active={false} 
        icon={<User size={24} />} 
        label="Perfil"
        onClick={() => {}}
      />
    </nav>
  );
}

function NavItem({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-primary' : 'text-zinc-400'}`}
    >
      <div className={`p-2 rounded-2xl transition-all duration-300 ${active ? 'bg-primary/5' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold tracking-tight ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    </button>
  );
}
