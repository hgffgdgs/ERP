# 🔧 Guide de Résolution des Problèmes - African ERP

Ce guide vous aide à résoudre les problèmes courants rencontrés lors de l'installation et du développement d'African ERP.

## 🚨 Problèmes Courants

### 1. Erreur "No matching export in AuthProvider.tsx for import AuthContext"

**Problème :** L'AuthContext n'est pas exporté correctement.

**Solution :**
```typescript
// Dans src/auth/AuthProvider.tsx
export const AuthContext = createContext<AuthContextType | undefined>(undefined)
```

### 2. Avertissement "Module type not specified" pour postcss.config.js

**Problème :** Le fichier PostCSS n'est pas reconnu comme un module ES.

**Solution :**
1. Ajouter `"type": "module"` dans package.json
2. Utiliser la syntaxe ESM dans postcss.config.js :
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 3. Erreur "Failed to scan for dependencies"

**Problème :** Vite ne peut pas analyser les dépendances.

**Solutions :**
1. Vérifier que tous les imports sont corrects
2. S'assurer que les fichiers existent
3. Redémarrer le serveur de développement

### 4. Erreur de compilation TypeScript

**Problème :** Erreurs de types TypeScript.

**Solutions :**
```bash
# Vérifier les types
npm run type-check

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### 5. Problèmes avec Tailwind CSS

**Problème :** Les styles ne s'appliquent pas.

**Solutions :**
1. Vérifier que Tailwind est correctement configuré :
```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // ...
}
```

2. Vérifier les imports CSS :
```css
/* src/index.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

### 6. Erreur Supabase "Invalid API key"

**Problème :** Configuration Supabase incorrecte.

**Solutions :**
1. Vérifier le fichier .env.local :
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

2. Redémarrer le serveur après modification des variables d'environnement

### 7. Erreur "Cannot find module" pour les composants UI

**Problème :** Imports de composants manquants.

**Solution :**
Utiliser le fichier d'index :
```typescript
// Utiliser
import { Button, Card } from '@/components/ui'

// Au lieu de
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
```

## 🛠️ Commandes de Diagnostic

### Vérification complète du setup
```bash
npm run check-setup
```

### Vérification des types TypeScript
```bash
npm run type-check
```

### Nettoyage complet
```bash
# Supprimer node_modules et cache
rm -rf node_modules package-lock.json .vite

# Réinstaller
npm install

# Redémarrer
npm run dev
```

### Vérification des dépendances
```bash
# Vérifier les dépendances obsolètes
npm outdated

# Auditer la sécurité
npm audit

# Corriger les vulnérabilités
npm audit fix
```

## 🐛 Débogage Avancé

### 1. Problèmes de Performance

**Symptômes :** Application lente, rechargement long.

**Solutions :**
```bash
# Analyser le bundle
npm run build
npx vite-bundle-analyzer dist

# Optimiser les imports
# Utiliser l'import dynamique pour les gros composants
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

### 2. Problèmes de Mémoire

**Symptômes :** "JavaScript heap out of memory"

**Solutions :**
```bash
# Augmenter la limite de mémoire
export NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

### 3. Problèmes de Hot Reload

**Symptômes :** Les changements ne se reflètent pas automatiquement.

**Solutions :**
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    hmr: {
      overlay: false
    }
  }
})
```

## 📋 Checklist de Vérification

Avant de signaler un bug, vérifiez :

- [ ] Node.js version 18+ installé
- [ ] Toutes les dépendances installées (`npm install`)
- [ ] Fichier .env.local configuré
- [ ] Aucune erreur TypeScript (`npm run type-check`)
- [ ] Serveur de développement redémarré
- [ ] Cache navigateur vidé
- [ ] Console navigateur vérifiée

## 🔍 Logs et Debugging

### Activer les logs détaillés
```bash
# Mode debug Vite
DEBUG=vite:* npm run dev

# Logs Supabase
localStorage.setItem('supabase.auth.debug', 'true')
```

### Vérifier les requêtes réseau
1. Ouvrir les DevTools (F12)
2. Aller dans l'onglet Network
3. Vérifier les requêtes API
4. Chercher les erreurs 4xx/5xx

### Analyser les erreurs React
```typescript
// Ajouter un Error Boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>
    }
    return this.props.children
  }
}
```

## 🆘 Support

Si les solutions ci-dessus ne résolvent pas votre problème :

1. **GitHub Issues :** [Créer une issue](https://github.com/your-org/african-erp/issues)
2. **Discord :** [Rejoindre la communauté](https://discord.gg/african-erp)
3. **Email :** support@african-erp.com

### Informations à fournir

Lors d'une demande de support, incluez :

```bash
# Informations système
node --version
npm --version
git --version

# Informations projet
npm list --depth=0
npm run check-setup

# Logs d'erreur complets
# Captures d'écran si pertinentes
```

## 📚 Ressources Utiles

- [Documentation Vite](https://vite.dev/)
- [Documentation React](https://react.dev/)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**💡 Conseil :** Gardez vos dépendances à jour et consultez régulièrement ce guide pour les nouveaux problèmes identifiés.