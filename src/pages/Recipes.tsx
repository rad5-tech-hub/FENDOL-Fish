import React from 'react';
import { motion } from 'motion/react';
import { Clock, Users, Info } from 'lucide-react';

const RECIPES = [
  {
    id: 'ofe-onugbu',
    title: 'Ofe Onugbu (Bitterleaf Soup)',
    description: 'The Igbo classic. Rich, dark, deeply savoury.',
    fish: 'Whole Stockfish + Smoked Catfish',
    serves: '6',
    time: '1hr 30mins',
    ingredients: [
      '2 medium stockfish pieces (soaked overnight)',
      '1 large smoked catfish (cleaned, broken into chunks)',
      '500g assorted meat (beef, shaki, kpomo)',
      '3 cups washed bitterleaf (squeeze out most of the bitterness, not all)',
      '2 cups cocoyam paste (ede ofe — for thickening)',
      '300ml red palm oil',
      '2 seasoning cubes',
      'Crayfish (2 tbsp, ground)',
      'Salt and pepper to taste'
    ],
    method: [
      'Boil and season your assorted meat until tender. Set aside with the stock.',
      'Soak stockfish overnight (or in hot water for 2–3 hours), then rinse and clean.',
      'In your pot, heat the palm oil. Do not bleach it — you want the colour and flavour.',
      'Add your meat stock, stockfish, catfish, and crayfish. Let it simmer for 15 minutes.',
      'Add cocoyam paste in small lumps into the soup. It will dissolve and thicken as it cooks. Stir gently.',
      'Add bitterleaf. Do not cook for too long after adding the leaf — 10 minutes is enough or it loses colour.',
      'Taste, adjust salt and seasoning.',
      'Serve with pounded yam, eba, or fufu.'
    ],
    tip: 'The secret is not over-washing the bitterleaf. A little bitterness is the point. And use stockfish heads if you can find them — the gelatin makes the soup thick and rich without extra cocoyam.',
    image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'egusi-soup',
    title: 'Egusi Soup (Yoruba Style)',
    description: 'Thick, rich egusi. The kind that sits on your tongue.',
    fish: 'Smoked Catfish + Bonga Fish (Shawa)',
    serves: '6',
    time: '1hr',
    ingredients: [
      '3 cups egusi (ground melon seeds)',
      '1 large smoked catfish, broken into pieces',
      '3–4 wraps dried bonga fish (shawa)',
      '500g assorted meat or chicken',
      '300ml red palm oil',
      '2 large tomatoes, 2 tatashe (red bell pepper), 3 atarodo — blended',
      '2 handfuls spinach or bitter leaves',
      '2 seasoning cubes, crayfish, salt'
    ],
    method: [
      'Season and cook your meat until done. Reserve the stock.',
      'Heat palm oil in a wide pot. Fry the blended pepper mix until dry and the oil rises to the top (~20 mins).',
      'Mix egusi with a little water into a thick paste. Scoop in tablespoon-sized mounds into the fried pepper. Don\'t stir yet — let it fry for 5 minutes, then gently fold.',
      'Add stock, crayfish, seasoning, bonga fish, and catfish. Stir to combine.',
      'Let it cook on medium heat for 20–25 minutes, stirring occasionally.',
      'Add your greens last. 5 minutes before serving.',
      'Taste and adjust. Serve with pounded yam or eba.'
    ],
    tip: 'Bonga fish in egusi is underrated. It dissolves almost entirely into the soup and gives you a layered, complex taste that\'s different from catfish alone. Use both.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
  }
];

export default function Recipes() {
  return (
    <main className="pb-24 px-6 md:px-16 max-w-[1440px] mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <span className="font-mono text-xs text-secondary mb-4 block uppercase tracking-widest font-bold">THE NIGERIAN KITCHEN</span>
        <h1 className="text-4xl md:text-6xl text-primary font-display font-black uppercase tracking-tighter mb-6 leading-tight">Cook It Right. <br/>Taste the Difference.</h1>
        <p className="max-w-2xl mx-auto text-lg text-on-surface-variant font-medium">Dried fish isn't just a topping — it's the soul of Nigerian soup. Here are some of our favourite base recipes that let stockfish, catfish, and bonga fish shine.</p>
      </motion.div>

      <div className="space-y-40">
        {RECIPES.map((recipe, idx) => (
          <section key={recipe.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <div className={idx % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}>
              <div className="aspect-[4/5] bg-surface-container overflow-hidden border-4 border-primary/5 rounded-2xl shadow-2xl">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            <div className={`space-y-10 ${idx % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
              <div>
                <h2 className="text-4xl md:text-5xl text-primary font-display font-black uppercase tracking-tighter mb-3 leading-none">{recipe.title}</h2>
                <p className="text-secondary text-sm font-black uppercase tracking-widest">{recipe.description}</p>
              </div>
              
              <div className="flex gap-8 border-y-2 border-primary/5 py-6">
                <div className="flex items-center gap-3 font-mono text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                  <div className="p-2 bg-primary/5 rounded-full">
                    <Clock size={16} className="text-primary" /> 
                  </div>
                  {recipe.time}
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                  <div className="p-2 bg-primary/5 rounded-full">
                    <Users size={16} className="text-primary" /> 
                  </div>
                  {recipe.serves} SERVINGS
                </div>
              </div>

              <div className="p-8 bg-surface-container/30 border border-primary/5 rounded-xl">
                <h3 className="font-sans text-xs text-primary font-black uppercase tracking-widest mb-6 border-b border-primary/10 pb-4">Essential Ingredients</h3>
                <ul className="grid grid-cols-1 gap-3">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex gap-4 text-on-surface-variant font-medium text-sm leading-tight">
                      <span className="text-secondary font-black">/</span> {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-sans text-xs text-primary font-black uppercase tracking-widest mb-6">Preparation Method</h3>
                <ol className="space-y-6">
                  {recipe.method.map((step, i) => (
                    <li key={i} className="flex gap-5 text-on-surface-variant font-medium text-sm leading-relaxed">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-on-primary font-mono text-[10px] flex items-center justify-center font-bold">{i + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-secondary text-on-secondary p-8 rounded-sm shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-mono text-[10px] font-black uppercase tracking-widest mb-3 opacity-70">The Master's Tip</h4>
                  <p className="font-display text-xl font-bold leading-tight tracking-tight">{recipe.tip}</p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Info size={48} />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
