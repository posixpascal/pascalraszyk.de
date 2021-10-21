import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import { Context } from '@nuxt/types'



const plugin: any = (context: Context, inject: (namespace: string, obj: any) => void) => {
  const app = initializeApp(context.$config.firebase);
  console.log(context.$config.firebase);
  const functions = getFunctions(app);
  const analytics = getAnalytics(app);
  inject('functions', functions);
  inject('analytics', analytics);

  const spotify = {
    getCurrentTrack: httpsCallable(functions, 'getCurrentTrack'),
  }

  inject('spotify', spotify)
};

export default plugin;
